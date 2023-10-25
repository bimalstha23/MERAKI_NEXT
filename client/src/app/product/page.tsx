import React from 'react';
import ProductsPage from './components/ProductsPage';
import { prefetchCategories, prefetchProducts } from '@/services/prefetch';

const page = async ({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const promises = [prefetchCategories(), prefetchProducts({ searchTerm: searchParams?.search, category: Number(searchParams?.category) })];
    await Promise.all(promises);
    return (
        <main className="bg-white">
            <title>Meraki | Categories</title>
            <section className='container mx-auto max-sm:p-2'>
                <ProductsPage />
            </section>
        </main>
    );
};

export default page;
