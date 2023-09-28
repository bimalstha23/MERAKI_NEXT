'use client'
import React, { Fragment } from 'react'
import ProductSeo from './ProductSeo'
import { getProductQuery } from '@/services/productService'
import { useQuery } from '@tanstack/react-query'
import { ImageSwiper } from './ImageSwaper'
import Image from 'next/image'
import done from '../../../../../public/done.svg'
import { Skeleton } from '@mui/material'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiFillThunderbolt } from 'react-icons/ai'
import cross from '../../../../../public/cross.svg'
import { IProduct } from '@/types'

const SingleProduct = ({ id }: { id: number }) => {
    const { data, isLoading } = useQuery<IProduct | undefined>({
        queryKey: ['product', id],
        queryFn: () => getProductQuery(id)
    })


    return (
        <>
            <ProductSeo product={data?.product} />
            <main className='container mx-auto  mt-10'>
                <section className='grid lg:grid-cols-2 grid-cols-1 justify-start items-start gap-20'>

                    {!isLoading ? (
                        <div className='w-full'>
                            <ImageSwiper Image={data?.product?.images} />
                        </div>
                    ) : (
                        <div className='w-full'>
                            <Skeleton variant='rectangular' height={500} className='w-full' />
                        </div>
                    )}

                    <div className='w-full flex flex-col justify-start items-start gap-9'>
                        {data?.product.instock ? (
                            <h1 className='text-merakigreen gap-2 w-full font-bold lg:text-lg text-sm flex flex-row justify-start items-start'>
                                <Image src={done} alt="" />
                                On Stock
                            </h1>
                        ) : (
                            <h1 className='text-merakired gap-2 w-full font-bold lg:text-lg text-sm flex flex-row justify-start items-start'>
                                <Image src={cross} alt="" />
                                On Stock
                            </h1>
                        )}

                        <h1 className='font-bold text-3xl text-black w-full'>
                            {!isLoading ? data?.product?.name : <Skeleton variant='text' className='w-full' />}
                        </h1>

                        <h1 className='text-text-black text-lg w-full'>
                            {!isLoading ? data?.product?.description : <div>
                                <Skeleton variant='text' className='w-full' />
                                <Skeleton variant='text' className='w-full' />
                                <Skeleton variant='text' className='w-full' />
                            </div>
                            }
                        </h1>

                        <div className='flex flex-row justify-between items-center w-full'>
                            <div className='flex flex-col items-start justify-start w-fit'>
                                <h1 className='text-black text-3xl font-bold w-full'>
                                    {!isLoading ? 'Rs.' + data?.product?.selling_price : <Skeleton variant='text' width={100} className='w-full' />}
                                </h1>
                                <h1 className=' text-sm'>
                                    Price
                                </h1>
                            </div>

                            {data?.product?.discount ?
                                <Fragment>
                                    <div className='flex flex-col items-start justify-end w-fit'>
                                        <h1 className='text-black text-3xl font-bold'>
                                            {data?.product?.discount}%
                                        </h1>
                                        <h1 className=' text-sm'>
                                            Discount
                                        </h1>
                                    </div>
                                    <div className='flex flex-col items-start justify-end w-fit'>
                                        <h1 className='text-black text-3xl font-bold w-full '>
                                            {!isLoading ? 'Rs.' + data?.product?.selling_price : <Skeleton variant='text' className='w-full' />}
                                        </h1>
                                        <h1 className=' text-sm'>
                                            Original  Price
                                        </h1>
                                    </div>
                                </Fragment> : null
                            }
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2'>
                            <button className='bg-black text-merakired font-bold p-2 rounded-lg w-fit flex flex-row justify-center items-center'>
                                <FaMinus />
                            </button>
                            <h1 className='text-black font-bold text-2xl px-5 border-b-2 border-black'>
                                1
                            </h1>
                            <button className='bg-black text-merakigreen font-bold p-2 rounded-lg w-fit flex flex-row justify-center items-center'>
                                <FaPlus />
                            </button>
                        </div>
                        <div className='flex flex-row justify-center items-center w-full'>
                            <button className='bg-merakired text-white font-bold p-2  w-full flex flex-row justify-center items-center gap-3 '>
                                Buy
                                <AiFillThunderbolt />
                            </button>
                            <button className='bg-merakigreen text-black font-bold p-2  w-full flex flex-row justify-center items-center gap-3'>
                                Add to Cart
                                <HiOutlineShoppingBag />
                            </button>
                        </div>

                    </div>

                </section>
            </main >
        </>
    )
}

export default SingleProduct