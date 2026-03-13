export * from './auth';
export * from './user';
export * from './permissions';
export * from './loyalty';

import type { User } from './user';

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}
