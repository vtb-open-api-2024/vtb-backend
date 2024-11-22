import { Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { GetBalanceDtoReq, GetBalanceDtoRes, GetTransactionDtoReq, GetTransactionDtoRes } from './dto/openapi.dto';
import { ApiErrorResponses } from 'src/swagger/errors-exception.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vtb')
@ApiTags('VTB Open API')
export class OpenapiController {

  @Post('crypto/ask/request')
  @ApiHeader({
    name: 'x-api-key',
    description: 'секретный ключ приложения',
    required: true,
  })
  @ApiHeader({
    name: 'x-api-signature',
    description: 'цифровая подпись на основе ECDSA',
    required: true,
  })
  @ApiQuery({ type: GetBalanceDtoReq })
  @ApiOkResponse({ type: GetBalanceDtoRes })
  @ApiErrorResponses()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async cryptoAskRequest() {
    return true;
  }

  @Post('crypto/ask/confirm')
  @ApiHeader({
    name: 'x-api-key',
    description: 'секретный ключ приложения',
    required: true,
  })
  @ApiHeader({
    name: 'x-api-signature',
    description: 'цифровая подпись на основе ECDSA',
    required: true,
  })
  @ApiQuery({ type: GetBalanceDtoReq })
  @ApiOkResponse({ type: GetBalanceDtoRes })
  @ApiErrorResponses()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async cryptoAskConfirm() {
    return true;
  }

  @Post('crypto/bid/request')
  @ApiHeader({
    name: 'x-api-key',
    description: 'секретный ключ приложения',
    required: true,
  })
  @ApiHeader({
    name: 'x-api-signature',
    description: 'цифровая подпись на основе ECDSA',
    required: true,
  })
  @ApiQuery({ type: GetBalanceDtoReq })
  @ApiOkResponse({ type: GetBalanceDtoRes })
  @ApiErrorResponses()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async cryptoBidRequest() {
    return true;
  }

  @Post('crypto/bid/confirm')
  @ApiHeader({
    name: 'x-api-key',
    description: 'секретный ключ приложения',
    required: true,
  })
  @ApiHeader({
    name: 'x-api-signature',
    description: 'цифровая подпись на основе ECDSA',
    required: true,
  })
  @ApiBody({ type: GetBalanceDtoReq })
  @ApiOkResponse({ type: GetBalanceDtoRes })
  @ApiErrorResponses()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async cryptoBidConfirm() {
    return true;
  }

  @Post('crypto/prepaid')
  @ApiHeader({
    name: 'x-api-key',
    description: 'секретный ключ приложения',
    required: true,
  })
  @ApiHeader({
    name: 'x-api-signature',
    description: 'цифровая подпись на основе ECDSA',
    required: true,
  })
  @ApiQuery({ type: GetBalanceDtoReq })
  @ApiOkResponse({ type: GetBalanceDtoRes })
  @ApiErrorResponses()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async cryptoPrepaid() {
    return true;
  }
  
  @Get('balance')
  @ApiOperation({ 
    summary: 'Запрос возвращает доступный баланс по продукту',
    deprecated: true,
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'секретный ключ приложения',
    required: true,
  })
  @ApiHeader({
    name: 'x-api-signature',
    description: 'цифровая подпись на основе ECDSA',
    required: true,
  })
  @ApiQuery({ type: GetBalanceDtoReq })
  @ApiOkResponse({ type: GetBalanceDtoRes })
  @ApiErrorResponses()
  public async getBalance() {
    return true;
  }

  @Get('transaction')
  @ApiOperation({ 
    deprecated: true, 
    summary: 'Запрос возвращает историю транзакций за период по продукту'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'секретный ключ приложения',
    required: true,
  })
  @ApiHeader({
    name: 'x-api-signature',
    description: 'цифровая подпись на основе ECDSA',
    required: true,
  })
  @ApiQuery({ type: GetTransactionDtoReq })
  @ApiOkResponse({ type: GetTransactionDtoRes })
  @ApiErrorResponses()
  public async getTransactions() {
    return true;
  }
}