import { Business } from 'src/business/entities/business.entity';
import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity(DB_TABLE_NAMES.USER)
export class User extends BaseEntity {
  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'nid', nullable: true })
  nid: string;

  @Column({ name: 'first_name', nullable: true })
  firstname: string;

  @Column({ name: 'last_name', nullable: true })
  lastname: string;

  @Column({ name: 'cellphone', nullable: true })
  cellphone: string;

  @Column({ name: 'is_verified', default: true })
  isVerified: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => Business, (business) => business.users)
  @JoinColumn({ name: 'business_id' })
  business: Business;
}
