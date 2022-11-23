"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTimeout = withTimeout;
var _nodeAbortController = require("node-abort-controller");
var _timeoutError = _interopRequireDefault(require("../errors/timeout-error"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

/**
 * Run the function `func` with an `AbortSignal` that will automatically abort after the time specified
 * by `timeout` or when the given `signal` is aborted.
 *
 * On timeout, the `timeoutSignal` will be aborted and a `TimeoutError` will be thrown.
 */
async function withTimeout(timeout, func, signal) {
  const timeoutController = new _nodeAbortController.AbortController();
  const abortCurrentAttempt = () => {
    timeoutController.abort();
  };
  const timer = setTimeout(abortCurrentAttempt, timeout);
  signal === null || signal === void 0 ? void 0 : signal.addEventListener('abort', abortCurrentAttempt, {
    once: true
  });
  try {
    return await func(timeoutController.signal);
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError' && !(signal && signal.aborted)) {
      throw new _timeoutError.default();
    }
    throw err;
  } finally {
    signal === null || signal === void 0 ? void 0 : signal.removeEventListener('abort', abortCurrentAttempt);
    clearTimeout(timer);
  }
}