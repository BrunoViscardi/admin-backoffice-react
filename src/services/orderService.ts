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


export async function getOrderItems(): Promise<OrderItem[]> {
  const response = await fetch('data/orderItems.json');
  if (!response.ok) {
    throw new Error('Não foi possível buscar os itens dos pedidos');
  }
  const orderItems: OrderItem[] = await response.json();
  return orderItems;
  } 

export async function getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
  
  const orderItems = await getOrderItems();
  
  const orderItemsByOrderId = orderItems.filter((item) => item.orderId === orderId);

  return orderItemsByOrderId;
}

export async function editOrderStatusById(id: number, status: Order['status']): Promise<Order> {
  const order = await getOrderById(id);
  const updatedOrder = { ...order, status } as Order;
  return updatedOrder;
}


