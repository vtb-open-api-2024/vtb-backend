import { ConflictException, Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoPortfolio } from 'src/schema/crypto_portfolios/crypto-portfolio.entity';
import { Repository } from 'typeorm';
import { GetPortfolioDtoReq, GetPortfolioDtoRes } from './dto/get.dto';
import { PortfolioItem } from './dto/portfolio.dto';
import { WalletItem } from '../wallet/dto/wallet.dto';
import { CreatePortfolioDtoReq } from '../payment/dto/create_payment.dto';


@Injectable()
export class PortfolioService {

  @InjectRepository(CryptoPortfolio)
  private readonly cryptoPortfolioRep: Repository<CryptoPortfolio>;


  public async create(jwt: AuthPayload, dto: CreatePortfolioDtoReq) {
    const portfolio = await this.cryptoPortfolioRep.findOne({
      select: { id: true },
      where: { user: { id: jwt.userId }, title: dto.title }
    });
    if (portfolio) {
      return new ConflictException();
    }
    await this.cryptoPortfolioRep.save({
      title: dto.title,
      user: { id: jwt.userId }
    });
    return { statusCode: 201 };
  }

  public async getPortfolio(
    user: AuthPayload,
    dto: GetPortfolioDtoReq
  ): Promise<GetPortfolioDtoRes> {
    const portfolios = await this.cryptoPortfolioRep.find({
      relationLoadStrategy: 'join',
      relations: { 
        cryptoWallets: { tokenDict: true }
      },
      where: {
        user: { id: user.userId },
        id: dto.portfolioId
      }
    });
    const mappedPortfolios = portfolios.map(portfolio => {
      return {
        title: portfolio.title,
        portfolioId: portfolio.id,
        wallets: portfolio.cryptoWallets.map(wallet => {
          return {
            address: wallet.address,
            tokenId: wallet.tokenDict.id,
            balance: wallet.balance
          } as WalletItem
        })
      } as PortfolioItem
    });
    return { portfolios: mappedPortfolios };
  }
}
