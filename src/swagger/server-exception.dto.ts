import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ErrorBaseDto } from './error-base.dto';

export class ServerExceptionDto extends ErrorBaseDto {
  @ApiProperty({ example: 500 })
  statusCode: HttpStatus;
}
