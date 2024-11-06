import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { CreatePaymentCryptoDtoReq } from '../portfolio/dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/schema/users/user.entity';
import { DataSource, Repository } from 'typeorm';
import { dinero, greaterThanOrEqual, subtract, toDecimal, add, convert } from 'dinero.js';
import { Card } from 'src/schema/cards/cards.entity';
import { CryptoWallet } from 'src/schema/crypto_wallets/crypto_wallets.entity';
import { Payment } from 'src/schema/payments/payments.entity';
import { Transaction } from './interface/transaction.interface';
import { parseMoney, parseMoneyDinero } from '../utilities/utilities.money';


@Injectable()
export class TransactionService {

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

  public async getTransactions(user: AuthPayload) {
    const payments = await this.paymentRep.find({
      relationLoadStrategy: 'join',
      relations: { cryptoWallet: true, card: true },
      where: { user: { id: user.userId } }
    });
    return payments.map(payment => {
      return {
        creditCardId: payment.card.id,
        walletId: payment.cryptoWallet.id,
        amount: parseMoney(payment.amount),
        type: 'AddingAccount',
        currency: 'RUB'
      } as Transaction
    });
  }
}
