import type { Order } from '../types/order';
import type { OrderItem } from '../types/order';

export async function getOrders() {
  const response = await fetch('data/orders.json');
  if (!response.ok) {
    throw new Error('Não foi possível buscar os pedidos');
  }
  const orders: Order[] = await response.json();
  return orders;
}

export async function getOrderById(id: number): Promise<Order>{
  const orders = await getOrders();
  const order = orders.find((order) => order.id === id);
  if (!order) {
    throw new Error('Pedido não encontrado');
  }
  return order;
}

export async function getOrderDetailsById(id: number): Promise<Order> {
  const order = await getOrderById(id);
  return order;
}

export async function editOrderStatusById(id: number, status: Order['status']): Promise<Order> {
  const order = await getOrderById(id);
  const updatedOrder = { ...order, status } as Order;
  return updatedOrder;
}


