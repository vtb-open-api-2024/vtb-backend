import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class BadRequestExceptionDto {
  @ApiProperty({ example: 400 })
  statusCode: HttpStatus;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string[];
}
