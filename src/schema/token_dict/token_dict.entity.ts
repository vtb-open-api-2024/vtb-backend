import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { BlockchainDict } from '../blockchain_dict/blockchain_dict.entity';

@Entity({ name: 'token_dict' })
export class TokenDict extends BaseEntity {

  @Index()
  @ManyToOne(() => BlockchainDict)
  @JoinColumn({ name: 'blockchain_dict_id' })
  blockchainDictId: BlockchainDict;

  @Column({ unique: true })
  title: string;
}