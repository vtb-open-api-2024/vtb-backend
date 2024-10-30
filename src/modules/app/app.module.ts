import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schema/schema.module';
import { AuthModule } from '../auth/auth.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { WalletModule } from '../wallet/wallet.module';
import { ReferenceModule } from '../reference/reference.module';
import { BlcokchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    SchemaModule,
    BlcokchainModule,
    AuthModule,
    PortfolioModule,
    WalletModule,
    ReferenceModule
  ],
})
export class AppModule {}
