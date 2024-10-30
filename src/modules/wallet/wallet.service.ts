import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtAuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateWalletDtoReq } from './dto/create.dto';
import { CryptoWallet } from 'src/schema/crypto_wallets/crypto_wallets.entity';
import { AggregatorService } from '../blockchain/aggregator/aggregator.service';
import { TokenDict } from 'src/schema/token_dict/token_dict.entity';
import { randomBytes } from 'crypto';
import { CryptoPortfolio } from 'src/schema/crypto_portfolios/crypto-portfolio.entity';
import { encrypt } from '../utilities/utilities.cipher';


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

  public async create(jwt: JwtAuthPayload, dto: CreateWalletDtoReq) { 
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
      relations: { cryptoWallets: true },
      where: { 
        user: { id: jwt.userId },
        id: dto.portfolioId,
        cryptoWallets: {
          tokenDict: {
            id: In([dto.tokenId])
          }
        }
      },
    });
    if (!portfolio) {
      throw new BadRequestException();
    }
    if (portfolio.cryptoWallets.length) {
      throw new ConflictException();
    }
    const cryptoWallet = this.aggregatorService.createWallet(
      token.blockchainDictId.title
    );
    const iv = randomBytes(16).toString('hex');
    const encryptPrivateKey = encrypt(cryptoWallet.privateKey, iv);

    const wallet = await this.cryptoWalletRep.save({
      address: cryptoWallet.address,
      portfolio: portfolio,
      privateKey: encryptPrivateKey,
      iv: iv,
    });
    return { statusCode: 201 };
  }
}
