import { Module } from '@nestjs/common';
import { JwtModule } from './services/jwt/jwt.module';
import { AuthenticationModule } from './authentication/authentication.module';


@Module({
  imports: [
    JwtModule,
    AuthenticationModule
  ],
})
export class AuthModule {}