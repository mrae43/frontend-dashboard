import z from 'zod';

export const PermissionSchema = z.object({
  canAdjustPoints: z.boolean(),
  canViewMemberAnalytics: z.boolean(),
  canManageRewards: z.boolean(),
  canManageMembers: z.boolean(),
});

export type Permissions = z.infer<typeof PermissionSchema>;

export const ROLE_PERMISSIONS: Record<string, Permissions> = {
  ADMIN: {
    canAdjustPoints: true,
    canViewMemberAnalytics: true,
    canManageRewards: true,
    canManageMembers: true,
  },
  MANAGER: {
    canAdjustPoints: true,
    canViewMemberAnalytics: true,
    canManageRewards: false,
    canManageMembers: false,
  },
  STAFF: {
    canAdjustPoints: false,
    canViewMemberAnalytics: false,
    canManageRewards: false,
    canManageMembers: false,
  },
};

export const hasPermission = (role: string | undefined, permission: keyof Permissions): boolean => {
  if (!role) return false;
  const upperRole = role.toUpperCase();
  const permissions = ROLE_PERMISSIONS[upperRole];
  return permissions ? (permissions as Permissions)[permission] : false;
};
