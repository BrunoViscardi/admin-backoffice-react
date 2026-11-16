import { createContext } from "react";
import type { Order, OrderItem } from "../types/order";
import type { User } from "../types/user";
import type { Commission } from "../types/commission";

export interface DataContextType {
  orders: Order[];
  users: User[];
  commissions: Commission[];
  orderItems: OrderItem[];
  loading: boolean;
  error: string | null;
}

export const DataContext = createContext<DataContextType | null>(null);
