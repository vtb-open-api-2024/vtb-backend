import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'jwtTokens' })
export class JwtToken extends BaseEntity {

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ comment: 'Session id uuid' })
  sessionId: string;

  @Column({ comment: 'Refresh token' })
  refreshToken: string;
}