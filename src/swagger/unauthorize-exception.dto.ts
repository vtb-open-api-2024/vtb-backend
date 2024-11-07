import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ErrorBaseDto } from './error-base.dto';

export class UnauthorizeExceptionDto extends ErrorBaseDto {
  @ApiProperty({ example: 401 })
  statusCode: HttpStatus;
}
