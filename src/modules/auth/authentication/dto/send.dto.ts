import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';
import { HttpRes } from 'src/modules/utilities/dto/response.dto';

export class SendDtoReq {

  @ApiProperty({ 
    description: 'User phone', 
    example: "+7(999) 555 22 11"
  })
  @IsPhoneNumber()
  public phone: string;
}

export class SendDtoRes {
  statusCode: number
}


export const SEND_DTO_RES: ApiResponseOptions = {
  type: HttpRes
}