import React from 'react'
import Categories from './components/Categories'
import { fetchCategories } from '@/services/categoriesService'
import { CategoryData } from '@/types'

const page = async () => {
    const categories: CategoryData = await fetchCategories(undefined)
    return (
        <main>
            <title>
                Meraki | Categories
            </title>
            <section className='container mx-auto'>
                <Categories categories={categories} />
            </section>
        </main>
    )
}

export default page

