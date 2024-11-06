import { Request } from 'express';
import { 
  Injectable, 
  CanActivate, 
  ExecutionContext
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private readonly key: string) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['x-admin-key'];
    return authorizationHeader !== this.key ? false : true;
  }
}