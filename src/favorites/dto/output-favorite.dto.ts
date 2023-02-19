import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { FavoritesAlbum } from '../entities/favoriteAlbum.entity';

import { FavoritesArtist } from '../entities/favoriteArtist.entity';
import { FavoritesTrack } from '../entities/favoriteTrack.entity';

export class OutputFavoriteDto {
  // artists: FavoritesArtist[];
  // albums: FavoritesAlbum[];
  // tracks: FavoritesTrack[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
