import { Module } from '@nestjs/common';
import { JwtTokensDBModule } from './jwt_tokens/jwt.tokens.module';
import { UsersDBModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceUserOption } from './datasource';
import { CryptoPortfolioDBModule } from './crypto_portfolios/crypto-portfolio.module';
import { CryptoWalletDBModule } from './crypto_wallets/crypto_wallets.module';
import { CardsDBModule } from './cards/cards.module';
import { FakeCardsRegisterDBModule } from './fake_cards_register/fake_cards_register.module';
import { PaymentDBModule } from './payments/payments.module';

@Module({
  imports: [
    PaymentDBModule,
    FakeCardsRegisterDBModule,
    CryptoPortfolioDBModule,
    CardsDBModule,
    CryptoWalletDBModule,
    JwtTokensDBModule,
    UsersDBModule,
    TypeOrmModule.forRoot(dataSourceUserOption),
  ],
  exports: [TypeOrmModule],
})
export class SchemaModule {}
