import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Image from './Image';

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

  @OneToMany(() => Image, image => image.stores, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'store_id' })
  images: Image[];
}
