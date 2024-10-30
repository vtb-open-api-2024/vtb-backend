import { Body, Controller, Delete, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { ReferenceService } from './reference.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockchainDict } from 'src/schema/blockchain_dict/blockchain_dict.entity';
import { Repository } from 'typeorm';
import { TokenDict } from 'src/schema/token_dict/token_dict.entity';
import { BlockchainRefDtoRes } from './dto/blockchains.dto';
import { TokenRefDtoRes } from './dto/tokens.dto';

@Controller('reference')
@ApiTags('Reference')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class ReferenceController {

  @Inject()
  private readonly referenceService: ReferenceService;

  @Get('crypto-tokens')
  @ApiResponse({ type: TokenRefDtoRes })
  public async getTokens(): Promise<TokenRefDtoRes> {
    return this.referenceService.getTokens();
  }

  @Get('blockchains')
  @ApiResponse({ type: BlockchainRefDtoRes })
  public async getBlockchains(): Promise<BlockchainRefDtoRes> {
    return this.referenceService.getBlockchains();
  }
}