import axiosInstance from "@/axios"
import { productRoutesPath } from "@/constants/api.routes"
import { IProduct, Product, ProductData } from "@/types"
import { AxiosResponse } from "axios"

export interface singleProductParams {
    id?: string
    slug?: string
}

export const getProductsQuery = (params: any): Promise<ProductData> => {
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProducts,
        params
    })
}

export const getProductQuery = async (params: singleProductParams): Promise<IProduct> => {
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProduct,
        params: params
    })
}


