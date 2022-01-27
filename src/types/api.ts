import { Response, Request } from 'express';
import { Send } from 'express-serve-static-core';

export interface TypedRequest<T> extends Request {
  body: T
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>
}
