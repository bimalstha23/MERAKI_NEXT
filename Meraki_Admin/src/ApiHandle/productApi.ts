import axiosInstance from "../API/axios"
import { IFormValues } from "../Components/Products/types"
import { productRoutesPath } from "../config/api.routes"

export const AddProductMutation = async (product:IFormValues)=>{

    const requestData = {
        name: product.name,
        cost_price:product.costPrice,
        selling_price:product.sellingPrice,
        description:product.description,
        quantity:product.quantity,
        discount:product.discount,
        categoryId:product.category
    }

    const formData = new FormData()

    Object.entries(requestData).forEach(([key,value])=>{
        formData.append(key,String(value))
    })

    product.images.forEach((image)=>{
        formData.append("images",image)
    })



    const res = await axiosInstance({
        method: "post",
        url: productRoutesPath.createProduct,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return res
}


export const getProductsQuery = (params:any)=>{
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProducts,
        params 
    })
}