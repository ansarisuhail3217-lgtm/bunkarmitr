export type UserRole = 
  | 'bani' 
  | 'karigar' 
  | 'girasta' 
  | 'mokadam' 
  | 'pata_khodne_wala' 
  | 'bana_vale' 
  | 'cutting_machine_vale' 
  | 'deka_vale';

export const ROLE_LABELS: Record<UserRole, string> = {
  bani: 'बानी',
  karigar: 'कारीगर',
  girasta: 'गिरस्ता',
  mokadam: 'मोकदम',
  pata_khodne_wala: 'पट खोदने वाला',
  bana_vale: 'बना वाले',
  cutting_machine_vale: 'कटिंग मशीन वाले',
  deka_vale: 'डेका वाले',
};

export const VARANASI_AREAS = [
  'लंका', 'मदनपुरा', 'अलईपुरा', 'चौक', 'भेलूपुर',
  'लल्लापुरा', 'कज्जकपुरा', 'लोहता', 'बजरडीहा', 'सारनाथ',
  'पांडेयपुर', 'सिगरा', 'कबीरचौरा', 'गोदौलिया', 'दशाश्वमेध',
  'अस्सी', 'शिवपुर', 'रामनगर', 'चेतगंज', 'महमूरगंज',
];

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  area: string;
  experience: string;
  serviceType: string;
  availability: boolean;
  rate: string;
  profileImage: string;
  lat: number;
  lng: number;
  averageRating: number;
  totalRatings: number;
  isApproved: boolean;
  createdAt: string;
}

export interface Job {
  id: string;
  postedBy: string;
  postedByName: string;
  roleRequired: UserRole;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  area: string;
  status: 'open' | 'filled';
  rateType?: 'saree' | 'dupatta' | 'suit';
  rateAmount?: number;
  createdAt: string;
}

export interface Rating {
  id: string;
  raterId: string;
  raterName: string;
  receiverId: string;
  jobId: string;
  ratingValue: number;
  reviewText: string;
  createdAt: string;
}

export const URGENCY_LABELS: Record<string, string> = {
  low: 'सामान्य',
  medium: 'जरूरी',
  high: 'बहुत जरूरी',
};

export const RATE_RANGES: Record<string, { label: string; min: number; max: number }> = {
  saree: { label: 'साड़ी', min: 80, max: 150 },
  dupatta: { label: 'दुपट्टा', min: 25, max: 40 },
  suit: { label: 'सूट', min: 35, max: 40 },
};
