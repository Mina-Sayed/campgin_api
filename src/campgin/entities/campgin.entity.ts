import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  channel: string;

  @Column('date')
  date: Date;

  @Column('time')
  time: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.campgins)
  user: User;

  @Column()
  userId: number;
}