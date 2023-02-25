import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, { cascade: true, onDelete: 'SET NULL' })
  // @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  artist: Artist;

  @Column('uuid', { nullable: true })
  artistId: string | null;
}
