import { useContext } from "react";
import { ProductContext } from "../../Providers/ProductProvider";


export const useProduct = () => useContext(ProductContext)