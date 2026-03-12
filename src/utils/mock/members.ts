import { type LoyaltyMember } from "../../models/loyalty";

export const MOCK_MEMBERS: LoyaltyMember[] = [
  {
    id: "e1234567-e89b-12d3-a456-426614174000",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    spendablePoints: 150,
    tierXP: 150,
    tier: "BRONZE",
    joinDate: "2024-05-15T10:00:00Z",
    lastVisit: "2024-03-10T14:30:00Z"
  },
  {
    id: "e1234567-e89b-12d3-a456-426614174001",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    spendablePoints: 750, // Reduced spendable points to show difference
    tierXP: 1250,
    tier: "SILVER",
    joinDate: "2023-11-20T09:15:00Z",
    lastVisit: "2024-03-12T11:45:00Z"
  },
  {
    id: "e1234567-e89b-12d3-a456-426614174002",
    name: "Jordan Smith",
    email: "jordan.smith@example.com",
    spendablePoints: 4200,
    tierXP: 4200,
    tier: "GOLD",
    joinDate: "2022-08-01T16:40:00Z",
    lastVisit: "2024-03-11T08:20:00Z"
  },
  {
    id: "e1234567-e89b-12d3-a456-426614174003",
    name: "Maya Johnson",
    email: "maya.j@example.com",
    spendablePoints: 8500,
    tierXP: 8500,
    tier: "PLATINUM",
    joinDate: "2021-01-12T12:00:00Z",
    lastVisit: "2024-03-12T09:00:00Z"
  }
];
