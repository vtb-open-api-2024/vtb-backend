import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenDict } from './token_dict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenDict])],
  exports: [TypeOrmModule],
})
export class TokenDictDBModule {}
