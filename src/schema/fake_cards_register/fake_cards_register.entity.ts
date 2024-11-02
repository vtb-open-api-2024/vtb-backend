import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'fake_cards_register' })
export class FakeCardsRegister extends BaseEntity {

  @Column({ name: 'card_num' })
  cardNum: string;
  
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'second_name' })
  secondName: string;

  @Column()
  exp: Date;

  @Column()
  cvc: number;

  @Column({ type: 'money' })
  balance: string;
}