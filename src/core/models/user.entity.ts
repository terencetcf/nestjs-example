import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({
    length: 50,
  })
  username!: string;

  @Column({
    length: 100,
  })
  first_name!: string;

  @Column({
    length: 100,
  })
  last_name!: string;
}
