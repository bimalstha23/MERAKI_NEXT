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
            <h1 className='text-center font-bold lg:text-4xl text-xl m-0 p-0'>Latest Categories</h1>
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
            <div className='flex justify-center items-center w-full mt-3'>
                <Link prefetch={true} href={'/categories'} className='text-merakiblack flex flex-row justify-center gap-2 items-center font-semibold text-lg'>
                    See more <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M10.5 0C16.299 -2.53482e-07 21 4.70101 21 10.5C21 16.299 16.299 21 10.5 21C4.70101 21 2.53482e-07 16.299 0 10.5C-2.53482e-07 4.70101 4.70101 2.53482e-07 10.5 0Z" fill="#323232" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.73539 16.3074L5.26461 13.6926L10.9404 10.5L5.26461 7.30736L6.73539 4.69264L17.0596 10.5L6.73539 16.3074Z" fill="#FB2448" />
                    </svg>
                </Link>
            </div>
        </section>
    )
}

export default CategorySection

