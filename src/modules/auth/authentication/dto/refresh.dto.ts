import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString } from 'class-validator';
import { JwtPair } from 'src/modules/auth/services/jwt/interface/jwt.interface';


export class RefreshDtoReq {

  @ApiProperty({ description: 'Refresh token' })
  @IsString()
  refreshToken: string;
}

export class RefreshDtoRes {
  @Allow()
  accessToken: string;
}
