import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schema/schema.module';
import { AuthModule } from '../auth/auth.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { WalletModule } from '../wallet/wallet.module';
import { ReferenceModule } from '../reference/reference.module';
import { CardModule } from '../card/card.module';
import { PaymentModule } from '../payment/payment.module';
import { AdminModule } from '../admin/admin.module';
import { TransactionModule } from '../transaction/transaction.module';
import { OpenapiModule } from '../openapi/openapi.module';

@Module({
  imports: [
    SchemaModule,
    OpenapiModule,
    AuthModule,
    PortfolioModule,
    WalletModule,
    CardModule,
    PaymentModule,
    TransactionModule,
    ReferenceModule,
    AdminModule,
  ],
})
export class AppModule {}
