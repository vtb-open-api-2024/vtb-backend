import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService as PaymentService } from './payment.service';
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
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
