import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  exports: [TypeOrmModule],
})
export class CardsDBModule {}
