import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { JwtPair } from 'src/modules/auth/services/jwt/interface/jwt.interface';

export class ConfirmDtoReq {

  @ApiProperty({ description: 'Auth code' })
  @IsString()
  public code: string;
}

export class ConfirmDtoRes {
  accessToken: string;
}