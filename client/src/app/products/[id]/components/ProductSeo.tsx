import { NextSeo } from 'next-seo'
import React from 'react'

const ProductSeo = ({ product }: any) => {
    console.log(product)
    return (
        <NextSeo
            title={product?.name}
            description={product?.description}
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
        />
    )
}

export default ProductSeo