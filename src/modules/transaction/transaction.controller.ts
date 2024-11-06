import { Body, Controller, Delete, Get, Inject, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { User } from '../auth/services/jwt/jwt.decorator';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreatePaymentCryptoDtoReq } from '../portfolio/dto/create.dto';
import { TransactionService } from './transaction.service';


@Controller('transaction')
@ApiTags('Transaction')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class TransactionController {

  @Inject()
  private readonly transactionService: TransactionService;

  @Get()
  public async getTransactions(@User() user: AuthPayload) {
    return this.transactionService.getTransactions(user);
  } 
}