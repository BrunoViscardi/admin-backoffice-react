export interface Commission {
  id: number;
  orderId: number;
  amount: number;
  status: "pending" | "paid";
}