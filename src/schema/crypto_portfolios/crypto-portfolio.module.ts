import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoPortfolio } from './crypto-portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoPortfolio])],
  exports: [TypeOrmModule],
})
export class CryptoPortfolioDBModule {}
