import { fetchCategories } from '@/services/categoriesService'
import { queryClient } from '@/services/queryClient'
import React from 'react'
import Categories from './components/Categories'

const page = async () => {
    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(undefined)
    })
    return (
        <main>
            <title>
                Meraki | Categories
            </title>
            <section className='container mx-auto'>
                <Categories />
            </section>
        </main>
    )
}

export default page

