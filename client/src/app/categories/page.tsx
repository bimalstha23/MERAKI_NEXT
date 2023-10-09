import React from 'react'
import Categories from './components/Categories'
import { prefetchCategories } from '@/services/prefetch'

const page = async () => {
    await prefetchCategories()
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

