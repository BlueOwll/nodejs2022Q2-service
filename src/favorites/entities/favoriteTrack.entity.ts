import { Track } from 'src/tracks/entities/track.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class FavoritesTrack {
  @ManyToOne(() => Track, { cascade: true, onDelete: 'CASCADE' })
  // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  track: Track;

  @PrimaryColumn('uuid')
  trackId: string;
}
