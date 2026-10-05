import { useContext } from "react";
import { OrderContext } from "./OrderContext";

export const useOrder = () => {
  return useContext(OrderContext);
};
