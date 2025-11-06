import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  _createdAt: Date;

  @UpdateDateColumn()
  _updatedAt: Date;

  @DeleteDateColumn()
  _deletedAt: Date;
}
