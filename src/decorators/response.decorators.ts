import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiNotAuth() {
  return applyDecorators(
    ApiForbiddenResponse({
      schema: {
        example: {
          message: 'The user is not authorized',
          error: 'Forbidden',
          statusCode: 403,
        },
      },
    }),
  );
}

export function ApiUnauthorizedMessage(message: string[]) {
  return applyDecorators(
    ApiUnauthorizedResponse({
      schema: {
        example: {
          message,
          error: 'Forbidden',
          statusCode: 401,
        },
      },
    }),
  );
}

export function ApiForbiddenMessage(message: string) {
  return applyDecorators(
    ApiForbiddenResponse({
      schema: {
        example: {
          message,
          error: 'Forbidden',
          statusCode: 403,
        },
      },
    }),
  );
}

export function ApiBadReqUUIDNoValidation() {
  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        example: {
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  );
}

export function ApiNotFoundMessage(message: string | string[]) {
  return applyDecorators(
    ApiNotFoundResponse({
      schema: {
        example: {
          message,
          error: 'Not Found',
          statusCode: 400,
        },
      },
    }),
  );
}

export function ApiBadReqMessage(message: string | string[]) {
  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        example: {
          message,
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  );
}

export function ApiNoContentMessage(message: string) {
  return applyDecorators(
    ApiNoContentResponse({
      schema: {
        example: {
          message,
          error: 'No Content',
          statusCode: 204,
        },
      },
    }),
  );
}

export function ApiStatusOkResponse() {
  return applyDecorators(
    ApiResponse({
      status: 204,
      schema: {
        example: { status: 'ok' },
      },
    }),
  );
}
