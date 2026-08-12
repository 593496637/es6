import type { NextFunction, Response } from 'express';
import { RequestIdMiddleware, RequestWithId } from './request-id.middleware';

describe('RequestIdMiddleware', () => {
  let middleware: RequestIdMiddleware;
  let response: { setHeader: jest.Mock };
  let next: jest.MockedFunction<NextFunction>;

  const runMiddleware = (incomingRequestId: string | undefined) => {
    const headerMock = jest.fn().mockReturnValue(incomingRequestId);
    const request = {
      header: headerMock,
    } as unknown as RequestWithId;

    middleware.use(request, response as unknown as Response, next);

    return { request, headerMock };
  };

  beforeEach(() => {
    middleware = new RequestIdMiddleware();
    response = { setHeader: jest.fn() };
    next = jest.fn();
  });

  it('接受符合白名单且长度合规的请求 ID', () => {
    const { request, headerMock } = runMiddleware(
      'client.request-123:trace_456',
    );

    expect(headerMock).toHaveBeenCalledWith('x-request-id');
    expect(request.requestId).toBe('client.request-123:trace_456');
    expect(response.setHeader).toHaveBeenCalledWith(
      'x-request-id',
      'client.request-123:trace_456',
    );
    expect(next).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['过长请求 ID', 'a'.repeat(129)],
    ['含控制字符的请求 ID', 'trusted\nforged-log-entry'],
  ])('%s 会被替换为新 UUID', (_caseName, incomingRequestId) => {
    const { request } = runMiddleware(incomingRequestId);

    expect(request.requestId).not.toBe(incomingRequestId);
    expect(request.requestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(response.setHeader).toHaveBeenCalledWith(
      'x-request-id',
      request.requestId,
    );
    expect(next).toHaveBeenCalledTimes(1);
  });
});
