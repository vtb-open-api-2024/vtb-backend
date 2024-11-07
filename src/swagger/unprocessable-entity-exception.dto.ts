import { HttpStatus } from '@nestjs/common';
import { ErrorBaseDto } from './error-base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UnprocessableEntityExceptionDto extends ErrorBaseDto {
  @ApiProperty({ example: 422 })
  statusCode: HttpStatus;
}
