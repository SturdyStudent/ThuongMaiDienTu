"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _token = require("./token");
const FEATURE_ID = {
  SESSIONRECOVERY: 0x01,
  FEDAUTH: 0x02,
  COLUMNENCRYPTION: 0x04,
  GLOBALTRANSACTIONS: 0x05,
  AZURESQLSUPPORT: 0x08,
  UTF8_SUPPORT: 0x0A,
  TERMINATOR: 0xFF
};
function featureExtAckParser(parser, _options, callback) {
  let fedAuth;
  let utf8Support;
  function next() {
    parser.readUInt8(featureId => {
      if (featureId === FEATURE_ID.TERMINATOR) {
        return callback(new _token.FeatureExtAckToken(fedAuth, utf8Support));
      }
      parser.readUInt32LE(featureAckDataLen => {
        parser.readBuffer(featureAckDataLen, featureData => {
          switch (featureId) {
            case FEATURE_ID.FEDAUTH:
              fedAuth = featureData;
              break;
            case FEATURE_ID.UTF8_SUPPORT:
              utf8Support = !!featureData[0];
              break;
          }
          next();
        });
      });
    });
  }
  next();
}
var _default = featureExtAckParser;
exports.default = _default;
module.exports = featureExtAckParser;