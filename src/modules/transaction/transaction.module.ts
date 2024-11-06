import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UsersDBModule } from 'src/schema/users/users.module';
import { CardsDBModule } from 'src/schema/cards/cards.module';
import { CryptoWalletDBModule } from 'src/schema/crypto_wallets/crypto_wallets.module';
import { PaymentDBModule } from 'src/schema/payments/payments.module';

@Module({
  imports: [
    UsersDBModule, 
    CardsDBModule, 
    CryptoWalletDBModule,
    PaymentDBModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
