import { prefetchProduct } from '@/services/prefetch'
import React from 'react'
import SingleProduct from './components/SingleProduct';
import { getProductQuery } from '@/services/productService';


const Page = async ({
    params,
}: {
    params: {
        id(id: any): unknown; slug: string
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const data = await getProductQuery({ slug: params.slug })
    return (
        <>
            <SingleProduct slug={params.slug} product={data} />
        </>
    )
}

export default Page