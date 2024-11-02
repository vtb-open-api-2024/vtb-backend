import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { WalletItem } from './wallet.dto';


export class GetWalletsDtoReq {

  @ApiProperty({ description: 'Portfolio Id' })
  @Type(() => Number)
  @IsNumber()
  portfolioId: number;
}


export class GetWalletsDtoRes {
  wallets: WalletItem[];
}