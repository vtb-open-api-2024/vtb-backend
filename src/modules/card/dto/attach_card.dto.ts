import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard } from 'class-validator';


export class CreateAttachCardRequestDtoReq {

  @ApiProperty({ description: 'Card num' })
  @IsCreditCard()
  public cardNum: string;
}


export class CreateAttachCardRequestDtoRes {
  id: number;
  userId: number;
  cardNum: string;
  balance: string;
}