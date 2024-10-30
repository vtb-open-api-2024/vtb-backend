import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';


export class CreateWalletDtoReq {

  @ApiProperty({ description: 'Portfolio Id' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  public portfolioId: number;

  @ApiProperty({ description: 'Token Id' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  public tokenId: number;
}


export class CreatePrtfolioRes {

}