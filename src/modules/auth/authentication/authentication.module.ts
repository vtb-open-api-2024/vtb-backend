import { Module } from '@nestjs/common';
import { AuthorizationController } from './authentication.controller';
import { AuthorizationService } from './authentication.service';
import { UsersDBModule } from 'src/schema/users/users.module';
import { AuthCodeDBModule } from 'src/schema/auth_code/auth-code.module';
import { UcallerModule } from '../services/ucaller/ucaller.module';


@Module({
  imports: [AuthCodeDBModule, UcallerModule, UsersDBModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
