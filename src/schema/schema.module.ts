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
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    PaymentDBModule,
    FakeCardsRegisterDBModule,
    CryptoPortfolioDBModule,
    CardsDBModule,
    CryptoWalletDBModule,
    JwtTokensDBModule,
    UsersDBModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => dataSourceUserOption,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class SchemaModule {}
