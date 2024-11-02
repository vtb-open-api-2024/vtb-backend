import { Body, Controller, Delete, Get, Inject, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { User } from '../auth/services/jwt/jwt.decorator';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreatePaymentRequestDtoReq } from '../portfolio/dto/create.dto';


@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class AdminController {

  @Put('fake-card')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async createFakeCard(
    @User() user: AuthPayload,
    @Body() dto: CreatePaymentRequestDtoReq
  ) {
    
  } 

}