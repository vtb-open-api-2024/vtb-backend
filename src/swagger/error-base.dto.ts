import { ApiProperty } from "@nestjs/swagger";

export class ErrorBaseDto {
  @ApiProperty()
  message: string;
}