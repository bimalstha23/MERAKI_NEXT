import { fetchCategories } from "../categoriesService"
import { getProductQuery, getProductsQuery, singleProductParams } from "../productService"
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

export const prefetchProduct = async (params: singleProductParams) => {
    await queryClient.prefetchQuery({
        queryKey: ['product', params.slug],
        queryFn: () => getProductQuery(params)
    })
}