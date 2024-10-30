import { Injectable } from '@nestjs/common';
import { EthereumProviderService } from '../ethereum/ethereum.provider.service';
import { ModuleRef } from '@nestjs/core';
import { 
  IBlockchainProvider, 
  IBlockchainWallet, 
  ITransaction
} from '../interface/blcokchain.wallet.interface';

@Injectable()
export class AggregatorService {

  private blockchainDict: Map<string, IBlockchainProvider>;

  constructor(private moduleRef: ModuleRef) { }

  async onModuleInit() {
    this.blockchainDict = new Map([
      ["ethereum", await this.moduleRef.create(EthereumProviderService)]
    ]);
  }

  public createWallet(blcokchain: string): IBlockchainWallet {
    return this.getProvider(blcokchain).createWallet();
  }

  public signTransaction(blcokchain: string, transaction: ITransaction): Promise<string> {
    return this.getProvider(blcokchain).signTransaction(transaction);
  }

  private getProvider(blcokchain: string) {
    if (this.blockchainDict.has(blcokchain)) {
      throw new Error(`it doesn't exists`);
    }
    return this.blockchainDict.get(blcokchain);
  }
}
