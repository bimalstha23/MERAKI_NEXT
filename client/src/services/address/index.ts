import axiosInstance from "@/axios";
import { addressRoutesPath } from "@/constants/api.routes";
import axios from "axios";

export const getProvince = async () => {
    return axios({
        url: 'https://nepaliaddress.up.railway.app/provinces',
        method: 'GET',
    })
}

export const getDistrict = async (province: string) => {
    return axios({
        url: `https://nepaliaddress.up.railway.app/districts/${province}`,
        method: 'GET',
    })
}

export const getMunicipals = async (district: string) => {
    return axios({
        url: `https://nepaliaddress.up.railway.app/municipals/${district}`,
        method: 'GET',
    })
}

export const AddAddress = async (data: any) => {
    return axiosInstance({
        url: addressRoutesPath.createAddress,
        method: 'POST',
        data,
    })
}