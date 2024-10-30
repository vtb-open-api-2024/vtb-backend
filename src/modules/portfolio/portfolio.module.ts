import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { CryptoPortfolioDBModule } from 'src/schema/crypto_portfolios/crypto-portfolio.module';

@Module({
  imports: [CryptoPortfolioDBModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
