import axiosInstance from "@/axios"
import { productRoutesPath } from "@/constants/api.routes"

export const getProductsQuery = (params: any) => {
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProducts,
        params
    })
}

export const getProductQuery = (id: number) => {
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProduct,
        params: { id }
    })
}


