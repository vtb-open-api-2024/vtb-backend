import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';
import { Card } from '../cards/cards.entity';
import { CryptoWallet } from '../crypto_wallets/crypto_wallets.entity';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card

  @ManyToOne(() => CryptoWallet)
  @JoinColumn({ name: 'crypto_wallet_id' })
  cryptoWallet: CryptoWallet

  @Column({ type: 'money' })
  amount: string;

  @Column({ type: 'money' })
  commission: string;

  @Column({ name: 'received_crypto' })
  receivedCrypto: string;
}