// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Campaign } from '../../campgin/entities/campgin.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // The password will be encrypted

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campgins: Campaign[];

}

  // Add other user-related fields as needed
