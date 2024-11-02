import { ApiProperty } from "@nestjs/swagger";
import { IsCreditCard } from "class-validator";

export class CreatePortfolioDtoReq {

  @ApiProperty()
  @IsCreditCard()
  public cardNum: string;
}
