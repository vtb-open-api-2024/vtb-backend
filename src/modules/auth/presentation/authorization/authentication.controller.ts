import { Body, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { AuthorizationService } from './authentication.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SendDtoReq, SendDtoRes } from './dto/send.dto';
import { ConfirmDtoReq, ConfirmDtoRes } from './dto/confirm.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthorizationController {
  
  @Inject()
  private authorizationService: AuthorizationService

  @Post('send-code')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async sendCode(@Body() dto: SendDtoReq): Promise<SendDtoRes>{
    return this.authorizationService.sendCode(dto);
  }

  @Post('confirm-code')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public confirmCode(@Body() dto: ConfirmDtoReq): Promise<ConfirmDtoRes>{
    return this.authorizationService.confirmCode(dto);
  } 
}