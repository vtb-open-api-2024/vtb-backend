import { HttpStatus } from '@nestjs/common';
import { ErrorBaseDto } from './error-base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ConflictExceptionDto extends ErrorBaseDto {
  @ApiProperty({ example: 409 })
  statusCode: HttpStatus;
}
