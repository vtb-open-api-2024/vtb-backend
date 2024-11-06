export type TransactionType = 'AddingAccount' | 'BuyingCrypto';

export type CurrencyType  = 'RUB' | 'ETH' | 'USDT';

export interface Transaction {
  amount: number;
  type: TransactionType;
  currency: CurrencyType;
  creditCardId?: number;
  walletId?: number;
}