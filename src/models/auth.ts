import { z } from 'zod';

export const RoleSchema = z.enum(['admin', 'manager', 'staff']);
export type UserRole = z.infer<typeof RoleSchema>;

export const LoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: RoleSchema.optional(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
