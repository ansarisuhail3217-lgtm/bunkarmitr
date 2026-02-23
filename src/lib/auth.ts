import { getCurrentUser } from './store';

/**
 * Check if user is logged in. If not, redirect to login with return URL.
 * Returns true if logged in, false if redirecting.
 */
export function requireLogin(navigate: (path: string) => void, currentPath: string): boolean {
  const user = getCurrentUser();
  if (!user) {
    navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
    return false;
  }
  return true;
}
