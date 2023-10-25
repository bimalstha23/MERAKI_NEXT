import axiosInstance from "@/axios"
import { productRoutesPath } from "@/constants/api.routes"

interface singleProductParams {
    id?: string
    slug?: string
}

export const getProductsQuery = (params: any) => {
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProducts,
        params
    })
}

export const getProductQuery = (params: singleProductParams) => {
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProduct,
        params: params
    })
}


