"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class AbortError extends Error {
  constructor() {
    super('The operation was aborted');
    this.code = void 0;
    this.code = 'ABORT_ERR';
    this.name = 'AbortError';
  }
}
exports.default = AbortError;