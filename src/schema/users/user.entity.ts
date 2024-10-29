import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { JwtToken } from '../jwt-tokens/jwt.token.entity';
import { AuthCode } from '../auth-code/auth-code.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => JwtToken, (jwtToken) => jwtToken.user)
  jwtTokens: JwtToken[];

  @OneToOne(() => AuthCode, (authCode) => authCode.user)
  authCode: AuthCode
}