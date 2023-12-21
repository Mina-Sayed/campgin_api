import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}