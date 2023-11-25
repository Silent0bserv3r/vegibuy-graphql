import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  distributor: string;

  @Column()
  price: number;

  @Column()
  originalPrice: number;

  @Column()
  rating: number;

  @Column()
  imageId: string;

  @Column()
  listKey: string;
}
