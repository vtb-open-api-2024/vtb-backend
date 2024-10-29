import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { JwtToken } from '../jwt_tokens/jwt.token.entity';
import { AuthCode } from '../auth_code/auth-code.entity';
import { CryptoPortfolio } from '../crypto_portfolios/crypto-portfolio.entity';
import { FiatPortfolio } from '../fiat_portfolios/fiat-portfolios.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {

  @Column({ unique: true })
  phone: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @OneToMany(() => JwtToken, (jwtToken) => jwtToken.user)
  jwtTokens: JwtToken[];

  @OneToOne(() => AuthCode, (authCode) => authCode.user)
  authCode: AuthCode

  @OneToMany(() => CryptoPortfolio, (cryptoPortfolio) => cryptoPortfolio.user)
  cryptoPortfolio: CryptoPortfolio[];

  @OneToMany(() => FiatPortfolio, (fiatPortfolio) => fiatPortfolio.user)
  fiatPortfolio: FiatPortfolio[]
}