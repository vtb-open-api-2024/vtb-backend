import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { PortfolioItem } from './portfolio.dto';
import { WalletItem } from 'src/modules/wallet/dto/wallet.dto';
import { Type } from 'class-transformer';


export class GetPortfolioDtoReq {

  @ApiProperty({ 
    description: 'Portfolio Id',
    required: false
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  portfolioId?: number;
}


export class GetPortfolioDtoRes {
  portfolios: PortfolioItem[]
}