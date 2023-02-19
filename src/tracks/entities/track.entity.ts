import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => Artist, { cascade: true, onDelete: 'SET NULL' })
  // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  artist: Artist;

  @Column('uuid', { nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, { cascade: true, onDelete: 'SET NULL' })
  // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  album: Album;

  @Column('uuid', { nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number
}
