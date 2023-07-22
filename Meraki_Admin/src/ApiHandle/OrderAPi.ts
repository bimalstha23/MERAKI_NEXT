import axiosInstance from "../API/axios"
import { orderRoutesPath } from "../config/api.routes"

export const createOrder  = (data:any)=>{
    return axiosInstance({
        method: "post",
        url: orderRoutesPath.createOrder,
        data
    })
}

export const getOrders  = (params:any)=>{
    return axiosInstance({
        method: "get",
        url: orderRoutesPath.getOrders,
        params
    })
}

export const getOrder = (params:any)=>{
    return axiosInstance({
        method: "get",
        url: orderRoutesPath.getOrder,
        params:{
            id: params
        }
    })
}

export const changeStatus = (data:any)=>{
    return axiosInstance({
        method: "put",
        url: orderRoutesPath.changeStatus,
        data
    })
}