import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FakeCardsRegister } from 'src/schema/fake_cards_register/fake_cards_register.entity';
import { Repository } from 'typeorm';
import { PutFakeCardDtoReq } from './dto/put_card.dto';
import { TokenDict } from 'src/schema/token_dict/token_dict.entity';
import { BlockchainDict } from 'src/schema/blockchain_dict/blockchain_dict.entity';
import { PutBlockchainDtoReq } from './dto/put_blockchain.dto';
import { PutTokenDtoReq } from './dto/put_token.dto';
import { DeleteTokenDtoReq } from './dto/delete_token.dto';
import { DeleteBlockchainDtoReq } from './dto/delete_blockchain.dto';

@Injectable()
export class AdminService {

  @InjectRepository(FakeCardsRegister)
  private readonly fakeCardsRegisterRep: Repository<FakeCardsRegister>;

  @InjectRepository(TokenDict)
  private readonly tokenDictRep: Repository<TokenDict>;

  @InjectRepository(BlockchainDict)
  private readonly blockchainDictRep: Repository<BlockchainDict>;

  public async putFakeCard(dto: PutFakeCardDtoReq) {
    const card = await this.fakeCardsRegisterRep.findOne({
      where: { cardNum: dto.cardNum }
    });
    if (card) {
      return new ConflictException()
    }
    return this.fakeCardsRegisterRep.save({ ...dto });
  }

  public async putToken(dto: PutTokenDtoReq) {
    const blockChain = await this.blockchainDictRep.findOne({
      where: { id: dto.blockChainId }
    });
    if (!blockChain) {
      throw new BadRequestException()
    }
    return this.tokenDictRep.save({
      title: dto.title,
      blockchainDictId: { 
        id: dto.blockChainId
      },
    });
  }

  public async putBlockchain(dto: PutBlockchainDtoReq) {
    return this.blockchainDictRep.save({
      title: dto.title
    });
  }

  public async getTokens() {
    return this.tokenDictRep.find({
      relationLoadStrategy: 'join',
      relations: {
        blockchainDictId: true
      }
    })
  }

  public async getBlockchains() {
    return this.blockchainDictRep.find()
  }

  public async deleteToken(dto: DeleteTokenDtoReq) {
    try {
      return await this.tokenDictRep.delete(dto.id);
    } catch(err) {
      return err.message;
    }
    
  }

  public async deleteBlockchain(dto: DeleteBlockchainDtoReq) {
    try {
      return await this.blockchainDictRep.delete(dto.id);
    } catch(err) {
      return err.message;
    }
  }
}
