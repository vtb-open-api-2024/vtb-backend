import { Body, Controller, Delete, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePortfolioDtoReq } from './dto/create.dto';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { Jwt } from '../auth/services/jwt/jwt.decorator';
import { JwtAuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
@ApiTags('Portfolio')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class PortfolioController {

  @Inject()
  private readonly portfolioService: PortfolioService;

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Jwt() jwt: JwtAuthPayload,
    @Body() dto: CreatePortfolioDtoReq
  ) {
    return this.portfolioService.create(jwt, dto);
  }

  @Delete('delete')
  public async delete(@Body() dto: CreatePortfolioDtoReq) {
    
  }

  @Get()
  public async get() {
    
  }
}