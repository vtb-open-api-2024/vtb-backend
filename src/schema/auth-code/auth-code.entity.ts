import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'authCodes' })
export class AuthCode extends BaseEntity {

  @OneToOne(() => User, (user) => user.authCode)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ comment: 'Auth code' })
  code: string;
}