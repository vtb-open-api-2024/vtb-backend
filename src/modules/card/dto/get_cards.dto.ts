import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { CardApiPayload } from '../interface/card_api.interface';

export class GetCardsRequestDtoReq {

  @ApiProperty({ 
    description: 'Card id',
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  cardId?: number;
}

export class GetCardsRequestDtoRes {
  cards: CardApiPayload[];
}