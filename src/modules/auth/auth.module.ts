import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { AuthorizationModule } from './authorization/authentication.module';

@Module({
  imports: [
    JwtModule,
    AuthorizationModule
  ],
})
export class AuthModule {}