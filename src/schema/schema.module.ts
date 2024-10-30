import { Module } from '@nestjs/common';
import { JwtTokensDBModule } from './jwt_tokens/jwt.tokens.module';
import { UsersDBModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceUserOption } from './datasource';
import { CryptoPortfolioDBModule } from './crypto_portfolios/crypto-portfolio.module';
import { FiatPortfolioDBModule } from './fiat_portfolios/fiat-portfolios.module';

@Module({
  imports: [
    CryptoPortfolioDBModule,
    FiatPortfolioDBModule,
    FiatPortfolioDBModule,
    CryptoPortfolioDBModule,
    JwtTokensDBModule,
    UsersDBModule,
    TypeOrmModule.forRoot(dataSourceUserOption),
  ],
  exports: [TypeOrmModule],
})
export class SchemaModule {}
