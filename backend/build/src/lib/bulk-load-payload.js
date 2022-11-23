"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulkLoadPayload = void 0;
let _Symbol$asyncIterator;
_Symbol$asyncIterator = Symbol.asyncIterator;
class BulkLoadPayload {
  constructor(bulkLoad) {
    this.bulkLoad = void 0;
    this.iterator = void 0;
    this.bulkLoad = bulkLoad; // We need to grab the iterator here so that `error` event handlers are set up
    // as early as possible (and are not potentially lost).

    this.iterator = this.bulkLoad.rowToPacketTransform[Symbol.asyncIterator]();
  }
  [_Symbol$asyncIterator]() {
    return this.iterator;
  }
  toString(indent = '') {
    return indent + 'BulkLoad';
  }
}
exports.BulkLoadPayload = BulkLoadPayload;