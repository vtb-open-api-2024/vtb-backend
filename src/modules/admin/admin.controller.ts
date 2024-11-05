import { Body, Controller, Delete, Get, Inject, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CONFIG_AUTH } from 'src/config/config.export';
import { PutFakeCardDtoReq } from './dto/put_card.dto';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { PutBlockchainDtoReq } from './dto/put_blockchain.dto';
import { PutTokenDtoReq } from './dto/put_token.dto';
import { DeleteTokenDtoReq } from './dto/delete_token.dto';
import { DeleteBlockchainDtoReq } from './dto/delete_blockchain.dto';


@Controller('admin')
@ApiTags('Admin')
@ApiSecurity(`ADMIN_KEY`)
@UseGuards(new AdminGuard(CONFIG_AUTH.ADMIN_KEY))
export class AdminController {

  @Inject()
  private readonly adminService: AdminService;

  @Put('fake-card')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async putFakeCard(@Body() dto: PutFakeCardDtoReq) {
    return this.adminService.putFakeCard(dto);
  }

  @Put('token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async putToken(@Body() dto: PutTokenDtoReq) {
    return this.adminService.putToken(dto);
  }

  @Put('blockchain')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async putBlockchain(@Body() dto: PutBlockchainDtoReq) {
    return this.adminService.putBlockchain(dto);
  }

  @Get('tokens')
  public async getTokens() {
    return this.adminService.getTokens()
  }

  @Get('blockchains')
  public async getBlockchains() {
    return this.adminService.getBlockchains()
  }

  @Delete('token')
  public async deleteToken(@Query() dto: DeleteTokenDtoReq) {
    return this.adminService.deleteToken(dto);
  }

  @Delete('blockchain')
  public async deleteBlockchain(@Query() dto: DeleteBlockchainDtoReq) {
    return this.adminService.deleteBlockchain(dto);
  }
}