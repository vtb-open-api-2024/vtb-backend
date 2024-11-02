import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FakeCardsRegister } from './fake_cards_register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FakeCardsRegister])],
  exports: [TypeOrmModule],
})
export class FakeCardsRegisterDBModule {}
