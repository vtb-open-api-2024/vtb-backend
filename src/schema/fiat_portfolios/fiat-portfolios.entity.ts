import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'fiat_portfolios' })
export class FiatPortfolio extends BaseEntity {

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;
}