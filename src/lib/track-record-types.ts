export interface TrackRecordPhoto {
  src: string;
  alt: string;
}

export type Era = 'awal' | 'tumbuh' | 'meluas' | 'transformasi';

export type Category = 'lingkungan' | 'sosial' | 'ekonomi' | 'teknologi' | 'pendidikan';

export type Capability =
  | 'produksi-film'
  | 'strategi-kreatif'
  | 'manajemen-kampanye'
  | 'pendampingan-komunitas'
  | 'daur-ulang-plastik'
  | 'pengembangan-sistem-digital'
  | 'edukasi-lingkungan'
  | 'pemberdayaan-perempuan'
  | 'pengelolaan-sampah-organik'
  | 'pengelolaan-sampah-wisata'
  | 'pengelolaan-sampah-pesisir'
  | 'biogas-energi-terbarukan';

export interface BeforeAfter {
  before: string;
  after: string;
}

export interface TrackRecordActivity {
  id: string;
  title: string;
  titleKey?: string;
  narrative: string;
  narrativeKey?: string;
  highlights?: string[];
  photos: TrackRecordPhoto[];
  location?: string;
  role?: string;
  era?: Era;
  categories?: Category[];
  capabilities?: Capability[];
  featured?: boolean;
  beforeAfter?: BeforeAfter;
}

export interface TrackRecordYear {
  year: number;
  activities: TrackRecordActivity[];
}
