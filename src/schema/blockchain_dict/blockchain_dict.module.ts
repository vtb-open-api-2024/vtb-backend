import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainDict } from './blockchain_dict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlockchainDict])],
  exports: [TypeOrmModule],
})
export class BlockchainDictDBModule {}
