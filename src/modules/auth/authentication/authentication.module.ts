import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersDBModule } from 'src/schema/users/users.module';
import { AuthCodeDBModule } from 'src/schema/auth_code/auth-code.module';
import { UcallerModule } from '../services/ucaller/ucaller.module';


@Module({
  imports: [AuthCodeDBModule, UcallerModule, UsersDBModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
