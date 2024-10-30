import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class CreatePortfolioDtoReq {

  @ApiProperty({ description: 'Portfolio title' })
  @IsString()
  public title: string;
}


export class CreatePrtfolioRes {

}