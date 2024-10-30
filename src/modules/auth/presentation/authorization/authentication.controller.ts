import { Body, Controller, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthorizationService } from './authentication.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SendDtoReq, SendDtoRes } from './dto/send.dto';
import { ConfirmDtoReq, ConfirmDtoRes } from './dto/confirm.dto';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { Jwt } from '../../services/jwt/jwt.decorator';
import { JwtAuthPayload } from '../../services/jwt/interface/jwt.interface';
import { RefreshDtoRes } from './dto/refresh.dto';

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

  @Get('refresh-token')
  @ApiBearerAuth()
  @UseGuards(new BaseGuard(CONFIG_AUTH.JWT_REFRESH))
  public async refresh(@Jwt() jwt: JwtAuthPayload): Promise<RefreshDtoRes> {
    return this.authorizationService.refresh(jwt);
  }
}