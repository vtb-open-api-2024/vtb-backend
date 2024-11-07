import { Body, Controller, Get, Inject, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SEND_DTO_RES, SendDtoReq, SendDtoRes } from './dto/send.dto';
import { ConfirmDtoReq, ConfirmDtoRes } from './dto/confirm.dto';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { RefreshDtoRes } from './dto/refresh.dto';
import { AuthPayload } from '../services/jwt/interface/jwt.interface';
import { User } from '../services/jwt/jwt.decorator';
import { ApiErrorResponses } from 'src/swagger/errors-exception.dto';
import { Response } from 'express';
import { RefreshGuard } from 'src/guards/refresh.guard';
import { 
  CONFIRM_CODE_SUM, 
  REFRESH_SUM, 
  SEND_CODE_SUM, 
  VALIDATE_TOKEN_SUM 
} from './swagger/swagger.summary';


@Controller('auth')
@ApiTags('Auth')
export class AuthenticationController {
  
  @Inject()
  private authorizationService: AuthenticationService

  @Post('send-code')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: SEND_CODE_SUM })
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse(SEND_DTO_RES)
  @ApiErrorResponses()
  public async sendCode(@Body() dto: SendDtoReq): Promise<SendDtoRes>{
    return this.authorizationService.sendCode(dto);
  }

  @Post('confirm-code')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: CONFIRM_CODE_SUM })
  @UseInterceptors(FileInterceptor('file'))
  public confirmCode(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: ConfirmDtoReq
  ): Promise<ConfirmDtoRes> {
    return this.authorizationService.confirmCode(res, dto);
  }

  @Get('refresh-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: REFRESH_SUM })
  @UseGuards(new RefreshGuard(CONFIG_AUTH.JWT_REFRESH))
  public async refresh(
    @Res({ passthrough: true }) res: Response,
    @User() jwt: AuthPayload
  ): Promise<RefreshDtoRes> {
    return this.authorizationService.refresh(res, jwt);
  }

  @Get('validate-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: VALIDATE_TOKEN_SUM })
  @UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
  public validateToken() {
    return true;
  }
}