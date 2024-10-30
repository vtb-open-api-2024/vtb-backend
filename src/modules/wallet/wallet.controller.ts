import { Body, Controller, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { Jwt } from '../auth/services/jwt/jwt.decorator';
import { JwtAuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { WalletService } from './wallet.service';
import { CreateWalletDtoReq } from './dto/create.dto';

@Controller('crypto-wallet')
@ApiTags('Crypto Wallet')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class WalletController {

  @Inject()
  private readonly walletService: WalletService;

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Jwt() jwt: JwtAuthPayload,
    @Body() dto: CreateWalletDtoReq
  ) {
    return this.walletService.create(jwt, dto);
  }

  @Get()
  public async get() {
    
  }
}