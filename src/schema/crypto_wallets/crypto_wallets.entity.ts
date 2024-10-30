import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { CryptoPortfolio } from '../crypto_portfolios/crypto-portfolio.entity';
import { TokenDict } from '../token_dict/token_dict.entity';

@Entity({ name: 'crypto_wallets' })
export class CryptoWallet extends BaseEntity {
  
  @Index()
  @ManyToOne(() => CryptoPortfolio)
  @JoinColumn({ name: 'crypto_portfolio_id' })
  cryptoPortfolio: CryptoPortfolio;

  @Index()
  @ManyToOne(() => TokenDict)
  @JoinColumn({ name: 'token_dict_id' })
  tokenDict: TokenDict;

  @Index()
  @Column()
  address: string;

  @Column({ name: 'private_key' })
  privateKey: string;

  @Column()
  iv: string;

  @Column({ type: 'money' })
  balance: string;
}