import React from 'react';
import ProductsPage from './components/ProductsPage';
import { prefetchCategories, prefetchProducts } from '@/services/prefetch';
import { getProductsQuery } from '@/services/productService';
import { ProductData } from '@/types';

const page = async ({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    // const promises = [prefetchCategories(), prefetchProducts({ searchTerm: searchParams?.search, category: Number(searchParams?.category) })];
    // await Promise.all(promises);

    const products: ProductData = await getProductsQuery({ searchTerm: searchParams?.search, category: Number(searchParams?.category) });

    return (
        <main className="bg-white">
            <title>Meraki | Categories</title>
            <section className='container mx-auto max-sm:p-2'>
                <ProductsPage data={products} />
            </section>
        </main>
    );
};

export default page;
