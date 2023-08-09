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
        categoryId:product.category,
        status:product.status 
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

export const getProductQuery = (id:number|string)=>{
    return axiosInstance({
        method: "get",
        url: productRoutesPath.getProduct,
        params: {
            id
        }
    })
}

export const updateProductMutation =  (product:IFormValues)=>{
return  axiosInstance({
        method: "put",
        url: productRoutesPath.updateProduct,
        data: {
            name: product.name,
            cost_price:product.costPrice,
            selling_price:product.sellingPrice,
            description:product.description,
            quantity:product.quantity,
            discount:product.discount,
            categoryId:product.category,
            status:product.status,
        },
        params: {
            id:product.id
        }
    })
    // return res
}


export const changeStatusMutation = async ({productids,status}:{
    productids:number[],
    status:string
})=>{
return axiosInstance({
        method: "patch",
        url: productRoutesPath.changeStatus,
        data: {
            productids,
            status
        }
    })
}


