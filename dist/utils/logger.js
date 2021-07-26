"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
/**
 * Logger
 */
class Logger {
    /**
     * Debug logger
     *
     * @param msg - debugging message
     * @param supportingDetails - array of any supporting details
     */
    debug(msg, ...supportingDetails) {
        this.emitLogMessage('debug', "\u001B[1;32m" /* Green */, msg, supportingDetails);
    }
    /**
     * Info logger
     *
     * @param msg - information message
     * @param supportingDetails - array of any supporting details
     */
    info(msg, ...supportingDetails) {
        this.emitLogMessage('info', "\u001B[0;37m" /* White */, msg, supportingDetails);
    }
    /**
     * Warn logger
     *
     * @param msg - warning message
     * @param supportingDetails - array of any supporting details
     */
    warn(msg, ...supportingDetails) {
        this.emitLogMessage('warn', "\u001B[1;33m" /* Yellow */, msg, supportingDetails);
    }
    /**
     * Error logger
     *
     * @param msg - error message
     * @param supportingDetails - array of any supporting details
     */
    error(msg, ...supportingDetails) {
        this.emitLogMessage('error', "\u001B[1;31m" /* Red */, msg, supportingDetails);
    }
    /**
     * Emits log message
     *
     * @param msgType - message type
     * @param color - message color
     * @param msg - debugging message
     * @param supportingDetails - array of any supporting details
     */
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
