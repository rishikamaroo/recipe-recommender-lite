"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    debug(msg, ...supportingDetails) {
        this.emitLogMessage("debug", msg, supportingDetails);
    }
    info(msg, ...supportingDetails) {
        this.emitLogMessage("info", msg, supportingDetails);
    }
    warn(msg, ...supportingDetails) {
        this.emitLogMessage("warn", msg, supportingDetails);
    }
    error(msg, ...supportingDetails) {
        this.emitLogMessage("error", msg, supportingDetails);
    }
    emitLogMessage(msgType, msg, supportingDetails) {
        if (supportingDetails.length > 0) {
            console.log("[" + msgType.toUpperCase() + "] " + msg + supportingDetails);
        }
        else {
            console.log("[" + msgType.toUpperCase() + "] " + msg);
        }
    }
}
exports.Logger = Logger;
