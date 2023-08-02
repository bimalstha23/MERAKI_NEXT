import axiosInstance from "../API/axios"
import { statsRoutesPath } from "../config/api.routes"


export const getStats = (filter:string) => {
    return axiosInstance({
        method: "GET",
        url: statsRoutesPath.getStats,
        params: {
            filter
        }
    })
}