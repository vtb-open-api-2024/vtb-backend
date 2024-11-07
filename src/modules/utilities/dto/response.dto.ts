import { ApiProperty } from "@nestjs/swagger";

export class HttpRes {
  @ApiProperty()
  statusCode: number
}