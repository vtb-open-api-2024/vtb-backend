import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard } from 'class-validator';


export class CreateAttachCardRequestDtoReq {

  @ApiProperty({ description: 'Card num' })
  @IsCreditCard()
  public cardNum: string;
}


export class CreateAttachCardRequestDtoRes {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;
  
  @ApiProperty()
  cardNum: string;
  
  @ApiProperty()
  balance: string;
}