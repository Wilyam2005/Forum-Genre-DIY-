export interface Member {
  id: number;
  name: string;
  role: string;
  divisionId: string;
  divisionName: string;
  subDivision?: string;
  isCoordinator?: boolean;
  image: string;
  localPath: string;
  quote?: string;
  instagram?: string;
  tags: string[];
}

export interface Division {
  id: string;
  name: string;
  shortName: string;
  description: string;
  groupImage: string;
  localGroupPath: string;
  coordinator: string;
  accentColor: string;
  badgeColor: string;
  memberCount: number;
  iconName: string;
  focusAreas: string[];
}

export interface ProgramItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Edukasi' | 'Sosial' | 'Kreatif' | 'Kemitraan' | 'Kapasitas' | 'BPH' | 'P4M' | 'EKRAF' | 'MEDKOM' | 'HUMAS' | 'PSDM';
  quarter: string;
  date: string;
  division: string;
  description: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  status: 'Selesai' | 'Sedang Berjalan' | 'Mendatang';
  highlights: string[];
}

export interface BentoItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tag: string;
  colSpan?: string;
  rowSpan?: string;
  theme: 'blue' | 'gold' | 'red' | 'dark';
}

export interface QAResult {
  id: string;
  title: string;
  category: 'Asset' | 'Performance' | 'UI/UX' | 'Data';
  status: 'passed' | 'warning' | 'failed';
  details: string;
  metric?: string;
}
