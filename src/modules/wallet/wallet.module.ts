import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { CryptoWalletDBModule } from 'src/schema/crypto_wallets/crypto_wallets.module';
import { TokenDictDBModule } from 'src/schema/token_dict/token_dict.module';
import { AggregatorModule } from '../blockchain/aggregator/aggregator.module';
import { CryptoPortfolioDBModule } from 'src/schema/crypto_portfolios/crypto-portfolio.module';

@Module({
  imports: [
    AggregatorModule, 
    CryptoWalletDBModule, 
    TokenDictDBModule,
    CryptoPortfolioDBModule
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
