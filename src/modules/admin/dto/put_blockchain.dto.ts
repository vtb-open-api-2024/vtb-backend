import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PutBlockchainDtoReq {
  @ApiProperty()
  @IsString()
  title: string;
}
