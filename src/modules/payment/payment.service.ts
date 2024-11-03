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

  public async createPaymentCrypto(
    user: AuthPayload,
    dto: CreatePaymentCryptoDtoReq
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');

    const userRep = queryRunner.manager.getRepository(User);
    const paymentRep = queryRunner.manager.getRepository(Payment);
    const cardsRep = queryRunner.manager.getRepository(Card);
    const cryptoWalletRep = queryRunner.manager.getRepository(CryptoWallet);

    try {
      const userRecord = await userRep.findOne({
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

      await paymentRep.save({
        cryptoWallet: { id: cryptoWallet.id },
        user: { id: user.userId },
        card: { id: card.id },
        receivedCrypto: toDecimal(result),
        commission: toDecimal(comission),
        amount: toDecimal(required),
      })

      await cardsRep.update(card.id, {
        balance: toDecimal(subtract(balance, finallyRequired))
      });

      await cryptoWalletRep.update(cryptoWallet.id, {
        balance: toDecimal(required)
      });

      await queryRunner.commitTransaction();

      return {
        statusCode: 201
      }
    } catch(err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
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
