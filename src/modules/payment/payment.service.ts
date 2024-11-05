import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreatePaymentCryptoDtoReq } from '../portfolio/dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/schema/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { dinero, greaterThanOrEqual, subtract, toDecimal, add, convert } from 'dinero.js';
import { Card } from 'src/schema/cards/cards.entity';
import { CryptoWallet } from 'src/schema/crypto_wallets/crypto_wallets.entity';
import { RUB, USD } from '@dinero.js/currencies';
import { Payment } from 'src/schema/payments/payments.entity';
import { CONFIG_OPEN_EXCHANGE_RATES } from 'src/config/config.export';
import { get } from 'axios';
import { ExchangeRatesResponse } from './interface/exchange_rates.interface';
import { Transactional } from '../utilities/transactional.decorator';


@Injectable()
export class PaymentService {

  @InjectRepository(User)
  private readonly userRep: Repository<User>;

  @InjectRepository(Card)
  private readonly cardsRep: Repository<Card>;

  @InjectRepository(CryptoWallet)
  private readonly cryptoWalletRep: Repository<CryptoWallet>;

  @InjectRepository(Payment)
  private readonly paymentRep: Repository<Payment>;

  @Inject()
  private readonly dataSource: DataSource;

  @Transactional('REPEATABLE READ')
  public async createPaymentCrypto(
    user: AuthPayload,
    dto: CreatePaymentCryptoDtoReq
  ) {

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
      scale: 2,
      currency: RUB
    });
    const comission = dinero({
      amount: this.getComission(dto.amount),
      scale: 2,
      currency: RUB
    });
    const required = dinero({
      amount: Math.round(dto.amount * 100),
      scale: 2,
      currency: RUB,
    });
    const finallyRequired = add(comission, required);

    if (!greaterThanOrEqual(balance, finallyRequired)) {
      throw new BadRequestException();
    }

    const currency = 1022;
    const rates = { USD: { amount: currency, scale: 5 } };
    const result = convert(required, USD, rates);

    await this.paymentRep.save({
      cryptoWallet: { id: cryptoWallet.id },
      user: { id: user.userId },
      card: { id: card.id },
      receivedCrypto: toDecimal(result),
      commission: toDecimal(comission),
      amount: toDecimal(required),
    })

    await this.cardsRep.update(card.id, {
      balance: toDecimal(subtract(balance, finallyRequired))
    });

    await this.cryptoWalletRep.update(cryptoWallet.id, {
      balance: toDecimal(required)
    });

    return {
      statusCode: 201
    }
  }

  private getComission(amonut: number) {
    return Math.round(amonut * 0.01 * 100);
  }

  public async getCurrency(): Promise<number> {
    const secretKey = CONFIG_OPEN_EXCHANGE_RATES.OPEN_EXCHANGE_RATES_KEY;
    const url = new URL(`https://openexchangerates.org/api/latest.json`);
    url.searchParams.append('app_id', secretKey);
    url.searchParams.append('base', 'USD');
    url.searchParams.append('symbols', 'RUB');
    const res = await get<ExchangeRatesResponse>(url.toString());
    const usdRub = Math.round(res?.data?.rates?.RUB * 100) / 100;
    return parseFloat((1 / usdRub).toFixed(5)) * 100_000;
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
