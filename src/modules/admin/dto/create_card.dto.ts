import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsCreditCard, IsDate, IsNumber, IsString } from "class-validator";

export class CreateFakeCardDtoReq {

  @ApiProperty()
  @IsCreditCard()
  cardNum: string;
  
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  secondName: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  exp: Date;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  cvc: number;

  @ApiProperty()
  @IsString()
  balance: string;
}
