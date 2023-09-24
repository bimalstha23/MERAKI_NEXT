'use client';
import CategoryCard from '@/components/CategoryCard';
import { loadingSkeletons } from '@/components/Skeletons/CategorySkeletons';
import { fetchCategories } from '@/services/categoriesService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const Categories = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(undefined)
    })
    return (
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-3 place-items-center justify-center mt-10 '>
            {!isLoading ? data?.categories?.map((item: any, index: number) => (
                <CategoryCard
                    image={item?.image}
                    title={item?.name}
                    key={index}
                    id={item?.id}
                />
            )) :
                loadingSkeletons(20)}
        </div>
    )
}

export default Categories