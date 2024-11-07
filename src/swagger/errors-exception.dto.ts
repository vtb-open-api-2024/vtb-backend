import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { BadRequestExceptionDto } from './bad-request-exception.dto';
import { ConflictExceptionDto } from './conflict-exception.dto';
import { ServerExceptionDto } from './server-exception.dto';
import { UnauthorizeExceptionDto } from './unauthorize-exception.dto';
import { UnprocessableEntityExceptionDto } from './unprocessable-entity-exception.dto';

export function ApiErrorResponses() {
  return applyDecorators(
    ApiInternalServerErrorResponse({ type: ServerExceptionDto }),
    ApiBadRequestResponse({ type: BadRequestExceptionDto }),
    ApiConflictResponse({ type: ConflictExceptionDto }),
    ApiUnprocessableEntityResponse({
      type: UnprocessableEntityExceptionDto,
    }),
    ApiUnauthorizedResponse({ type: UnauthorizeExceptionDto }),
  );
}
