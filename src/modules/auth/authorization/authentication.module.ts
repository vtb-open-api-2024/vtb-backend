import { Module } from '@nestjs/common';
import { AuthorizationController } from './authentication.controller';
import { AuthorizationService } from './authentication.service';
import { UsersDBModule } from 'src/schema/users/users.module';
import { UcallerModule } from '../ucaller/ucaller.module';
import { AuthCodeDBModule } from 'src/schema/auth-code/auth-code.module';

@Module({
  imports: [AuthCodeDBModule, UcallerModule, UsersDBModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
