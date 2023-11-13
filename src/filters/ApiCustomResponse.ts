import { applyDecorators } from '@nestjs/common';
import {
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiConflictResponse,
  ApiPayloadTooLargeResponse,
  ApiTooManyRequestsResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiMethodNotAllowedResponse,
} from '@nestjs/swagger';

export function ApiCustomResponse(
  statuses: (
    | 200
    | 201
    | 400
    | 401
    | 403
    | 404
    | 405
    | 406
    | 409
    | 413
    | 429
    | 498
    | 500
  )[],
) {
  const decorators = [];

  if (statuses.includes(200)) {
    decorators.push(
      ApiOkResponse({
        description: 'Ok',
        schema: {
          type: 'object',
          properties: {
            response: { type: 'string', example: 'Ok' },
            status: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Ok' },
            name: { type: 'string', example: 'HttpException' },
          },
        },
      }),
    );
  }
  if (statuses.includes(201)) {
    decorators.push(
      ApiCreatedResponse({
        description: 'Resource created successfully',
        schema: {
          type: 'object',
          properties: {
            response: { type: 'string', example: 'Success' },
            status: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Success' },
            name: { type: 'string', example: 'HttpException' },
          },
        },
      }),
    );
  }
  if (statuses.includes(400)) {
    decorators.push(
      ApiBadRequestResponse({
        description:
          'The request could not be understood by the server due to malformed syntax.',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Invalid request syntax.',
            },
            statusCode: { type: 'number', example: 400 },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      }),
    );
  }
  if (statuses.includes(401)) {
    decorators.push(
      ApiUnauthorizedResponse({
        description: 'The request requires valid authentication credentials.',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Unauthorized. Please provide valid credentials.',
            },
            statusCode: { type: 'number', example: 401 },
          },
        },
      }),
    );
  }
  if (statuses.includes(403)) {
    decorators.push(
      ApiForbiddenResponse({
        description:
          'The user does not have the necessary permissions for a resource, or access is forbidden regardless of authentication.',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'You do not have permission to perform this action.',
            },
            statusCode: { type: 'number', example: 403 },
          },
        },
      }),
    );
  }
  if (statuses.includes(404)) {
    decorators.push(
      ApiNotFoundResponse({
        description: 'The requested resource could not be found.',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Resource not found.',
            },
            statusCode: { type: 'number', example: 404 },
          },
        },
      }),
    );
  }
  if (statuses.includes(405)) {
    decorators.push(
      ApiMethodNotAllowedResponse({
        description: 'Not allowed',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Fill all required fields',
            },
            statusCode: { type: 'number', example: 405 },
          },
        },
      }),
    );
  }
  if (statuses.includes(406)) {
    decorators.push(
      ApiNotAcceptableResponse({
        description:
          "The server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers.",
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example:
                'The requested content format is not supported. Please try a different format.',
            },
            statusCode: { type: 'number', example: 406 },
          },
        },
      }),
    );
  }
  if (statuses.includes(409)) {
    decorators.push(
      ApiConflictResponse({
        description:
          'The request could not be processed because of a conflict in the request, such as an edit conflict in the case of multiple updates.',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example:
                'The request could not be completed due to a conflict with the current state of the target resource.',
            },
            statusCode: { type: 'number', example: 409 },
          },
        },
      }),
    );
  }
  if (statuses.includes(413)) {
    decorators.push(
      ApiPayloadTooLargeResponse({
        description:
          'The request is larger than the server is willing or able to process.',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Payload too large' },
            statusCode: { type: 'number', example: 413 },
          },
        },
      }),
    );
  }
  if (statuses.includes(429)) {
    decorators.push(
      ApiTooManyRequestsResponse({
        description:
          'The user has sent too many requests in a given amount of time ("rate limiting").',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Too many requests, please try again later.',
            },
            statusCode: { type: 'number', example: 429 },
          },
        },
      }),
    );
  }

  if (statuses.includes(498)) {
    decorators.push(
      ApiResponse({
        status: 498,
        description:
          'The token has expired and is no longer valid for the requested resource or operation.',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Token expired or invalid.' },
            statusCode: { type: 'number', example: 498 },
          },
        },
      }),
    );
  }

  if (statuses.includes(500)) {
    decorators.push(
      ApiResponse({
        status: 500,
        description:
          'The server encountered an unexpected condition that prevented it from fulfilling the request.',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'An unexpected error occurred on the server.',
            },
            statusCode: { type: 'number', example: 500 },
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
