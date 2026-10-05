import { useState } from "react";
import { OrderContext } from "./OrderContext";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((previousOrders) => [...previousOrders, order]);
  };

  return (
    <>
      <OrderContext.Provider value={{ orders, addOrder }}>
        {children}
      </OrderContext.Provider>
    </>
  );
};
