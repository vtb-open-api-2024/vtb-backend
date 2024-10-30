export interface IBlockchainWallet {
  address: string;
  privateKey: string;
}

export interface ITransaction {
  from: string;
  to: string;
  value: string;
}

export abstract class IBlockchainProvider {

  abstract createWallet(): IBlockchainWallet;
  abstract signTransaction(transaction: ITransaction): Promise<string>;
  //sendTransaction(): Promise<string>;
}