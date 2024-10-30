import { Module } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { ReferenceController } from './reference.controller';
import { TokenDictDBModule } from 'src/schema/token_dict/token_dict.module';
import { BlockchainDictDBModule } from 'src/schema/blockchain_dict/blockchain_dict.module';

@Module({
  imports: [TokenDictDBModule, BlockchainDictDBModule],
  controllers: [ReferenceController],
  providers: [ReferenceService],
})
export class ReferenceModule {}
