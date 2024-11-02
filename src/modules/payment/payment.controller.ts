import { Body, Controller, Delete, Get, Inject, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { User } from '../auth/services/jwt/jwt.decorator';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreatePaymentCryptoDtoReq } from '../portfolio/dto/create.dto';
import { PaymentService } from './payment.service';


@Controller('payment')
@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class PaymentController {

  @Inject()
  private readonly paymentService: PaymentService;

  @Post('crypto')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async createPaymentCrypto(
    @User() user: AuthPayload,
    @Body() dto: CreatePaymentCryptoDtoReq
  ) {
    return this.paymentService.createPaymentCrypto(user, dto);
  } 
}