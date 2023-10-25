import { prefetchProduct } from '@/services/prefetch'
import React from 'react'
import SingleProduct from './components/SingleProduct';

const Page = async ({
    params,
}: {
    params: {
        id(id: any): unknown; slug: string
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    await prefetchProduct(Number(params.id))
    return (
        <>
            <SingleProduct slug={params.slug} />
        </>
    )
}

export default Page