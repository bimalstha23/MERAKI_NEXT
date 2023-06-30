import axiosInstance from "../API/axios"
import { orderRoutesPath } from "../config/api.routes"



export const createOrder  = (data:any)=>{
    return axiosInstance({
        method: "post",
        url: orderRoutesPath.createOrder,
        data
    })
}