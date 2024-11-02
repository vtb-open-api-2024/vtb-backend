import { Module } from '@nestjs/common';
import { EthereumProviderService } from './ethereum.provider.service';

@Module({
  providers: [EthereumProviderService],
  exports: [EthereumProviderService]
})
export class EthereumProviderModule {}
