import { Body, Controller, Inject, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CONFIG_AUTH } from 'src/config/config.export';
import { CreateFakeCardDtoReq } from './dto/create_card.dto';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/guards/admin.guard';


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
  public async putFakeCard(@Body() dto: CreateFakeCardDtoReq) {
    return this.adminService.putFakeCard(dto);
  }

  @Put('token')
  public async putToken() {
    return this.adminService.putToken();
  }

  @Put('blockchain')
  public async putBlockchain() {
    return this.adminService.putToken();
  }
}