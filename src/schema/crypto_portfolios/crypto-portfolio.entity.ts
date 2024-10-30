import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';
import { CryptoWallet } from '../crypto_wallets/crypto_wallets.entity';

@Entity({ name: 'crypto_portfolios' })
export class CryptoPortfolio extends BaseEntity {

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @OneToMany(() => CryptoWallet, (cryptoWallet) => cryptoWallet.cryptoPortfolio)
  cryptoWallets: CryptoWallet[];
}