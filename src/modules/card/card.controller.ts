import { FileInterceptor } from '@nestjs/platform-express';
import { BaseGuard } from 'src/guards/base.guard';
import { CONFIG_AUTH } from 'src/config/config.export';
import { User } from '../auth/services/jwt/jwt.decorator';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CardService } from './card.service';
import { 
  Body,
  Controller, 
  Get, 
  Inject, 
  Post, 
  Query, 
  UseGuards, 
  UseInterceptors 
} from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiConsumes, 
  ApiCreatedResponse, 
  ApiOperation, 
  ApiTags 
} from '@nestjs/swagger';
import { 
  CreateAttachCardRequestDtoReq, 
  CreateAttachCardRequestDtoRes 
} from './dto/attach_card.dto';
import { 
  GetCardsRequestDtoReq, 
  GetCardsRequestDtoRes 
} from './dto/get_cards.dto';
import { ATTACH_CARD_SUM } from './swagger/swagger.summary';


@Controller('card')
@ApiTags('Card')
@ApiBearerAuth()
@UseGuards(new BaseGuard(CONFIG_AUTH.JWT_ACCESS))
export class CardController {

  @Inject()
  private readonly cardService: CardService;

  @Post('attach')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: ATTACH_CARD_SUM })
  @ApiCreatedResponse({ type: CreateAttachCardRequestDtoRes})
  public async createAttachCardRequest(
    @User() user: AuthPayload,
    @Body() dto: CreateAttachCardRequestDtoReq
  ): Promise<CreateAttachCardRequestDtoRes> {
    return this.cardService.createAttachCardRequest(user, dto);
  }

  @Get()
  public async getCards(
    @User() user: AuthPayload,
    @Query() dto: GetCardsRequestDtoReq
  ): Promise<GetCardsRequestDtoRes> {
    return this.cardService.getCards(user, dto);
  }
}