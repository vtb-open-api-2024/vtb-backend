import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cards])],
  exports: [TypeOrmModule],
})
export class CardsDBModule {}
