import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePortfolioDtoReq } from './dto/create.dto';
import { JwtAuthPayload } from '../auth/services/jwt/interface/jwt.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoPortfolio } from 'src/schema/crypto_portfolios/crypto-portfolio.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PortfolioService {

  @InjectRepository(CryptoPortfolio)
  private readonly cryptoPortfolioRep: Repository<CryptoPortfolio>;

  
  public async create(jwt: JwtAuthPayload, dto: CreatePortfolioDtoReq) { 
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
}
