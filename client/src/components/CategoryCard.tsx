'use client';
import useSetSearchParams from '@/hooks/useSetSearchParams';
import React, { FC } from 'react'
interface CategoryCardProps {
    title: string,
    image: string,
    id: number
}

const CategoryCard: FC<CategoryCardProps> = ({ title, image, id }) => {
    const createQueryString = useSetSearchParams()

    return (
        <div onClick={
            () => {
                location.href = `/products?${createQueryString('category', id.toString())}`
            }
        } className='flex justify-center items-center w-full h-[200px] lg:h-[300px] group hover:scale-110 transition-all duration-500 cursor-pointer rounded-xl hover:border-4 border-white hover:shadow-meraki'
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='flex justify-center flex-col items-center gap-3 w-full h-full backdrop-brightness-90 transition-all duration-500 bg-black/20 group-hover:bg-black/50 rounded-xl'>
                <h1 className='text-white font-bold text-2xl'>
                    {title}
                </h1>
                <button className='bg-white text-black shadow-meraki py-2 text-lg w-1/2 group-hover:bg-merakimain transition-all duration-500'>
                    Explore
                </button>
            </div>
        </div>
    )
}

export default CategoryCard