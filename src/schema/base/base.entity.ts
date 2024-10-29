import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', default: '1' })
  public version: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
