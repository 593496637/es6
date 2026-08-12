import {
  ArgumentsHost,
  BadRequestException,
  HttpException,
  HttpStatus,
  ServiceUnavailableException,
} from '@nestjs/common';
import type { Request } from 'express';
import type { RequestWithId } from '../middleware/request-id.middleware';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let response: { status: jest.Mock; json: jest.Mock };
  let responseBody: unknown;

  interface UnifiedErrorBody {
    statusCode: number;
    error: string;
    message: string | string[];
    path: string;
    timestamp: string;
    requestId?: string;
  }

  const createHost = (
    request: Partial<Request & RequestWithId> = {},
  ): ArgumentsHost =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          originalUrl: '/api/projects',
          requestId: 'request-123',
          ...request,
        }),
        getResponse: () => response,
      }),
    }) as unknown as ArgumentsHost;

  beforeEach(() => {
    response = {
      status: jest.fn(),
      json: jest.fn((body: unknown) => {
        responseBody = body;
      }),
    };
    response.status.mockReturnValue(response);
    filter = new HttpExceptionFilter();
  });

  it('原样保留 Terminus 的 503 健康检查响应', () => {
    const healthBody = {
      status: 'error' as const,
      info: {},
      error: { database: { status: 'down' } },
      details: { database: { status: 'down' } },
    };

    filter.catch(
      new ServiceUnavailableException(healthBody),
      createHost({ originalUrl: '/api/health/ready' }),
    );

    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.SERVICE_UNAVAILABLE,
    );
    expect(response.json).toHaveBeenCalledWith(healthBody);
  });

  it('将普通 HttpException 转换为统一错误结构', () => {
    filter.catch(
      new BadRequestException({
        message: ['name must be longer than or equal to 2 characters'],
        error: 'Bad Request',
      }),
      createHost(),
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(responseBody).toMatchObject({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message: ['name must be longer than or equal to 2 characters'],
      path: '/api/projects',
      requestId: 'request-123',
    });
    expect((responseBody as UnifiedErrorBody).timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
  });

  it('异常响应中的非字符串 error 不会污染统一 error 字段', () => {
    const nestedError = { database: { status: 'down' } };

    filter.catch(
      new HttpException(
        { message: '请求无效', error: nestedError },
        HttpStatus.BAD_REQUEST,
      ),
      createHost(),
    );

    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.BAD_REQUEST,
        error: HttpStatus[HttpStatus.BAD_REQUEST],
        message: '请求无效',
      }),
    );
    expect((responseBody as UnifiedErrorBody).error).not.toBe(nestedError);
  });
});
