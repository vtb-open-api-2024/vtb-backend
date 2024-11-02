import { Body, Controller, Inject, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { CreateFakeCardDtoReq } from './dto/create_card.dto';
import { AdminService } from './admin.service';


@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class AdminController {

  @Inject()
  private readonly adminService: AdminService;

  @Put('fake-card')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async createFakeCard(@Body() dto: CreateFakeCardDtoReq) {
    return this.adminService.createFakeCard(dto);
  } 
}