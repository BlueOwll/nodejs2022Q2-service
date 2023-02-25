import { Album } from 'src/albums/entities/album.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoritesAlbum {
  @ManyToOne(() => Album, { cascade: true, onDelete: 'CASCADE' })
  // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  album: Album;

  @PrimaryColumn('uuid')
  albumId: string;
}
