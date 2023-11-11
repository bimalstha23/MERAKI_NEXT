import { NextSeo } from 'next-seo'
import React from 'react'

const ProductSeo = ({ product }: any) => {
    return (
        <NextSeo
            title={'asfawf a'}
            description={product?.description}
            // defaultTitle='MERAKI'
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
        />
    )
}

export default ProductSeo