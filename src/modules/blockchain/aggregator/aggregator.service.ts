import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { 
  IBlockchainProvider, 
  IBlockchainWallet, 
  ITransaction
} from '../interface/blcokchain.wallet.interface';
import { EthereumProviderService } from '../providers/ethereum/ethereum.provider.service';

@Injectable()
export class AggregatorService {

  private blockchainDict: Map<string, IBlockchainProvider>;

  constructor(private moduleRef: ModuleRef) { }

  async onModuleInit() {
    this.blockchainDict = new Map([
      ["ethereum", await this.moduleRef.create(EthereumProviderService)]
    ]);
  }

  public async createWallet(blcokchain: string): Promise<IBlockchainWallet> {
    return this.getProvider(blcokchain).createWallet();
  }

  public signTransaction(blcokchain: string, transaction: ITransaction): Promise<string> {
    return this.getProvider(blcokchain).signTransaction(transaction);
  }

  private getProvider(blcokchain: string) {
    if (!this.blockchainDict.has(blcokchain)) {
      throw new Error(`it doesn't exists`);
    }
    return this.blockchainDict.get(blcokchain);
  }
}
