import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  _createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  _updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  _deletedAt: Date;
}
