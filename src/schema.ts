import z from 'zod';

export const PermissionSchema = z.object({
  canEditPrice: z.boolean(),
  canViewMargins: z.boolean(),
  canDeleteReviews: z.boolean(),
  canManageUsers: z.boolean(),   
})

type Permissions = z.infer<typeof PermissionSchema>

export const ROLE_PERMISSIONS: Record<string, Permissions> = {
  ADMIN: {
    canEditPrice: true,
    canViewMargins: true,
    canDeleteReviews: true,
    canManageUsers: true,
  },
  MANAGER: {
    canEditPrice: true,
    canViewMargins: true,
    canDeleteReviews: false,
    canManageUsers: false,
  },
  STAFF: {
    canEditPrice: false,
    canViewMargins: false,
    canDeleteReviews: false,
    canManageUsers: false,
  },
};