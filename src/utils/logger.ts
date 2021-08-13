/* Copyright (c) 2021 Rishika Maroo */

import { LogColor, LogTypes } from '../constants';
import { LogInterface } from '../types';

/**
 * Logger
 */
export class Logger implements LogInterface {
  /**
   * Debug logger
   *
   * @param msg - debugging message
   * @param supportingDetails - array of any supporting details
   */
  public debug(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('debug', LogColor.Green, msg, supportingDetails);
  }

  /**
   * Info logger
   *
   * @param msg - information message
   * @param supportingDetails - array of any supporting details
   */
  public info(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('info', LogColor.White, msg, supportingDetails);
  }

  /**
   * Warn logger
   *
   * @param msg - warning message
   * @param supportingDetails - array of any supporting details
   */
  public warn(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('warn', LogColor.Yellow, msg, supportingDetails);
  }

  /**
   * Error logger
   *
   * @param msg - error message
   * @param supportingDetails - array of any supporting details
   */
  public error(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('error', LogColor.Red, msg, supportingDetails);
  }

  /**
   * Emits log message
   *
   * @param msgType - message type
   * @param color - message color
   * @param msg - debugging message
   * @param supportingDetails - array of any supporting details
   */
  private emitLogMessage(msgType: LogTypes, color: string, msg: string, supportingDetails: any[]) {
    /* eslint-disable no-console */
    if (supportingDetails.length > 0) {
      console.log('[' + color + '' + msgType.toUpperCase() + '] ' + msg + supportingDetails);
    } else {
      console.log('[' + color + '' + msgType.toUpperCase() + '] ' + msg);
    }
    /* eslint-disable no-console */
  }
}
