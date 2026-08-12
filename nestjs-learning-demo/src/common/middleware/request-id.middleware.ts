import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export type RequestWithId = Request & { requestId?: string };

const SAFE_REQUEST_ID = /^[A-Za-z0-9._:-]{1,128}$/;

export function resolveRequestId(value: string | undefined): string {
  return value && SAFE_REQUEST_ID.test(value) ? value : randomUUID();
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(request: RequestWithId, response: Response, next: NextFunction): void {
    const incomingRequestId = request.header('x-request-id');
    request.requestId = resolveRequestId(incomingRequestId);
    response.setHeader('x-request-id', request.requestId);
    next();
  }
}
