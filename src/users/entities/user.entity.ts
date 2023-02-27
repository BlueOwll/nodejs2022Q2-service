import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
  ValueTransformer,
  VersionColumn,
} from 'typeorm';

const bigint: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string): number => parseInt(databaseValue, 10),
};

@Entity()
export default class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @Column('bigint', { transformer: [bigint] })
  createdAt: number; // timestamp of creation

  @Column('bigint', { transformer: [bigint] })
  updatedAt: number; // timestamp of last update
}
