import { prefetchProduct } from '@/services/prefetch'
import React from 'react'
import SingleProduct from './components/SingleProduct';

const Page = async ({
    params,
    searchParams
}: {
    params: {
        id(id: any): unknown; slug: string
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    await prefetchProduct(Number(params.id))
    return (
        <>
            <SingleProduct id={Number(params.id)} />
        </>
    )
}

export default Page