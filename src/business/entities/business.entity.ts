import { DB_TABLE_NAMES } from 'src/common/constants/db-table';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity(DB_TABLE_NAMES.BUSINESS)
export class Business extends BaseEntity {
  @Column({ name: 'legal_id' })
  legalId: string;

  @Column({ name: 'legal_name' })
  legalName: string;

  @Column({ name: 'trade_name' })
  tradeName: string;

  @Column({ name: 'industry' })
  industry: string;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.business)
  @JoinColumn()
  users: User[];

  @OneToMany(() => Product, (product) => product.business)
  @JoinColumn()
  products: User[];
}
