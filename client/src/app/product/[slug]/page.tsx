import React from 'react'
import SingleProduct from './components/SingleProduct';
import { getProductQuery } from '@/services/productService';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: {
        id: string
        slug: string
    }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const product = await getProductQuery({ slug: params.slug })
    const previousImages = (await parent).openGraph?.images || []
    return {
        title: product.product.name,
        description: product.product.description,
        openGraph: {
            images: [
                ...previousImages,
                {
                    url: product.product.images[0].url,
                    alt: product.product.name,
                },
            ],
        },
        category: product.product.category.name,
        creator: product.product.category.name,
        keywords: product.product.category.name,
    }
}

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