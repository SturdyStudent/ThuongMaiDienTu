"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendInParallel = sendInParallel;
exports.sendMessage = sendMessage;
var _dgram = _interopRequireDefault(require("dgram"));
var _net = _interopRequireDefault(require("net"));
var punycode = _interopRequireWildcard(require("punycode"));
var _abortError = _interopRequireDefault(require("./errors/abort-error"));
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
async function sendInParallel(addresses, port, request, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }
  return await new Promise((resolve, reject) => {
    const sockets = [];
    let errorCount = 0;
    const onError = err => {
      errorCount++;
      if (errorCount === addresses.length) {
        signal.removeEventListener('abort', onAbort);
        clearSockets();
        reject(err);
      }
    };
    const onMessage = message => {
      signal.removeEventListener('abort', onAbort);
      clearSockets();
      resolve(message);
    };
    const onAbort = () => {
      clearSockets();
      reject(new _abortError.default());
    };
    const clearSockets = () => {
      for (const socket of sockets) {
        socket.removeListener('error', onError);
        socket.removeListener('message', onMessage);
        socket.close();
      }
    };
    signal.addEventListener('abort', onAbort, {
      once: true
    });
    for (let j = 0; j < addresses.length; j++) {
      const udpType = addresses[j].family === 6 ? 'udp6' : 'udp4';
      const socket = _dgram.default.createSocket(udpType);
      sockets.push(socket);
      socket.on('error', onError);
      socket.on('message', onMessage);
      socket.send(request, 0, request.length, port, addresses[j].address);
    }
  });
}
async function sendMessage(host, port, lookup, signal, request) {
  if (signal.aborted) {
    throw new _abortError.default();
  }
  let addresses;
  if (_net.default.isIP(host)) {
    addresses = [{
      address: host,
      family: _net.default.isIPv6(host) ? 6 : 4
    }];
  } else {
    addresses = await new Promise((resolve, reject) => {
      const onAbort = () => {
        reject(new _abortError.default());
      };
      signal.addEventListener('abort', onAbort);
      lookup(punycode.toASCII(host), {
        all: true
      }, (err, addresses) => {
        signal.removeEventListener('abort', onAbort);
        err ? reject(err) : resolve(addresses);
      });
    });
  }
  return await sendInParallel(addresses, port, request, signal);
}