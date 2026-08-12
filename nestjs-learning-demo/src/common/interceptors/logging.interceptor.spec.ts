import {
  Logger,
  type CallHandler,
  type ExecutionContext,
} from '@nestjs/common';
import { lastValueFrom, of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  afterEach(() => jest.restoreAllMocks());

  it('请求结束时记录方法、路径、耗时与安全 requestId', async () => {
    const log = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          method: 'GET',
          originalUrl: '/api/projects',
          requestId: 'request-123',
        }),
      }),
    } as unknown as ExecutionContext;
    const next = { handle: () => of({ ok: true }) } as CallHandler;

    await lastValueFrom(new LoggingInterceptor().intercept(context, next));

    expect(log).toHaveBeenCalledWith(
      expect.stringMatching(
        /^GET \/api\/projects \d+ms requestId=request-123$/,
      ),
    );
  });
});
