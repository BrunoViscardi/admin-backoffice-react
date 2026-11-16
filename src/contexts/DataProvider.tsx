import { type PropsWithChildren, useEffect, useState } from "react";
import type { Order, OrderItem } from "../types/order";
import type { User } from "../types/user";
import type { Commission } from "../types/commission";
import { getUsers } from "../services/userService";
import { getOrders, getOrderItems } from "../services/orderService";
import { getCommissions } from "../services/commissionService";

import { DataContext } from "./DataContext.tsx";

export function DataProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [usersData, ordersData, orderItemsData, commissionsData] =
          await Promise.all([
            getUsers(),
            getOrders(),
            getOrderItems(),
            getCommissions(),
          ]);

        setUsers(usersData);
        setOrders(ordersData);
        setOrderItems(orderItemsData);
        setCommissions(commissionsData);
      } catch (err) {
        setError("Erro ao carregar os dados");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <DataContext.Provider
      value={{ users, orders, orderItems, commissions, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
}
