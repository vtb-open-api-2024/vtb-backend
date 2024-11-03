import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { WalletItem } from './wallet.dto';


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


export class CreateWalletDtoRes implements WalletItem {
  walletId: number;
  address: string;
  portfolioId: number;
  tokenId: number;
  balance: string;
}