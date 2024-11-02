import { Injectable } from '@nestjs/common';
import { PrivateKey } from 'bitcore-lib';
import { 
  IBlockchainProvider, 
  IBlockchainWallet, 
  ITransaction 
} from '../../interface/blcokchain.wallet.interface';

@Injectable()
export class BitcoinProviderService extends IBlockchainProvider {

  public signTransaction(transaction: ITransaction): Promise<string> {
    throw new Error('Method not implemented.');
  }

  public createWallet(): IBlockchainWallet {
    const privateKey = new PrivateKey();
    const address = privateKey.toAddress();
    return {
      address: address.toString(),
      privateKey: privateKey.toString(),
    }
  }
}
