import type { MemberListItem } from '../models/member';

export function compareMembers(a: MemberListItem, b: MemberListItem, sortBy: string): number {
  switch (sortBy) {
    case 'name_asc':
      return a.name.localeCompare(b.name);
    case 'name_desc':
      return b.name.localeCompare(a.name);
    case 'points_asc':
      return a.points - b.points;
    case 'points_desc':
      return b.points - a.points;
    case 'lastActivity_asc':
      return new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime();
    case 'lastActivity_desc':
      return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    case 'memberSince_asc':
      return new Date(a.memberSince).getTime() - new Date(b.memberSince).getTime();
    case 'memberSince_desc':
      return new Date(b.memberSince).getTime() - new Date(a.memberSince).getTime();
    default:
      return 0;
  }
}
