"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class TimeoutError extends Error {
  constructor() {
    super('The operation was aborted due to timeout');
    this.code = void 0;
    this.code = 'TIMEOUT_ERR';
    this.name = 'TimeoutError';
  }
}
exports.default = TimeoutError;