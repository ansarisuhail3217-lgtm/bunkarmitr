import { User, Job, Rating, UserRole } from './types';

const VARANASI_CENTER = { lat: 25.3176, lng: 83.0068 };

function randomOffset(km: number) {
  const deg = km / 111;
  return (Math.random() - 0.5) * 2 * deg;
}

const roles: UserRole[] = ['bani', 'karigar', 'girasta', 'mokadam', 'pata_khodne_wala', 'bana_vale', 'cutting_machine_vale', 'deka_vale'];
const names = ['रमेश कुमार', 'सुनीता देवी', 'अब्दुल रहमान', 'प्रियंका यादव', 'मोहम्मद अली', 'गीता शर्मा', 'राजेश गुप्ता', 'फातिमा बेगम', 'विनोद पटेल', 'नसरीन खातून', 'अमित सिंह', 'ज़ाहिदा परवीन'];
const areas = ['लल्लापुरा', 'मदनपुरा', 'अदालतगंज', 'बजरडीहा', 'सारनाथ', 'लोहता', 'जैतपुरा', 'रामनगर', 'कमच्छा', 'गोदौलिया', 'सिगरा', 'भेलूपुर'];

export const mockUsers: User[] = names.map((name, i) => ({
  id: `user_${i + 1}`,
  name,
  mobile: `98765${String(43210 + i).padStart(5, '0')}`,
  role: roles[i % roles.length],
  area: areas[i % areas.length],
  experience: `${Math.floor(Math.random() * 20) + 1} साल`,
  serviceType: 'साड़ी बुनाई',
  availability: Math.random() > 0.3,
  rate: `₹${(Math.floor(Math.random() * 10) + 2) * 100}/दिन`,
  profileImage: '',
  lat: VARANASI_CENTER.lat + randomOffset(5),
  lng: VARANASI_CENTER.lng + randomOffset(5),
  averageRating: Math.round((3 + Math.random() * 2) * 10) / 10,
  totalRatings: Math.floor(Math.random() * 50) + 1,
  isApproved: Math.random() > 0.2,
  createdAt: new Date(Date.now() - Math.random() * 90 * 86400000).toISOString(),
}));

export const mockJobs: Job[] = [
  { id: 'job_1', postedBy: 'user_3', postedByName: 'अब्दुल रहमान', roleRequired: 'karigar', description: 'बनारसी सिल्क साड़ी के लिए अनुभवी कारीगर चाहिए। कम से कम 5 साल का अनुभव होना चाहिए।', urgency: 'high', area: 'मदनपुरा', status: 'open', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'job_2', postedBy: 'user_7', postedByName: 'राजेश गुप्ता', roleRequired: 'bana_vale', description: 'ताना बनाने के लिए बना वाले की जरूरत है। तुरंत काम शुरू करना होगा।', urgency: 'medium', area: 'लल्लापुरा', status: 'open', createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 'job_3', postedBy: 'user_5', postedByName: 'मोहम्मद अली', roleRequired: 'cutting_machine_vale', description: 'कटिंग मशीन की जरूरत है 3 दिन के लिए।', urgency: 'low', area: 'अदालतगंज', status: 'filled', createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: 'job_4', postedBy: 'user_1', postedByName: 'रमेश कुमार', roleRequired: 'deka_vale', description: 'डेका वाले की तुरंत जरूरत है। अच्छी पेमेंट दी जाएगी।', urgency: 'high', area: 'बजरडीहा', status: 'open', createdAt: new Date().toISOString() },
];

export const mockRatings: Rating[] = [
  { id: 'rating_1', raterId: 'user_3', raterName: 'अब्दुल रहमान', receiverId: 'user_2', jobId: 'job_3', ratingValue: 5, reviewText: 'बहुत अच्छा काम किया। समय पर पूरा हुआ।', createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: 'rating_2', raterId: 'user_1', raterName: 'रमेश कुमार', receiverId: 'user_5', jobId: 'job_3', ratingValue: 4, reviewText: 'काम अच्छा था, लेकिन थोड़ा देर हुई।', createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
];
