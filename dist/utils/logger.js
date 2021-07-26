"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    debug(msg, ...supportingDetails) {
        this.emitLogMessage('debug', "\u001B[1;32m" /* Green */, msg, supportingDetails);
    }
    info(msg, ...supportingDetails) {
        this.emitLogMessage('info', "\u001B[0;37m" /* White */, msg, supportingDetails);
    }
    warn(msg, ...supportingDetails) {
        this.emitLogMessage('warn', "\u001B[1;33m" /* Yellow */, msg, supportingDetails);
    }
    error(msg, ...supportingDetails) {
        this.emitLogMessage('error', "\u001B[1;31m" /* Red */, msg, supportingDetails);
    }
    emitLogMessage(msgType, color, msg, supportingDetails) {
        if (supportingDetails.length > 0) {
            console.log('[' + color + '' + msgType.toUpperCase() + '] ' + msg + supportingDetails);
        }
        else {
            console.log('[' + color + '' + msgType.toUpperCase() + '] ' + msg);
        }
    }
}
exports.Logger = Logger;
