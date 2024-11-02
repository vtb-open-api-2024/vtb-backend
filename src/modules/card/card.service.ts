import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreateAttachCardRequestDtoReq, CreateAttachCardRequestDtoRes } from './dto/attach_card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/schema/cards/cards.entity';
import { Repository } from 'typeorm';
import { CardApiPayload } from './interface/card_api.interface';
import { FakeCardsRegister } from 'src/schema/fake_cards_register/fake_cards_register.entity';
import { GetCardsRequestDtoReq, GetCardsRequestDtoRes } from './dto/get_cards.dto';


@Injectable()
export class CardService {

  @InjectRepository(Card)
  private readonly cardsRep: Repository<Card>;

  @InjectRepository(FakeCardsRegister)
  private readonly fakeCardsRegisterRep: Repository<FakeCardsRegister>;

  public async createAttachCardRequest(
    user: AuthPayload,
    dto: CreateAttachCardRequestDtoReq
  ): Promise<CreateAttachCardRequestDtoRes> {
    let card = await this.cardsRep.findOne({
      where: {
        user: { id: user.userId },
        cardNum: dto.cardNum
      }
    });
    if (card) {
      throw new ConflictException();
    }
    const cardInfo = await this.vtbApiMock(dto.cardNum);

    card = await this.cardsRep.save({
      user: { id: user.userId },
      cardNum: dto.cardNum,
      firstName: cardInfo.firstName,
      secondName: cardInfo.secondName,
      exp: cardInfo.exp,
      balance: cardInfo.balance,
      cvc: cardInfo.cvc,
    });
    return {
      id: card.id,
      userId: user.userId,
      cardNum: dto.cardNum,
      balance: cardInfo.balance
    }
  }

  public async getCards(
    user: AuthPayload,
    dto: GetCardsRequestDtoReq
  ): Promise<GetCardsRequestDtoRes> {
    const cards = await this.cardsRep.find({
      where: {
        id: dto.cardId,
        user: { id: user.userId },
      }
    });
    if (!cards) {
      throw new BadRequestException();
    }
    return {
      cards: cards.map(card => {
        return {
          curdNum: card.cardNum,
          firstName: card.firstName,
          secondName: card.secondName,
          exp: card.exp,
          balance: card.balance
        } as CardApiPayload
      })
    }
  }


  private async vtbApiMock(cardNum: string): Promise<CardApiPayload> {
    const card = await this.fakeCardsRegisterRep.findOne({
      where: { cardNum }
    });
    if (!card) {
      throw new BadRequestException();
    }
    return {
      curdNum: card.cardNum,
      firstName: card.firstName,
      secondName: card.secondName,
      exp: card.exp,
      balance: card.balance,
      cvc: card.cvc
    }
  }
}
