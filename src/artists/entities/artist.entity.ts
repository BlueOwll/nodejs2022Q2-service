import { Track } from 'src/tracks/entities/track.entity';
import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  // @OneToMany(() => Track, (track) => track.artist)
  // tracks: Track[];
}
