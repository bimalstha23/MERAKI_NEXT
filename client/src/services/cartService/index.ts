import axiosInstance from "@/axios"
import { cartRoutesPath } from "@/constants/api.routes"

export const addtoCart = async (productId: number) => {
    return axiosInstance({
        method: "post",
        url: cartRoutesPath.createCart,
        data: {
            productId
        }
    })
}

export const getCart = async () => {
    return axiosInstance({
        method: "get",
        url: cartRoutesPath.getCart
    })
}


export const updateCartItem = async (productId: number, quantity: number) => {
    return axiosInstance({
        method: "put",
        url: cartRoutesPath.updateCartItem,
        data: {
            productId,
            quantity
        }
    })
}


export const deleteCartItem = async (productId: number) => {
    return axiosInstance({
        method: "delete",
        url: cartRoutesPath.deleteCart,
        data: {
            productId
        }
    })
}