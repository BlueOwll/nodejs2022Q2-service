import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
