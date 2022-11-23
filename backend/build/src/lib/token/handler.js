"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnexpectedTokenError = exports.TokenHandler = exports.RequestTokenHandler = exports.Login7TokenHandler = exports.InitialSqlTokenHandler = exports.AttentionTokenHandler = void 0;
var _request = _interopRequireDefault(require("../request"));
var _errors = require("../errors");
var _esAggregateError = _interopRequireDefault(require("es-aggregate-error"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
class UnexpectedTokenError extends Error {
  constructor(handler, token) {
    super('Unexpected token `' + token.name + '` in `' + handler.constructor.name + '`');
  }
}
exports.UnexpectedTokenError = UnexpectedTokenError;
class TokenHandler {
  onInfoMessage(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onErrorMessage(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onSSPI(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onDatabaseChange(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onLanguageChange(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onCharsetChange(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onSqlCollationChange(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onRoutingChange(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onPacketSizeChange(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onResetConnection(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onBeginTransaction(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onCommitTransaction(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onRollbackTransaction(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onFedAuthInfo(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onFeatureExtAck(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onLoginAck(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onColMetadata(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onOrder(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onRow(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onReturnStatus(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onReturnValue(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onDoneProc(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onDoneInProc(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onDone(token) {
    throw new UnexpectedTokenError(this, token);
  }
  onDatabaseMirroringPartner(token) {
    throw new UnexpectedTokenError(this, token);
  }
}
/**
 * A handler for tokens received in the response message to the initial SQL Batch request
 * that sets up different connection settings.
 */

exports.TokenHandler = TokenHandler;
class InitialSqlTokenHandler extends TokenHandler {
  constructor(connection) {
    super();
    this.connection = void 0;
    this.connection = connection;
  }
  onInfoMessage(token) {
    this.connection.emit('infoMessage', token);
  }
  onErrorMessage(token) {
    this.connection.emit('errorMessage', token);
  }
  onDatabaseChange(token) {
    this.connection.emit('databaseChange', token.newValue);
  }
  onLanguageChange(token) {
    this.connection.emit('languageChange', token.newValue);
  }
  onCharsetChange(token) {
    this.connection.emit('charsetChange', token.newValue);
  }
  onSqlCollationChange(token) {
    this.connection.databaseCollation = token.newValue;
  }
  onPacketSizeChange(token) {
    this.connection.messageIo.packetSize(token.newValue);
  }
  onBeginTransaction(token) {
    this.connection.transactionDescriptors.push(token.newValue);
    this.connection.inTransaction = true;
  }
  onCommitTransaction(token) {
    this.connection.transactionDescriptors.length = 1;
    this.connection.inTransaction = false;
  }
  onRollbackTransaction(token) {
    this.connection.transactionDescriptors.length = 1; // An outermost transaction was rolled back. Reset the transaction counter

    this.connection.inTransaction = false;
    this.connection.emit('rollbackTransaction');
  }
  onColMetadata(token) {
    this.connection.emit('error', new Error("Received 'columnMetadata' when no sqlRequest is in progress"));
    this.connection.close();
  }
  onOrder(token) {
    this.connection.emit('error', new Error("Received 'order' when no sqlRequest is in progress"));
    this.connection.close();
  }
  onRow(token) {
    this.connection.emit('error', new Error("Received 'row' when no sqlRequest is in progress"));
    this.connection.close();
  }
  onReturnStatus(token) {// Do nothing
  }
  onReturnValue(token) {// Do nothing
  }
  onDoneProc(token) {// Do nothing
  }
  onDoneInProc(token) {// Do nothing
  }
  onDone(token) {// Do nothing
  }
  onResetConnection(token) {
    this.connection.emit('resetConnection');
  }
}
/**
 * A handler for tokens received in the response message to a Login7 message.
 */

exports.InitialSqlTokenHandler = InitialSqlTokenHandler;
class Login7TokenHandler extends TokenHandler {
  constructor(connection) {
    super();
    this.connection = void 0;
    this.fedAuthInfoToken = void 0;
    this.routingData = void 0;
    this.loginAckReceived = false;
    this.connection = connection;
  }
  onInfoMessage(token) {
    this.connection.emit('infoMessage', token);
  }
  onErrorMessage(token) {
    this.connection.emit('errorMessage', token);
    const error = new _errors.ConnectionError(token.message, 'ELOGIN');
    const isLoginErrorTransient = this.connection.transientErrorLookup.isTransientError(token.number);
    if (isLoginErrorTransient && this.connection.curTransientRetryCount !== this.connection.config.options.maxRetriesOnTransientErrors) {
      error.isTransient = true;
    }
    this.connection.loginError = error;
  }
  onSSPI(token) {
    if (token.ntlmpacket) {
      this.connection.ntlmpacket = token.ntlmpacket;
      this.connection.ntlmpacketBuffer = token.ntlmpacketBuffer;
    }
  }
  onDatabaseChange(token) {
    this.connection.emit('databaseChange', token.newValue);
  }
  onLanguageChange(token) {
    this.connection.emit('languageChange', token.newValue);
  }
  onCharsetChange(token) {
    this.connection.emit('charsetChange', token.newValue);
  }
  onSqlCollationChange(token) {
    this.connection.databaseCollation = token.newValue;
  }
  onFedAuthInfo(token) {
    this.fedAuthInfoToken = token;
  }
  onFeatureExtAck(token) {
    const {
      authentication
    } = this.connection.config;
    if (authentication.type === 'azure-active-directory-password' || authentication.type === 'azure-active-directory-access-token' || authentication.type === 'azure-active-directory-msi-vm' || authentication.type === 'azure-active-directory-msi-app-service' || authentication.type === 'azure-active-directory-service-principal-secret' || authentication.type === 'azure-active-directory-default') {
      if (token.fedAuth === undefined) {
        this.connection.loginError = new _errors.ConnectionError('Did not receive Active Directory authentication acknowledgement');
      } else if (token.fedAuth.length !== 0) {
        this.connection.loginError = new _errors.ConnectionError(`Active Directory authentication acknowledgment for ${authentication.type} authentication method includes extra data`);
      }
    } else if (token.fedAuth === undefined && token.utf8Support === undefined) {
      this.connection.loginError = new _errors.ConnectionError('Received acknowledgement for unknown feature');
    } else if (token.fedAuth) {
      this.connection.loginError = new _errors.ConnectionError('Did not request Active Directory authentication, but received the acknowledgment');
    }
  }
  onLoginAck(token) {
    if (!token.tdsVersion) {
      // unsupported TDS version
      this.connection.loginError = new _errors.ConnectionError('Server responded with unknown TDS version.', 'ETDS');
      return;
    }
    if (!token.interface) {
      // unsupported interface
      this.connection.loginError = new _errors.ConnectionError('Server responded with unsupported interface.', 'EINTERFACENOTSUPP');
      return;
    } // use negotiated version

    this.connection.config.options.tdsVersion = token.tdsVersion;
    this.loginAckReceived = true;
  }
  onRoutingChange(token) {
    // Removes instance name attached to the redirect url. E.g., redirect.db.net\instance1 --> redirect.db.net
    const [server] = token.newValue.server.split('\\');
    this.routingData = {
      server,
      port: token.newValue.port
    };
  }
  onDoneInProc(token) {// Do nothing
  }
  onDone(token) {// Do nothing
  }
  onPacketSizeChange(token) {
    this.connection.messageIo.packetSize(token.newValue);
  }
  onDatabaseMirroringPartner(token) {// Do nothing
  }
}
/**
 * A handler for tokens received in the response message to a RPC Request,
 * a SQL Batch Request, a Bulk Load BCP Request or a Transaction Manager Request.
 */

exports.Login7TokenHandler = Login7TokenHandler;
class RequestTokenHandler extends TokenHandler {
  constructor(connection, request) {
    super();
    this.connection = void 0;
    this.request = void 0;
    this.errors = void 0;
    this.connection = connection;
    this.request = request;
    this.errors = [];
  }
  onInfoMessage(token) {
    this.connection.emit('infoMessage', token);
  }
  onErrorMessage(token) {
    this.connection.emit('errorMessage', token);
    if (!this.request.canceled) {
      const error = new _errors.RequestError(token.message, 'EREQUEST');
      error.number = token.number;
      error.state = token.state;
      error.class = token.class;
      error.serverName = token.serverName;
      error.procName = token.procName;
      error.lineNumber = token.lineNumber;
      this.errors.push(error);
      this.request.error = error;
      if (this.request instanceof _request.default && this.errors.length > 1) {
        this.request.error = new _esAggregateError.default(this.errors);
      }
    }
  }
  onDatabaseChange(token) {
    this.connection.emit('databaseChange', token.newValue);
  }
  onLanguageChange(token) {
    this.connection.emit('languageChange', token.newValue);
  }
  onCharsetChange(token) {
    this.connection.emit('charsetChange', token.newValue);
  }
  onSqlCollationChange(token) {
    this.connection.databaseCollation = token.newValue;
  }
  onPacketSizeChange(token) {
    this.connection.messageIo.packetSize(token.newValue);
  }
  onBeginTransaction(token) {
    this.connection.transactionDescriptors.push(token.newValue);
    this.connection.inTransaction = true;
  }
  onCommitTransaction(token) {
    this.connection.transactionDescriptors.length = 1;
    this.connection.inTransaction = false;
  }
  onRollbackTransaction(token) {
    this.connection.transactionDescriptors.length = 1; // An outermost transaction was rolled back. Reset the transaction counter

    this.connection.inTransaction = false;
    this.connection.emit('rollbackTransaction');
  }
  onColMetadata(token) {
    if (!this.request.canceled) {
      if (this.connection.config.options.useColumnNames) {
        const columns = Object.create(null);
        for (let j = 0, len = token.columns.length; j < len; j++) {
          const col = token.columns[j];
          if (columns[col.colName] == null) {
            columns[col.colName] = col;
          }
        }
        this.request.emit('columnMetadata', columns);
      } else {
        this.request.emit('columnMetadata', token.columns);
      }
    }
  }
  onOrder(token) {
    if (!this.request.canceled) {
      this.request.emit('order', token.orderColumns);
    }
  }
  onRow(token) {
    if (!this.request.canceled) {
      if (this.connection.config.options.rowCollectionOnRequestCompletion) {
        this.request.rows.push(token.columns);
      }
      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst.push(token.columns);
      }
      this.request.emit('row', token.columns);
    }
  }
  onReturnStatus(token) {
    if (!this.request.canceled) {
      // Keep value for passing in 'doneProc' event.
      this.connection.procReturnStatusValue = token.value;
    }
  }
  onReturnValue(token) {
    if (!this.request.canceled) {
      this.request.emit('returnValue', token.paramName, token.value, token.metadata);
    }
  }
  onDoneProc(token) {
    if (!this.request.canceled) {
      if (token.sqlError && !this.request.error) {
        // check if the DONE_ERROR flags was set, but an ERROR token was not sent.
        this.request.error = new _errors.RequestError('An unknown error has occurred.', 'UNKNOWN');
      }
      this.request.emit('doneProc', token.rowCount, token.more, this.connection.procReturnStatusValue, this.request.rst);
      this.connection.procReturnStatusValue = undefined;
      if (token.rowCount !== undefined) {
        this.request.rowCount += token.rowCount;
      }
      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst = [];
      }
    }
  }
  onDoneInProc(token) {
    if (!this.request.canceled) {
      this.request.emit('doneInProc', token.rowCount, token.more, this.request.rst);
      if (token.rowCount !== undefined) {
        this.request.rowCount += token.rowCount;
      }
      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst = [];
      }
    }
  }
  onDone(token) {
    if (!this.request.canceled) {
      if (token.sqlError && !this.request.error) {
        // check if the DONE_ERROR flags was set, but an ERROR token was not sent.
        this.request.error = new _errors.RequestError('An unknown error has occurred.', 'UNKNOWN');
      }
      this.request.emit('done', token.rowCount, token.more, this.request.rst);
      if (token.rowCount !== undefined) {
        this.request.rowCount += token.rowCount;
      }
      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst = [];
      }
    }
  }
  onResetConnection(token) {
    this.connection.emit('resetConnection');
  }
}
/**
 * A handler for the attention acknowledgement message.
 *
 * This message only contains a `DONE` token that acknowledges
 * that the attention message was received by the server.
 */

exports.RequestTokenHandler = RequestTokenHandler;
class AttentionTokenHandler extends TokenHandler {
  /**
   * Returns whether an attention acknowledgement was received.
   */
  constructor(connection, request) {
    super();
    this.connection = void 0;
    this.request = void 0;
    this.attentionReceived = void 0;
    this.connection = connection;
    this.request = request;
    this.attentionReceived = false;
  }
  onDone(token) {
    if (token.attention) {
      this.attentionReceived = true;
    }
  }
}
exports.AttentionTokenHandler = AttentionTokenHandler;