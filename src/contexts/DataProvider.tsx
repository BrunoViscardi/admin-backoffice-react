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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const storedUsers = localStorage.getItem("users");

        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          const usersData = await getUsers();
          setUsers(usersData);
          localStorage.setItem("users", JSON.stringify(usersData));
        }

        const storedOrders = localStorage.getItem("orders");

        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        } else {
          const ordersData = await getOrders();
          setOrders(ordersData);
          localStorage.setItem("orders", JSON.stringify(ordersData));
        }

        const storedOrderItems = localStorage.getItem("orderItems");

        if (storedOrderItems) {
          setOrderItems(JSON.parse(storedOrderItems));
        } else {
          const orderItemsData = await getOrderItems();
          setOrderItems(orderItemsData);
          localStorage.setItem("orderItems", JSON.stringify(orderItemsData));
        }

        const storedCommissions = localStorage.getItem("commissions");

        if (storedCommissions) {
          setCommissions(JSON.parse(storedCommissions));
        } else {
          const commissionsData = await getCommissions();
          setCommissions(commissionsData);
          localStorage.setItem("commissions", JSON.stringify(commissionsData));
        }
      } catch (err) {
        setError("Erro ao carregar os dados");
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
    localStorage.setItem("commissions", JSON.stringify(commissions));
  }, [users, orders, orderItems, commissions]);

  function editUser<K extends keyof User>(
    id: number,
    field: K,
    value: User[K],
  ) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id ? { ...user, [field]: value } : user,
      ),
    );
  }

  function editOrderStatus(id: number, status: Order["status"]) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    );
  }

  function editCommissionStatus(id: number, status: Commission["status"]) {
    setCommissions((currentCommissions) =>
      currentCommissions.map((commission) =>
        commission.id === id ? { ...commission, status } : commission,
      ),
    );
  }

  return (
    <DataContext.Provider
      value={{
        users,
        orders,
        orderItems,
        commissions,
        loading,
        error,
        editUser,
        editOrderStatus,
        editCommissionStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
