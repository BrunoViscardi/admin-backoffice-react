import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <h1>Dashboard</h1>,
      },
      {
        path: "/users",
        element: <h1>Usuários</h1>,
      },
      {
        path: "/orders",
        element: <h1>Pedidos</h1>,
      },
      {
        path: "/commissions",
        element: <h1>Comissões</h1>,
      },
    ],
  },
]);
