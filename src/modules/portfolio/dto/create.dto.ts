import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PortfolioItem } from './portfolio.dto';
import { WalletItem } from 'src/modules/wallet/dto/wallet.dto';


export class CreatePortfolioDtoReq {

  @ApiProperty({ description: 'Portfolio title' })
  @IsString()
  public title: string;
}


export class CreatePortfolioRes implements PortfolioItem {
  @ApiProperty()
  title: string;
  
  @ApiProperty()
  portfolioId: number;
  
  @ApiProperty({ type: [WalletItem] })
  wallets: WalletItem[];
}