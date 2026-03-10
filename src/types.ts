import { z } from "zod";

export const RoleSchema = z.enum(['admin', 'manager', 'staff']);
export type UserRole = z.infer<typeof RoleSchema>;

export const LoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: RoleSchema.optional()
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.email(),
  role: RoleSchema,
  isLoggedIn: z.boolean().default(true),
  token: z.string().optional()
});

export type User = z.infer<typeof UserSchema>;
