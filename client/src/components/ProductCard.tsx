import React from 'react'
import done from '../../public/done.svg'
import Image from 'next/image'

const ProductCard = ({ product }: { product: any }) => {
    return (
        <div className='relative flex flex-col justify-start items-start w-full shadow-meraki'>
            <div className='ribbon overflow-hidden'>
                <span className='text-white font-bold text-lg'>
                    20% OFF
                </span>
            </div>
            <div className='w-full h-full'>
                <img src={product.images[0].url} alt={product.name} width={0} height={0} className='w-full lg:h-[270px] h-[150px] object-cover' />
            </div>
            <div className='flex flex-col justify-start items-start lg:p-4 p-2 gap-2 w-full'>
                <h1 className='text-merakigreen gap-2 w-full font-bold lg:text-lg text-sm flex flex-row justify-start items-start'>
                    <Image src={done} alt="" />
                    On Stock
                </h1>
                <div>
                    <h1 className='text-merakiTextGray lg:text-lg text-sm font-bold'>
                        {product.name}
                    </h1>
                    <h1 className='text-merakiTextGray text-xs p-0 m-0 font-bold'>
                        {product.description}
                    </h1>
                </div>
                <div className='flex flex-col w-full'>
                    <h1 className='text-black lg:text-2xl text-lg font-semibold'>
                        Rs.{product.selling_price}
                    </h1>
                    <button className='w-full rounded-xl text-center bg-black text-white lg:py-3 py-1 hover:bg-merakimain hover:text-black transition-all duration-400' >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard