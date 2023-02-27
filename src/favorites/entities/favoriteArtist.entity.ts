import { Artist } from './../../artists/entities/artist.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoritesArtist {
  @ManyToOne(() => Artist, { cascade: true, onDelete: 'CASCADE' })
  // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  artist: Artist;

  @PrimaryColumn('uuid')
  artistId: string;
}
