import { Body, Controller, Delete, Get, Inject, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { User } from '../auth/services/jwt/jwt.decorator';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreatePaymentRequestDtoReq } from '../portfolio/dto/create.dto';


@Controller('payment')
@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class PaymentController {

  @Post('create-payment-request')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'NOT READY' })
  @UseInterceptors(FileInterceptor('file'))
  public async createPaymentRequest(
    @User() user: AuthPayload,
    @Body() dto: CreatePaymentRequestDtoReq
  ) {
    
  } 

  @Post('create-payment-request')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'NOT READY' })
  @UseInterceptors(FileInterceptor('file'))
  public async confirmPaymentRequest() {
    
  }
}