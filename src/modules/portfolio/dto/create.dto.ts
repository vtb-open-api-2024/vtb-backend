import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';


export class CreatePaymentCryptoDtoReq {

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  creditCardId: number

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  cryptoWalletId: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;
}


export class CreatePrtfolioRes {

}