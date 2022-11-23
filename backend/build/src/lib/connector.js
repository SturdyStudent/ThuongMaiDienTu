"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectInParallel = connectInParallel;
exports.connectInSequence = connectInSequence;
exports.lookupAllAddresses = lookupAllAddresses;
var _net = _interopRequireDefault(require("net"));
var punycode = _interopRequireWildcard(require("punycode"));
var _abortError = _interopRequireDefault(require("./errors/abort-error"));
var _esAggregateError = _interopRequireDefault(require("es-aggregate-error"));
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
async function connectInParallel(options, lookup, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }
  const addresses = await lookupAllAddresses(options.host, lookup, signal);
  return await new Promise((resolve, reject) => {
    const sockets = new Array(addresses.length);
    const errors = [];
    function onError(err) {
      errors.push(err);
      this.removeListener('error', onError);
      this.removeListener('connect', onConnect);
      this.destroy();
      if (errors.length === addresses.length) {
        signal.removeEventListener('abort', onAbort);
        reject(new _esAggregateError.default(errors, 'Could not connect (parallel)'));
      }
    }
    function onConnect() {
      signal.removeEventListener('abort', onAbort);
      for (let j = 0; j < sockets.length; j++) {
        const socket = sockets[j];
        if (this === socket) {
          continue;
        }
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);
        socket.destroy();
      }
      resolve(this);
    }
    const onAbort = () => {
      for (let j = 0; j < sockets.length; j++) {
        const socket = sockets[j];
        socket.removeListener('error', onError);
        socket.removeListener('connect', onConnect);
        socket.destroy();
      }
      reject(new _abortError.default());
    };
    for (let i = 0, len = addresses.length; i < len; i++) {
      const socket = sockets[i] = _net.default.connect({
        ...options,
        host: addresses[i].address,
        family: addresses[i].family
      });
      socket.on('error', onError);
      socket.on('connect', onConnect);
    }
    signal.addEventListener('abort', onAbort, {
      once: true
    });
  });
}
async function connectInSequence(options, lookup, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }
  const errors = [];
  const addresses = await lookupAllAddresses(options.host, lookup, signal);
  for (const address of addresses) {
    try {
      return await new Promise((resolve, reject) => {
        const socket = _net.default.connect({
          ...options,
          host: address.address,
          family: address.family
        });
        const onAbort = () => {
          socket.removeListener('error', onError);
          socket.removeListener('connect', onConnect);
          socket.destroy();
          reject(new _abortError.default());
        };
        const onError = err => {
          signal.removeEventListener('abort', onAbort);
          socket.removeListener('error', onError);
          socket.removeListener('connect', onConnect);
          socket.destroy();
          reject(err);
        };
        const onConnect = () => {
          signal.removeEventListener('abort', onAbort);
          socket.removeListener('error', onError);
          socket.removeListener('connect', onConnect);
          resolve(socket);
        };
        signal.addEventListener('abort', onAbort, {
          once: true
        });
        socket.on('error', onError);
        socket.on('connect', onConnect);
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }
      errors.push(err);
      continue;
    }
  }
  throw new _esAggregateError.default(errors, 'Could not connect (sequence)');
}
/**
 * Look up all addresses for the given hostname.
 */

async function lookupAllAddresses(host, lookup, signal) {
  if (signal.aborted) {
    throw new _abortError.default();
  }
  if (_net.default.isIPv6(host)) {
    return [{
      address: host,
      family: 6
    }];
  } else if (_net.default.isIPv4(host)) {
    return [{
      address: host,
      family: 4
    }];
  } else {
    return await new Promise((resolve, reject) => {
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
}