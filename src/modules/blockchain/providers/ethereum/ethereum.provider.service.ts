import { Injectable } from '@nestjs/common';
import { Wallet } from 'ethers';
import { 
  IBlockchainProvider, 
  IBlockchainWallet, 
  ITransaction 
} from '../../interface/blcokchain.wallet.interface';


@Injectable()
export class EthereumProviderService extends IBlockchainProvider {

  public signTransaction(transaction: ITransaction): Promise<string> {
    throw new Error('Method not implemented.');
  }

  public createWallet(): IBlockchainWallet {
    return Wallet.createRandom();
  }
}
