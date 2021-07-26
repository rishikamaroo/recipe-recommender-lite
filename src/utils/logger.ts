import { LogColor, LogTypes } from '../constants';
import { LogInterface } from '../types';

export class Logger implements LogInterface {
  public debug(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('debug', LogColor.Green, msg, supportingDetails);
  }

  public info(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('info', LogColor.White, msg, supportingDetails);
  }

  public warn(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('warn', LogColor.Yellow, msg, supportingDetails);
  }

  public error(msg: string, ...supportingDetails: any[]): void {
    this.emitLogMessage('error', LogColor.Red, msg, supportingDetails);
  }

  private emitLogMessage(msgType: LogTypes, color: string, msg: string, supportingDetails: any[]) {
    if (supportingDetails.length > 0) {
      console.log('[' + color + '' + msgType.toUpperCase() + '] ' + msg + supportingDetails);
    } else {
      console.log('[' + color + '' + msgType.toUpperCase() + '] ' + msg);
    }
  }
}
