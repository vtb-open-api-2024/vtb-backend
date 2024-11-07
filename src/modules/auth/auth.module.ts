import { Module } from '@nestjs/common';
import { JwtModule } from './services/jwt/jwt.module';
import { AuthorizationModule } from './authentication/authentication.module';


@Module({
  imports: [
    JwtModule,
    AuthorizationModule
  ],
})
export class AuthModule {}