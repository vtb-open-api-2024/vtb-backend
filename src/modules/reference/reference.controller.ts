import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { ReferenceService } from './reference.service';
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