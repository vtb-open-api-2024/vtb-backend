import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegistrationModule } from './registration/registration.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
    AuthenticationModule, 
    RegistrationModule
  ],
})
export class AuthModule {}