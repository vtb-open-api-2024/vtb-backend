import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { GetBalanceDtoReq, GetBalanceDtoRes, GetTransactionDtoReq, GetTransactionDtoRes } from './dto/openapi.dto';
import { ApiErrorResponses } from 'src/swagger/errors-exception.dto';

@Controller('vtb')
@ApiTags('VTB Open API')
export class OpenapiController {

  @Get('balance')
  @ApiOperation({ summary: 'Запрос возвращает доступный баланс по продукту'})
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
  @ApiOperation({ summary: 'Запрос возвращает историю транзакций за период по продукту'})
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