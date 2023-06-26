import { useContext } from "react";
import { OrderContext } from "../../Providers/OrderProvider";



export const useOrder = () => useContext(OrderContext);