import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FakeCardsRegisterDBModule } from 'src/schema/fake_cards_register/fake_cards_register.module';
import { TokenDictDBModule } from 'src/schema/token_dict/token_dict.module';
import { BlockchainDictDBModule } from 'src/schema/blockchain_dict/blockchain_dict.module';

@Module({
  imports: [
    TokenDictDBModule, 
    BlockchainDictDBModule, 
    FakeCardsRegisterDBModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
