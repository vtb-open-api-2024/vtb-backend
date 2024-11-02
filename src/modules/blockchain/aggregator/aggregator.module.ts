import { Module } from '@nestjs/common';
import { AggregatorService } from './aggregator.service';
import { EthereumProviderModule } from '../providers/ethereum/ethereum.provider.module';


@Module({
  imports: [EthereumProviderModule],
  providers: [AggregatorService],
  exports: [AggregatorService]
})
export class AggregatorModule {}
