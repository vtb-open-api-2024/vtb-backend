import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class DeleteTokenDtoReq {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
