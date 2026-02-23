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
  'लल्लापुरा', 'मदनपुरा', 'अदालतगंज', 'बजरडीहा', 'सारनाथ',
  'लोहता', 'पिलखना', 'जैतपुरा', 'रामनगर', 'शिवपुर',
  'कमच्छा', 'गोदौलिया', 'दशाश्वमेध', 'सिगरा', 'लंका',
  'भेलूपुर', 'अस्सी', 'नगवा', 'सुन्दरपुर', 'काशी विद्यापीठ',
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
