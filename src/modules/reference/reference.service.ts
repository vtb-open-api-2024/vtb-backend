import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockchainDict } from 'src/schema/blockchain_dict/blockchain_dict.entity';
import { TokenDict } from 'src/schema/token_dict/token_dict.entity';
import { BlockchainItem, BlockchainRefDtoRes } from './dto/blockchains.dto';
import { TokenItem, TokenRefDtoRes } from './dto/tokens.dto';


@Injectable()
export class ReferenceService {
  
  @InjectRepository(BlockchainDict)
  private readonly blockchainDictRep: Repository<BlockchainDict>;

  @InjectRepository(TokenDict)
  private readonly tokenDictRep: Repository<TokenDict>;

  public async getTokens(): Promise<TokenRefDtoRes> {
    const tokens = await this.tokenDictRep.find({
      relationLoadStrategy: 'join',
      relations: { blockchainDictId: true },
      select: { 
        id: true, 
        title: true, 
        blockchainDictId: { 
          id: true, 
          title: true
        }
      }
    });
    return {
      items: tokens.map(token => {
        return {
          id: token.id,
          title: token.title,
          blockchainId: token.blockchainDictId.id,
          blockchainTitle: token.blockchainDictId.title,
        } as TokenItem
      })
    };
  }

  public async getBlockchains(): Promise<BlockchainRefDtoRes> {
    const blockchains = await this.blockchainDictRep.find({
      select: { id: true, title: true }
    });
    return {
      items: blockchains.map(blockchain => {
        return {
          id: blockchain.id,
          title: blockchain.title
        } as BlockchainItem
      })
    } as BlockchainRefDtoRes;
  }
}
