'use client';
import CategoryCard from '@/components/CategoryCard';
import { loadingSkeletons } from '@/components/Skeletons/CategorySkeletons';
import { fetchCategories } from '@/services/categoriesService';
import { CategoryData } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const Categories = ({ categories }: { categories: CategoryData }) => {

    const { data, isLoading } = useQuery<CategoryData>({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(undefined),
        initialData: categories,
    })

    return (
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-3 place-items-center justify-center mt-10 '>
            {!isLoading ? data?.categories?.map((item: any, index: number) => (
                <CategoryCard
                    image={item?.image}
                    name={item?.name}
                    key={index}
                />
            )) :
                loadingSkeletons(20)}
        </div>
    )
}

export default Categories