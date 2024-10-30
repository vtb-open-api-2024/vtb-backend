import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'blockchain_dict' })
export class BlockchainDict extends BaseEntity {
  @Column()
  title: string;
}