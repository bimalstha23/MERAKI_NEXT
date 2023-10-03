'use client'

import { getProductsQuery } from '@/services/productService'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import ProductCard from './ProductCard'
import ProductCardSkeletons from './Skeletons/ProductCardSkeletons'

const NewProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProductsQuery({ pageSize: 8 })
    })

    return (
        <section className='container mx-auto lg:mt-24 p-2'>
            <h1 className='text-center font-bold text-4xl'>New Products</h1>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-3 place-items-center justify-center mt-10 '>
                {!isLoading ? data?.data?.map((item: any, index: number) => (
                    <ProductCard key={index} product={item} />
                )) : ProductCardSkeletons(8)}
            </div>
            <div className='flex justify-center items-center w-full mt-10'>
                <button className='text-merakired text-lg'>
                    See more <IoIosArrowDropdownCircle className='inline-block' />
                </button>
            </div>
        </section>
    )
}

export default NewProducts;
