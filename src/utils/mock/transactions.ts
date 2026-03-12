import { type PointsTransaction } from "../../models/loyalty";

export const MOCK_TRANSACTIONS: PointsTransaction[] = [
  // Sarah Chen (Silver)
  {
    id: "t1-1",
    memberId: "e1234567-e89b-12d3-a456-426614174001",
    points: 250,
    type: "EARNED",
    date: "2024-03-12T11:45:00Z",
    description: "Ordered: Double Truffle Burger Combo"
  },
  {
    id: "t1-2",
    memberId: "e1234567-e89b-12d3-a456-426614174001",
    points: -500,
    type: "REDEEMED",
    date: "2024-03-11T13:20:00Z",
    description: "Redeemed: $5 Reward Voucher"
  },
  {
    id: "t1-3",
    memberId: "e1234567-e89b-12d3-a456-426614174001",
    points: 150,
    type: "EARNED",
    date: "2024-03-10T18:10:00Z",
    description: "Ordered: Classic Cheese Pizza"
  },
  {
    id: "t1-4",
    memberId: "e1234567-e89b-12d3-a456-426614174001",
    points: 50,
    type: "ADJUSTMENT",
    date: "2024-03-09T10:00:00Z",
    description: "Bonus: Weekend Warrior Special"
  },
  {
    id: "t1-5",
    memberId: "e1234567-e89b-12d3-a456-426614174001",
    points: 300,
    type: "EARNED",
    date: "2024-03-08T12:00:00Z",
    description: "Ordered: Family Feast Package"
  },
  {
    id: "t1-6",
    memberId: "e1234567-e89b-12d3-a456-426614174001",
    points: 100,
    type: "EARNED",
    date: "2024-03-05T09:30:00Z",
    description: "Ordered: Breakfast Burrito"
  },
  {
    id: "t1-7",
    memberId: "e1234567-e89b-12d3-a456-426614174001",
    points: -1000,
    type: "REDEEMED",
    date: "2024-03-01T20:00:00Z",
    description: "Redeemed: Limited Edition Merch Shirt"
  },

  // Alex Rivera (Bronze)
  {
    id: "t0-1",
    memberId: "e1234567-e89b-12d3-a456-426614174000",
    points: 100,
    type: "EARNED",
    date: "2024-03-10T14:30:00Z",
    description: "Ordered: Sushi Platter"
  },
  {
    id: "t0-2",
    memberId: "e1234567-e89b-12d3-a456-426614174000",
    points: 50,
    type: "EARNED",
    date: "2024-03-05T12:00:00Z",
    description: "First Order Bonus"
  }
];
