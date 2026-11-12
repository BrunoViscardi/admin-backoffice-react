export interface OrderItem {
  id: number;
  name: "AI Engineer" | "Full Stack Developer" | "BI Analyst" | "DevOps";
  orderId: number;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  clientId: number;
  sellerId: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  date: string;
}