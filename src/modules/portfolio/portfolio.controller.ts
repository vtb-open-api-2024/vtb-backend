import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Inject, 
  Patch, 
  Post, 
  Query, 
  UseGuards, 
  UseInterceptors 
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { User } from '../auth/services/jwt/jwt.decorator';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { PortfolioService } from './portfolio.service';
import { GetPortfolioDtoReq } from './dto/get.dto';
import { CREATE_SUM } from './swagger/swagger.summary';
import { CreatePortfolioDtoReq, CreatePortfolioRes } from './dto/create.dto';

@Controller('portfolio')
@ApiTags('Portfolio')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class PortfolioController {

  @Inject()
  private readonly portfolioService: PortfolioService;

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: CREATE_SUM })
  @ApiCreatedResponse({ type: CreatePortfolioRes})
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @User() user: AuthPayload,
    @Body() dto: CreatePortfolioDtoReq
  ): Promise<CreatePortfolioRes> {
    return this.portfolioService.create(user, dto);
  }

  @Patch()
  @ApiOperation({ summary: 'NOT READY' })
  public async patch(@Body() dto: CreatePortfolioDtoReq) {
    
  }

  @Delete()
  @ApiOperation({ summary: 'NOT READY' })
  public async delete(@Body() dto: CreatePortfolioDtoReq) {
    
  }

  @Get()
  public async get(
    @User() user: AuthPayload,
    @Query() dto: GetPortfolioDtoReq
  ) {
    return this.portfolioService.getPortfolio(user, dto);
  }
}