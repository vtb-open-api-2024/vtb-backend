import { Module } from '@nestjs/common';
import { BitcoinProviderService } from './bitcoin.provider.service';

@Module({
  providers: [BitcoinProviderService],
  exports: [BitcoinProviderService]
})
export class BitcoinProviderModule {}
