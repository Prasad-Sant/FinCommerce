import { useState } from "react";
import { OrderContext } from "./OrderContext";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((previousOrders) => [...previousOrders, order]);
  };

  const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

  return (
    <>
      <OrderContext.Provider value={{ orders, addOrder, totalRevenue }}>
        {children}
      </OrderContext.Provider>
    </>
  );
};
