"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestError = exports.ConnectionError = void 0;
class ConnectionError extends Error {
  constructor(message, code) {
    super(message);
    this.code = void 0;
    this.isTransient = void 0;
    this.code = code;
  }
}
exports.ConnectionError = ConnectionError;
class RequestError extends Error {
  constructor(message, code) {
    super(message);
    this.code = void 0;
    this.number = void 0;
    this.state = void 0;
    this.class = void 0;
    this.serverName = void 0;
    this.procName = void 0;
    this.lineNumber = void 0;
    this.code = code;
  }
}
exports.RequestError = RequestError;