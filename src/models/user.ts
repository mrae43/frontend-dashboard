import { z } from "zod";
import { RoleSchema } from "./auth";

export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  role: RoleSchema,
  isLoggedIn: z.boolean().default(true),
  token: z.string().optional()
});

export type User = z.infer<typeof UserSchema>;
