import { Body, Controller, Get, Inject, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { User } from '../auth/services/jwt/jwt.decorator';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { WalletService } from './wallet.service';
import { CreateWalletDtoReq, CreateWalletDtoRes } from './dto/create.dto';
import { GetWalletsDtoReq, GetWalletsDtoRes } from './dto/get.dto';
import { CREATE_WALLET_SUM } from './swagger/swagger.summary';

@Controller('crypto-wallet')
@ApiTags('Crypto Wallet')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class WalletController {

  @Inject()
  private readonly walletService: WalletService;

  @Post('create-wallet')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: CREATE_WALLET_SUM })
  @ApiCreatedResponse({ type: CreateWalletDtoRes})
  public async createWallet(
    @User() user: AuthPayload,
    @Body() dto: CreateWalletDtoReq
  ): Promise<CreateWalletDtoRes> {
    return this.walletService.createWallet(user, dto);
  }

  @Post('create-transaction')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'NOT READY' })
  public async createTransaction(
    @User() user: AuthPayload,
    @Body() dto: CreateWalletDtoReq
  ): Promise<CreateWalletDtoRes> {
    return null;
  }

  @Post('send-transaction')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'NOT READY' })
  public async sendTransaction(
    @User() user: AuthPayload,
    @Body() dto: CreateWalletDtoReq
  ): Promise<CreateWalletDtoRes> {
    return null;
  }

  @Get()
  public async getWallets(
    @User() jwt: AuthPayload,
    @Query() dto: GetWalletsDtoReq
  ): Promise<GetWalletsDtoRes> {
    return this.walletService.getWallets(jwt, dto);
  }
}