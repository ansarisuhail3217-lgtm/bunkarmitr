import { supabase } from './supabase';
import { User, Job, Rating, UserRole } from './types';

// Varanasi default coords
export const DEFAULT_LAT = 25.3176;
export const DEFAULT_LNG = 82.9739;

const AUTH_KEY = 'sareesetu_auth';

// ─── Current user (session stored in localStorage for simple mobile login) ───

export function getCurrentUser(): User | null {
  try {
    const d = localStorage.getItem(AUTH_KEY);
    return d ? JSON.parse(d) : null;
  } catch { return null; }
}

export function setCurrentUser(u: User | null) {
  if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
  else localStorage.removeItem(AUTH_KEY);
}

// ─── Helper: map DB row to User type ───

function rowToUser(row: any): User {
  return {
    id: row.id,
    name: row.name,
    mobile: row.mobile,
    role: row.role as UserRole,
    area: row.area,
    experience: row.experience,
    serviceType: row.service_type,
    availability: row.availability,
    rate: row.rate,
    profileImage: row.profile_image,
    lat: row.lat,
    lng: row.lng,
    averageRating: row.average_rating,
    totalRatings: row.total_ratings,
    isApproved: row.is_approved,
    createdAt: row.created_at,
  };
}

function rowToJob(row: any): Job {
  return {
    id: row.id,
    postedBy: row.posted_by,
    postedByName: row.posted_by_name,
    roleRequired: row.role_required as UserRole,
    description: row.description,
    urgency: row.urgency,
    area: row.area,
    status: row.status,
    rateType: row.rate_type,
    rateAmount: row.rate_amount,
    createdAt: row.created_at,
  };
}

function rowToRating(row: any): Rating {
  return {
    id: row.id,
    raterId: row.rater_id,
    raterName: row.rater_name,
    receiverId: row.receiver_id,
    jobId: row.job_id,
    ratingValue: row.rating_value,
    reviewText: row.review_text,
    createdAt: row.created_at,
  };
}

// ─── Users ───

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchUsers error:', error); return []; }
  return (data || []).map(rowToUser);
}

export async function fetchUserByMobile(mobile: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('mobile', mobile).maybeSingle();
  if (error || !data) return null;
  return rowToUser(data);
}

export async function fetchUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return rowToUser(data);
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'averageRating' | 'totalRatings' | 'isApproved'>): Promise<User | null> {
  const { data, error } = await supabase.from('users').insert({
    name: user.name,
    mobile: user.mobile,
    role: user.role,
    area: user.area,
    experience: user.experience,
    service_type: user.serviceType,
    availability: user.availability,
    rate: user.rate,
    profile_image: user.profileImage,
    lat: user.lat,
    lng: user.lng,
  }).select().single();
  if (error) { console.error('createUser error:', error); return null; }
  return rowToUser(data);
}

export async function updateUser(id: string, updates: Partial<{ average_rating: number; total_ratings: number; is_approved: boolean }>): Promise<void> {
  const { error } = await supabase.from('users').update(updates).eq('id', id);
  if (error) console.error('updateUser error:', error);
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) console.error('deleteUser error:', error);
}

// ─── Jobs ───

export async function fetchJobs(): Promise<Job[]> {
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchJobs error:', error); return []; }
  return (data || []).map(rowToJob);
}

export async function createJob(job: Omit<Job, 'id' | 'createdAt'>): Promise<Job | null> {
  const { data, error } = await supabase.from('jobs').insert({
    posted_by: job.postedBy,
    posted_by_name: job.postedByName,
    role_required: job.roleRequired,
    description: job.description,
    urgency: job.urgency,
    area: job.area,
    status: job.status,
    rate_type: job.rateType || null,
    rate_amount: job.rateAmount || null,
  }).select().single();
  if (error) { console.error('createJob error:', error); return null; }
  return rowToJob(data);
}

// ─── Ratings ───

export async function fetchRatings(): Promise<Rating[]> {
  const { data, error } = await supabase.from('ratings').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchRatings error:', error); return []; }
  return (data || []).map(rowToRating);
}

export async function fetchRatingsByReceiver(receiverId: string): Promise<Rating[]> {
  const { data, error } = await supabase.from('ratings').select('*').eq('receiver_id', receiverId).order('created_at', { ascending: false });
  if (error) { console.error('fetchRatingsByReceiver error:', error); return []; }
  return (data || []).map(rowToRating);
}

export async function createRating(rating: Omit<Rating, 'id' | 'createdAt'>): Promise<Rating | null> {
  const { data, error } = await supabase.from('ratings').insert({
    rater_id: rating.raterId,
    rater_name: rating.raterName,
    receiver_id: rating.receiverId,
    job_id: rating.jobId,
    rating_value: rating.ratingValue,
    review_text: rating.reviewText,
  }).select().single();
  if (error) { console.error('createRating error:', error); return null; }
  return rowToRating(data);
}

// ─── Distance ───

export function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
