import { useState } from "react";
import { OrderContext } from "./OrderContext";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((previousOrders) => [...previousOrders, order]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order,
      ),
    );
  };

  const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

  return (
    <>
      <OrderContext.Provider
        value={{ orders, addOrder, updateOrderStatus, totalRevenue }}
      >
        {children}
      </OrderContext.Provider>
    </>
  );
};
