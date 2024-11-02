import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FakeCardsRegisterDBModule } from 'src/schema/fake_cards_register/fake_cards_register.module';

@Module({
  imports: [FakeCardsRegisterDBModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}