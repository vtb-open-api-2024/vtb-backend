import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoWallet } from './crypto_wallets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoWallet])],
  exports: [TypeOrmModule],
})
export class CryptoWalletDBModule {}
