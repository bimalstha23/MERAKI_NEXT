import { fetchCategories } from "../categoriesService"
import { getProductQuery, getProductsQuery } from "../productService"
import { queryClient } from "../queryClient"


export const prefetchCategories = async () => {
    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(undefined)
    })
}

export const prefetchProducts = async (params: any) => {
    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: () => getProductsQuery(params)
    })
}

export const prefetchProduct = async (id: number) => {
    await queryClient.prefetchQuery({
        queryKey: ['product', id],
        queryFn: () => getProductQuery(id)
    })
}