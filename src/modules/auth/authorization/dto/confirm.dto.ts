import { ApiProperty } from '@nestjs/swagger';
import { JwtPair } from '../../jwt/interface/jwt.interface';
import { IsString } from 'class-validator';

export class ConfirmDtoReq {

  @ApiProperty({ description: 'Auth code' })
  @IsString()
  public code: string;
}

export class ConfirmDtoRes implements JwtPair {
  accessToken: string;
  refreshToken: string;
}