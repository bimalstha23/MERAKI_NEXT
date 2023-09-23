import axiosInstance from "@/axios"
import { productRoutesPath } from "@/config"

export const getProductsQuery = (params: any) => {
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProducts,
        params
    })
}
