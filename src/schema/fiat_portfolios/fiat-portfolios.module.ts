import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiatPortfolio } from './fiat-portfolios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FiatPortfolio])],
  exports: [TypeOrmModule],
})
export class FiatPortfolioDBModule {}
