import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateWalletDtoReq, CreateWalletDtoRes } from './dto/create.dto';
import { CryptoWallet } from 'src/schema/crypto_wallets/crypto_wallets.entity';
import { AggregatorService } from '../blockchain/aggregator/aggregator.service';
import { TokenDict } from 'src/schema/token_dict/token_dict.entity';
import { randomBytes } from 'crypto';
import { CryptoPortfolio } from 'src/schema/crypto_portfolios/crypto-portfolio.entity';
import { encrypt } from '../utilities/utilities.cipher';
import { GetWalletsDtoReq, GetWalletsDtoRes } from './dto/get.dto';
import { WalletItem } from './dto/wallet.dto';


@Injectable()
export class WalletService {

  @InjectRepository(CryptoWallet)
  private readonly cryptoWalletRep: Repository<CryptoWallet>;

  @InjectRepository(TokenDict)
  private readonly tokenDictRep: Repository<TokenDict>;

  @InjectRepository(CryptoPortfolio)
  private readonly cryptoPortfolioRep: Repository<CryptoPortfolio>;

  @Inject()
  private readonly aggregatorService: AggregatorService;

  public async createWallet(
    user: AuthPayload,
    dto: CreateWalletDtoReq
  ): Promise<CreateWalletDtoRes> {
    const token = await this.tokenDictRep.findOne({
      relationLoadStrategy: 'join',
      relations: { blockchainDictId: true },
      where: { id: dto.tokenId }
    });
    if (!token) {
      throw new BadRequestException();
    }
    const portfolio = await this.cryptoPortfolioRep.findOne({
      relationLoadStrategy: 'join',
      relations: { cryptoWallets: { tokenDict: true } },
      where: {
        user: { id: user.userId },
        id: dto.portfolioId,
      },
    });
    if (!portfolio) {
      throw new BadRequestException();
    }
    const wallet = portfolio.cryptoWallets
      .find((wallet) => wallet.tokenDict.id === token.id);

    if (wallet) {
      throw new ConflictException();
    }
    const cryptoWallet = await this.aggregatorService
      .createWallet(token.blockchainDictId.title);
     
    const iv = randomBytes(16).toString('hex');
    const encryptPrivateKey = encrypt(cryptoWallet.privateKey, iv);

    await this.cryptoWalletRep.save({
      address: cryptoWallet.address,
      user: { id: user.userId },
      tokenDict: { id: token.id },
      cryptoPortfolio: { id: portfolio.id },
      privateKey: encryptPrivateKey,
      iv: iv,
      balance: '0'
    });
    return {
      address: cryptoWallet.address,
      portfolioId: portfolio.id,
      tokenId: token.id,
      balance: '0'
    } as CreateWalletDtoRes;
  }

  public async getWallets(
    user: AuthPayload,
    dto: GetWalletsDtoReq
  ): Promise<GetWalletsDtoRes> {
    const wallets = await this.cryptoWalletRep.find({
      relationLoadStrategy: 'join',
      relations: { tokenDict: true },
      where: {
        user: { id: user.userId },
        cryptoPortfolio: { id: dto.portfolioId }
      }
    });
    return {
      wallets: wallets.map(wallet => {
        return {
          address: wallet.address,
          portfolioId: dto.portfolioId,
          tokenId: wallet.tokenDict.id,
          balance: wallet.balance
        } as WalletItem
      })
    }
  }
}
