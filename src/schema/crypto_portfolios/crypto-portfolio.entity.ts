import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'crypto_portfolios' })
export class CryptoPortfolio extends BaseEntity {

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;
}