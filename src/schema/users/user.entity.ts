import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { JwtToken } from '../jwt_tokens/jwt.token.entity';
import { AuthCode } from '../auth_code/auth-code.entity';
import { CryptoPortfolio } from '../crypto_portfolios/crypto-portfolio.entity';
import { CryptoWallet } from '../crypto_wallets/crypto_wallets.entity';
import { Cards } from '../cards/cards.entity';

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
  
  @OneToMany(() => CryptoWallet, (cryptoWallet) => cryptoWallet.user)
  cryptoWallets: CryptoWallet[];

  @OneToMany(() => CryptoPortfolio, (cryptoPortfolio) => cryptoPortfolio.user)
  cryptoPortfolio: CryptoPortfolio[];

  @OneToMany(() => Cards, (card) => card.user)
  cards: Cards[];
}