'use client';
import { fetchCategories } from '@/services/categoriesService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import CategoryCard from './CategoryCard';
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { loadingSkeletons } from './Skeletons/CategorySkeletons';
import Link from 'next/link';

const CategorySection = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(4)
    })

    return (
        <section className='container mx-auto lg:mt-24 mt-8  p-2'>
            <h1 className='text-center font-bold text-4xl m-0 p-0'>Latest Categories</h1>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-3 place-items-center justify-center lg:mt-10 mt-5 '>
                {!isLoading ? data?.categories?.map((item: any, index: number) => (
                    <CategoryCard
                        image={item?.image}
                        name={item?.name}
                        key={index}
                    />
                )) :
                    loadingSkeletons(4)}
            </div>
            <div className='flex justify-center items-center w-full mt-10'>
                <Link prefetch={true} href={'/categories'} className='text-merakired text-lg'>
                    See more <IoIosArrowDropdownCircle className='inline-block -rotate-90' />
                </Link>
            </div>
        </section>
    )
}

export default CategorySection

