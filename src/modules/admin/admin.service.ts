import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FakeCardsRegister } from 'src/schema/fake_cards_register/fake_cards_register.entity';
import { Repository } from 'typeorm';
import { CreateFakeCardDtoReq } from './dto/create_card.dto';

@Injectable()
export class AdminService {

  @InjectRepository(FakeCardsRegister)
  private readonly fakeCardsRegisterRep: Repository<FakeCardsRegister>;

  public async putFakeCard(dto: CreateFakeCardDtoReq) {
    const card = await this.fakeCardsRegisterRep.findOne({
      where: { cardNum: dto.cardNum }
    });
    if (card) {
      return new ConflictException()
    }
    return this.fakeCardsRegisterRep.save({ ...dto });
  }

  public async putToken() {

  }

  public async putBlockchain() {

  }
}
