import { User, Job, Rating } from './types';
import { mockUsers, mockJobs, mockRatings } from './mockData';

const USERS_KEY = 'sareesetu_users';
const JOBS_KEY = 'sareesetu_jobs';
const RATINGS_KEY = 'sareesetu_ratings';
const AUTH_KEY = 'sareesetu_auth';

// Varanasi default coords
export const DEFAULT_LAT = 25.3176;
export const DEFAULT_LNG = 82.9739;

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : fallback;
  } catch { return fallback; }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getUsers(): User[] { return load(USERS_KEY, mockUsers); }
export function saveUsers(u: User[]) { save(USERS_KEY, u); }
export function getJobs(): Job[] { return load(JOBS_KEY, mockJobs); }
export function saveJobs(j: Job[]) { save(JOBS_KEY, j); }
export function getRatings(): Rating[] { return load(RATINGS_KEY, mockRatings); }
export function saveRatings(r: Rating[]) { save(RATINGS_KEY, r); }

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

export function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
