"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = exports.TYPE = exports.SSPIToken = exports.RowToken = exports.RoutingEnvChangeToken = exports.RollbackTransactionEnvChangeToken = exports.ReturnValueToken = exports.ReturnStatusToken = exports.ResetConnectionEnvChangeToken = exports.PacketSizeEnvChangeToken = exports.OrderToken = exports.NBCRowToken = exports.LoginAckToken = exports.LanguageEnvChangeToken = exports.InfoMessageToken = exports.FedAuthInfoToken = exports.FeatureExtAckToken = exports.ErrorMessageToken = exports.DoneToken = exports.DoneProcToken = exports.DoneInProcToken = exports.DatabaseMirroringPartnerEnvChangeToken = exports.DatabaseEnvChangeToken = exports.CommitTransactionEnvChangeToken = exports.CollationChangeToken = exports.ColMetadataToken = exports.CharsetEnvChangeToken = exports.BeginTransactionEnvChangeToken = void 0;
const TYPE = {
  ALTMETADATA: 0x88,
  ALTROW: 0xD3,
  COLMETADATA: 0x81,
  COLINFO: 0xA5,
  DONE: 0xFD,
  DONEPROC: 0xFE,
  DONEINPROC: 0xFF,
  ENVCHANGE: 0xE3,
  ERROR: 0xAA,
  FEATUREEXTACK: 0xAE,
  FEDAUTHINFO: 0xEE,
  INFO: 0xAB,
  LOGINACK: 0xAD,
  NBCROW: 0xD2,
  OFFSET: 0x78,
  ORDER: 0xA9,
  RETURNSTATUS: 0x79,
  RETURNVALUE: 0xAC,
  ROW: 0xD1,
  SSPI: 0xED,
  TABNAME: 0xA4
};
exports.TYPE = TYPE;
class Token {
  constructor(name, handlerName) {
    this.name = void 0;
    this.handlerName = void 0;
    this.name = name;
    this.handlerName = handlerName;
  }
}
exports.Token = Token;
class ColMetadataToken extends Token {
  constructor(columns) {
    super('COLMETADATA', 'onColMetadata');
    this.columns = void 0;
    this.columns = columns;
  }
}
exports.ColMetadataToken = ColMetadataToken;
class DoneToken extends Token {
  constructor({
    more,
    sqlError,
    attention,
    serverError,
    rowCount,
    curCmd
  }) {
    super('DONE', 'onDone');
    this.more = void 0;
    this.sqlError = void 0;
    this.attention = void 0;
    this.serverError = void 0;
    this.rowCount = void 0;
    this.curCmd = void 0;
    this.more = more;
    this.sqlError = sqlError;
    this.attention = attention;
    this.serverError = serverError;
    this.rowCount = rowCount;
    this.curCmd = curCmd;
  }
}
exports.DoneToken = DoneToken;
class DoneInProcToken extends Token {
  constructor({
    more,
    sqlError,
    attention,
    serverError,
    rowCount,
    curCmd
  }) {
    super('DONEINPROC', 'onDoneInProc');
    this.more = void 0;
    this.sqlError = void 0;
    this.attention = void 0;
    this.serverError = void 0;
    this.rowCount = void 0;
    this.curCmd = void 0;
    this.more = more;
    this.sqlError = sqlError;
    this.attention = attention;
    this.serverError = serverError;
    this.rowCount = rowCount;
    this.curCmd = curCmd;
  }
}
exports.DoneInProcToken = DoneInProcToken;
class DoneProcToken extends Token {
  constructor({
    more,
    sqlError,
    attention,
    serverError,
    rowCount,
    curCmd
  }) {
    super('DONEPROC', 'onDoneProc');
    this.more = void 0;
    this.sqlError = void 0;
    this.attention = void 0;
    this.serverError = void 0;
    this.rowCount = void 0;
    this.curCmd = void 0;
    this.more = more;
    this.sqlError = sqlError;
    this.attention = attention;
    this.serverError = serverError;
    this.rowCount = rowCount;
    this.curCmd = curCmd;
  }
}
exports.DoneProcToken = DoneProcToken;
class DatabaseEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onDatabaseChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'DATABASE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.DatabaseEnvChangeToken = DatabaseEnvChangeToken;
class LanguageEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onLanguageChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'LANGUAGE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.LanguageEnvChangeToken = LanguageEnvChangeToken;
class CharsetEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onCharsetChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'CHARSET';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.CharsetEnvChangeToken = CharsetEnvChangeToken;
class PacketSizeEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onPacketSizeChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'PACKET_SIZE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.PacketSizeEnvChangeToken = PacketSizeEnvChangeToken;
class BeginTransactionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onBeginTransaction');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'BEGIN_TXN';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.BeginTransactionEnvChangeToken = BeginTransactionEnvChangeToken;
class CommitTransactionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onCommitTransaction');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'COMMIT_TXN';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.CommitTransactionEnvChangeToken = CommitTransactionEnvChangeToken;
class RollbackTransactionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onRollbackTransaction');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.type = 'ROLLBACK_TXN';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.RollbackTransactionEnvChangeToken = RollbackTransactionEnvChangeToken;
class DatabaseMirroringPartnerEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onDatabaseMirroringPartner');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.type = 'DATABASE_MIRRORING_PARTNER';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.DatabaseMirroringPartnerEnvChangeToken = DatabaseMirroringPartnerEnvChangeToken;
class ResetConnectionEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onResetConnection');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.type = 'RESET_CONNECTION';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.ResetConnectionEnvChangeToken = ResetConnectionEnvChangeToken;
class CollationChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onSqlCollationChange');
    this.type = void 0;
    this.oldValue = void 0;
    this.newValue = void 0;
    this.type = 'SQL_COLLATION';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.CollationChangeToken = CollationChangeToken;
class RoutingEnvChangeToken extends Token {
  constructor(newValue, oldValue) {
    super('ENVCHANGE', 'onRoutingChange');
    this.type = void 0;
    this.newValue = void 0;
    this.oldValue = void 0;
    this.type = 'ROUTING_CHANGE';
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
}
exports.RoutingEnvChangeToken = RoutingEnvChangeToken;
class FeatureExtAckToken extends Token {
  /** Value of UTF8_SUPPORT acknowledgement.
   *
   * undefined when UTF8_SUPPORT not included in token. */
  constructor(fedAuth, utf8Support) {
    super('FEATUREEXTACK', 'onFeatureExtAck');
    this.fedAuth = void 0;
    this.utf8Support = void 0;
    this.fedAuth = fedAuth;
    this.utf8Support = utf8Support;
  }
}
exports.FeatureExtAckToken = FeatureExtAckToken;
class FedAuthInfoToken extends Token {
  constructor(spn, stsurl) {
    super('FEDAUTHINFO', 'onFedAuthInfo');
    this.spn = void 0;
    this.stsurl = void 0;
    this.spn = spn;
    this.stsurl = stsurl;
  }
}
exports.FedAuthInfoToken = FedAuthInfoToken;
class InfoMessageToken extends Token {
  constructor({
    number,
    state,
    class: clazz,
    message,
    serverName,
    procName,
    lineNumber
  }) {
    super('INFO', 'onInfoMessage');
    this.number = void 0;
    this.state = void 0;
    this.class = void 0;
    this.message = void 0;
    this.serverName = void 0;
    this.procName = void 0;
    this.lineNumber = void 0;
    this.number = number;
    this.state = state;
    this.class = clazz;
    this.message = message;
    this.serverName = serverName;
    this.procName = procName;
    this.lineNumber = lineNumber;
  }
}
exports.InfoMessageToken = InfoMessageToken;
class ErrorMessageToken extends Token {
  constructor({
    number,
    state,
    class: clazz,
    message,
    serverName,
    procName,
    lineNumber
  }) {
    super('ERROR', 'onErrorMessage');
    this.number = void 0;
    this.state = void 0;
    this.class = void 0;
    this.message = void 0;
    this.serverName = void 0;
    this.procName = void 0;
    this.lineNumber = void 0;
    this.number = number;
    this.state = state;
    this.class = clazz;
    this.message = message;
    this.serverName = serverName;
    this.procName = procName;
    this.lineNumber = lineNumber;
  }
}
exports.ErrorMessageToken = ErrorMessageToken;
class LoginAckToken extends Token {
  constructor({
    interface: interfaze,
    tdsVersion,
    progName,
    progVersion
  }) {
    super('LOGINACK', 'onLoginAck');
    this.interface = void 0;
    this.tdsVersion = void 0;
    this.progName = void 0;
    this.progVersion = void 0;
    this.interface = interfaze;
    this.tdsVersion = tdsVersion;
    this.progName = progName;
    this.progVersion = progVersion;
  }
}
exports.LoginAckToken = LoginAckToken;
class NBCRowToken extends Token {
  constructor(columns) {
    super('NBCROW', 'onRow');
    this.columns = void 0;
    this.columns = columns;
  }
}
exports.NBCRowToken = NBCRowToken;
class OrderToken extends Token {
  constructor(orderColumns) {
    super('ORDER', 'onOrder');
    this.orderColumns = void 0;
    this.orderColumns = orderColumns;
  }
}
exports.OrderToken = OrderToken;
class ReturnStatusToken extends Token {
  constructor(value) {
    super('RETURNSTATUS', 'onReturnStatus');
    this.value = void 0;
    this.value = value;
  }
}
exports.ReturnStatusToken = ReturnStatusToken;
class ReturnValueToken extends Token {
  constructor({
    paramOrdinal,
    paramName,
    metadata,
    value
  }) {
    super('RETURNVALUE', 'onReturnValue');
    this.paramOrdinal = void 0;
    this.paramName = void 0;
    this.metadata = void 0;
    this.value = void 0;
    this.paramOrdinal = paramOrdinal;
    this.paramName = paramName;
    this.metadata = metadata;
    this.value = value;
  }
}
exports.ReturnValueToken = ReturnValueToken;
class RowToken extends Token {
  constructor(columns) {
    super('ROW', 'onRow');
    this.columns = void 0;
    this.columns = columns;
  }
}
exports.RowToken = RowToken;
class SSPIToken extends Token {
  constructor(ntlmpacket, ntlmpacketBuffer) {
    super('SSPICHALLENGE', 'onSSPI');
    this.ntlmpacket = void 0;
    this.ntlmpacketBuffer = void 0;
    this.ntlmpacket = ntlmpacket;
    this.ntlmpacketBuffer = ntlmpacketBuffer;
  }
}
exports.SSPIToken = SSPIToken;