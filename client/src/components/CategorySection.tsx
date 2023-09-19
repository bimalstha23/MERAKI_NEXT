'use client';
import { fetchCategories } from '@/services/categoriesService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import CategoryCard from './CategoryCard';
import { IoIosArrowDropdownCircle } from 'react-icons/io'

const CategorySection = () => {
    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(4)
    })
    console.log(data)
    return (
        <section className='container mx-auto mt-11'>
            <h1 className='text-center font-bold text-4xl'>Latest Categories</h1>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-3 place-items-center justify-center mt-10 '>
                {data?.categories?.map((item: any, index: number) => (
                    <CategoryCard
                        image={item?.image}
                        title={item?.name}
                        key={index}
                    />
                ))}
            </div>
            <div className='flex justify-center items-center w-full mt-10'>
                <button className='text-merakired text-lg'>
                    See more <IoIosArrowDropdownCircle className='inline-block' />
                </button>
            </div>
        </section>
    )
}

export default CategorySection