import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export default class Store {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column({ array: true })
  contact: string;

  @Column()
  opening_hours: string;
}
