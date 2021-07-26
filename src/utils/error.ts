import { IException } from "../types";

export class ValidationError extends Error implements IException {
  public code: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = "401";
  }
}

export class InvalidRequest extends Error implements IException {
  public code: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = "401";
  }
}

export class NotFoundError extends Error implements IException {
  public code: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = "404";
  }
}

export class InternalServerError extends Error implements IException {
  public code: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = "500";
  }
}
