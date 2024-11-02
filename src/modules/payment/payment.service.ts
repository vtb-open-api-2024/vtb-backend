import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreatePaymentCryptoDtoReq } from '../portfolio/dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/schema/users/user.entity';
import { Repository } from 'typeorm';
import { dinero, greaterThanOrEqual, subtract, toDecimal } from 'dinero.js';
import { Card } from 'src/schema/cards/cards.entity';
import { CryptoWallet } from 'src/schema/crypto_wallets/crypto_wallets.entity';
import { RUB } from '@dinero.js/currencies';
@Injectable()
export class PaymentService {

  @InjectRepository(User)
  private readonly userRep: Repository<User>;

  @InjectRepository(Card)
  private readonly cardsRep: Repository<Card>;

  @InjectRepository(CryptoWallet)
  private readonly cryptoWalletRep: Repository<CryptoWallet>;

  public async createPaymentCrypto(
    user: AuthPayload,
    dto: CreatePaymentCryptoDtoReq
  ) {
    // получить карту и кошелёк через юзера
    // проверить баланс
    // снять деньги с карты и положить на криптокош
    const userRecord = await this.userRep.findOne({
      relationLoadStrategy: 'join',
      relations: {
        cards: true,
        cryptoWallets: {
          tokenDict: true
        },
      },
      where: {
        id: user.userId,
        cards: { id: dto.creditCardId },
        cryptoWallets: { id: dto.cryptoWalletId }
      }
    });
    if (!userRecord || !userRecord.cards.length || !userRecord.cryptoWallets.length) {
      throw new BadRequestException();
    }
    const card = userRecord.cards[0];
    const cryptoWallet = userRecord.cryptoWallets[0];

    const balance = dinero({
      amount: this.parseMoney(card.balance),
      currency: RUB
    });
    const required = dinero({
      amount: dto.amount,
      currency: RUB
    });
    if (!greaterThanOrEqual(balance, required)) {
      throw new BadRequestException();
    }
    // TODO: normal convertation

    await this.cardsRep.update(card.id, {
      balance: toDecimal(subtract(balance, required))
    });

    await this.cryptoWalletRep.update(cryptoWallet.id, {
      balance: toDecimal(required)
    });

    return {
      statusCode: 201
    }
  }

  private parseMoney(amount: string) {
    const cleanedValue = amount.replace(/[^0-9.-]+/g, '');
    const parsedValue = parseFloat(cleanedValue);

    if (isNaN(parsedValue)) {
      throw new Error();
    }
    return Math.round(parsedValue * 100);
  }
}
