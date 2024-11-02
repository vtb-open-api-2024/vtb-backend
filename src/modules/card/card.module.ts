import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardsDBModule } from 'src/schema/cards/cards.module';
import { FakeCardsRegisterDBModule } from 'src/schema/fake_cards_register/fake_cards_register.module';

@Module({
  imports: [FakeCardsRegisterDBModule, CardsDBModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
