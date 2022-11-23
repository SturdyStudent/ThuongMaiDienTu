"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nativeDuplexpair = _interopRequireDefault(require("native-duplexpair"));
var tls = _interopRequireWildcard(require("tls"));
var _events = require("events");
var _message = _interopRequireDefault(require("./message"));
var _packet = require("./packet");
var _incomingMessageStream = _interopRequireDefault(require("./incoming-message-stream"));
var _outgoingMessageStream = _interopRequireDefault(require("./outgoing-message-stream"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
class MessageIO extends _events.EventEmitter {
  constructor(socket, packetSize, debug) {
    super();
    this.socket = void 0;
    this.debug = void 0;
    this.tlsNegotiationComplete = void 0;
    this.incomingMessageStream = void 0;
    this.outgoingMessageStream = void 0;
    this.securePair = void 0;
    this.incomingMessageIterator = void 0;
    this.socket = socket;
    this.debug = debug;
    this.tlsNegotiationComplete = false;
    this.incomingMessageStream = new _incomingMessageStream.default(this.debug);
    this.incomingMessageIterator = this.incomingMessageStream[Symbol.asyncIterator]();
    this.outgoingMessageStream = new _outgoingMessageStream.default(this.debug, {
      packetSize: packetSize
    });
    this.socket.pipe(this.incomingMessageStream);
    this.outgoingMessageStream.pipe(this.socket);
  }
  packetSize(...args) {
    if (args.length > 0) {
      const packetSize = args[0];
      this.debug.log('Packet size changed from ' + this.outgoingMessageStream.packetSize + ' to ' + packetSize);
      this.outgoingMessageStream.packetSize = packetSize;
    }
    if (this.securePair) {
      this.securePair.cleartext.setMaxSendFragment(this.outgoingMessageStream.packetSize);
    }
    return this.outgoingMessageStream.packetSize;
  } // Negotiate TLS encryption.

  startTls(credentialsDetails, hostname, trustServerCertificate) {
    if (!credentialsDetails.maxVersion || !['TLSv1.2', 'TLSv1.1', 'TLSv1'].includes(credentialsDetails.maxVersion)) {
      credentialsDetails.maxVersion = 'TLSv1.2';
    }
    const secureContext = tls.createSecureContext(credentialsDetails);
    return new Promise((resolve, reject) => {
      const duplexpair = new _nativeDuplexpair.default();
      const securePair = this.securePair = {
        cleartext: tls.connect({
          socket: duplexpair.socket1,
          servername: hostname,
          secureContext: secureContext,
          rejectUnauthorized: !trustServerCertificate
        }),
        encrypted: duplexpair.socket2
      };
      const onSecureConnect = () => {
        securePair.encrypted.removeListener('readable', onReadable);
        securePair.cleartext.removeListener('error', onError);
        securePair.cleartext.removeListener('secureConnect', onSecureConnect); // If we encounter any errors from this point on,
        // we just forward them to the actual network socket.

        securePair.cleartext.once('error', err => {
          this.socket.destroy(err);
        });
        const cipher = securePair.cleartext.getCipher();
        if (cipher) {
          this.debug.log('TLS negotiated (' + cipher.name + ', ' + cipher.version + ')');
        }
        this.emit('secure', securePair.cleartext);
        securePair.cleartext.setMaxSendFragment(this.outgoingMessageStream.packetSize);
        this.outgoingMessageStream.unpipe(this.socket);
        this.socket.unpipe(this.incomingMessageStream);
        this.socket.pipe(securePair.encrypted);
        securePair.encrypted.pipe(this.socket);
        securePair.cleartext.pipe(this.incomingMessageStream);
        this.outgoingMessageStream.pipe(securePair.cleartext);
        this.tlsNegotiationComplete = true;
        resolve();
      };
      const onError = err => {
        securePair.encrypted.removeListener('readable', onReadable);
        securePair.cleartext.removeListener('error', onError);
        securePair.cleartext.removeListener('secureConnect', onSecureConnect);
        securePair.cleartext.destroy();
        securePair.encrypted.destroy();
        reject(err);
      };
      const onReadable = () => {
        // When there is handshake data on the encryped stream of the secure pair,
        // we wrap it into a `PRELOGIN` message and send it to the server.
        //
        // For each `PRELOGIN` message we sent we get back exactly one response message
        // that contains the server's handshake response data.
        const message = new _message.default({
          type: _packet.TYPE.PRELOGIN,
          resetConnection: false
        });
        let chunk;
        while (chunk = securePair.encrypted.read()) {
          message.write(chunk);
        }
        this.outgoingMessageStream.write(message);
        message.end();
        this.readMessage().then(async response => {
          // Setup readable handler for the next round of handshaking.
          // If we encounter a `secureConnect` on the cleartext side
          // of the secure pair, the `readable` handler is cleared
          // and no further handshake handling will happen.
          securePair.encrypted.once('readable', onReadable);
          for await (const data of response) {
            // We feed the server's handshake response back into the
            // encrypted end of the secure pair.
            securePair.encrypted.write(data);
          }
        }).catch(onError);
      };
      securePair.cleartext.once('error', onError);
      securePair.cleartext.once('secureConnect', onSecureConnect);
      securePair.encrypted.once('readable', onReadable);
    });
  } // TODO listen for 'drain' event when socket.write returns false.
  // TODO implement incomplete request cancelation (2.2.1.6)

  sendMessage(packetType, data, resetConnection) {
    const message = new _message.default({
      type: packetType,
      resetConnection: resetConnection
    });
    message.end(data);
    this.outgoingMessageStream.write(message);
    return message;
  }
  /**
   * Read the next incoming message from the socket.
   */

  async readMessage() {
    const result = await this.incomingMessageIterator.next();
    if (result.done) {
      throw new Error('unexpected end of message stream');
    }
    return result.value;
  }
}
var _default = MessageIO;
exports.default = _default;
module.exports = MessageIO;