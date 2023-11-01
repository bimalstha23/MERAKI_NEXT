'use client';
import React, { Fragment, useCallback, useState } from 'react'
import { IoMdFunnel } from 'react-icons/io'
import { Dialog as HDDialog, Menu, Transition } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { GiCrossMark } from 'react-icons/gi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/categoriesService';
import { getProductsQuery } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import useQueryParams from '@/hooks/useQueryParams';
import ProductCardSkeletons from '@/components/Skeletons/ProductCardSkeletons';
import { Pagination } from '@nextui-org/react';
import { Product, ProductData } from '@/types';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const ProductsPage = ({ data }: { data: ProductData }) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    // sortBy
    const { queryParams, setQueryParams } = useQueryParams()
    const categoryfilter = queryParams.get('category')
    const search = queryParams.get('search')
    const sortBy = queryParams.get('sortBy')
    const sortOrder = queryParams.get('sortOrder')

    const handleCategoryClicked = useCallback((category: any) => {
        if (category.id === categoryfilter || !category) {
            setQueryParams({ category: undefined })
            return;
        }
        setQueryParams({ category: category.name })
    }, [categoryfilter, setQueryParams])

    const filter: any = {}

    if (search) {
        filter['searchTerm'] = search
    }
    if (categoryfilter) {
        filter['category'] = categoryfilter
    }

    if (sortBy && sortOrder) {
        filter['sortBy'] = sortBy === 'price' ? 'selling_price' : ''
        filter['sortOrder'] = sortOrder
    }

    const [page, setPage] = useState<number | undefined>(1)
    const { data: products, isLoading: isProductLoading, isFetching, isRefetching } = useQuery<ProductData>({
        queryKey: ['products', filter, page],
        queryFn: () => getProductsQuery({ ...filter, page, pageSize: 20 }),
        keepPreviousData: true,
        initialData: data
    })


    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(undefined)
    })


    const sortbyPricehandler = useCallback((sortby: 'price', sortOrder: 'asc' | 'desc') => {
        if (sortby === sortBy && sortOrder === sortOrder) {
            setQueryParams({ sortBy: undefined, sortOrder: undefined })
            return;
        }
        setQueryParams({ sortBy: sortby, sortOrder: sortOrder })
    }, [setQueryParams, sortBy])

    const sortOptions: {
        name: string;
        sortBy: 'price';
        sortOrder: 'asc' | 'desc';
        current: boolean;
    }[]
        = [
            { name: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc', current: false, },
            { name: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc', current: false, }
        ]

    console.log(products?.pagination.totalNumberofPages)

    return (
        <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen}>
                <HDDialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <HDDialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <GiCrossMark className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <div className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                        {categories?.categories?.map((category: any) => (
                                            <li key={category.name}>
                                                <button className="block px-2 py-3">
                                                    {category.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </HDDialog.Panel>
                        </Transition.Child>
                    </div>
                </HDDialog>
            </Transition.Root>

            <main >
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">{search ? search : 'New Products'} </h1>
                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <BiChevronDown
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({ active }: any) => (
                                                    <button
                                                        onClick={() => sortbyPricehandler(option.sortBy, option.sortOrder)}
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500 w-full',
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {option.name}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                            <span className="sr-only">View grid</span>
                            <BsGridFill className="h-5 w-5" aria-hidden="true" />
                        </button> */}
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <IoMdFunnel className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <div className="hidden lg:block">
                            <h3 className="sr-only">Categories</h3>
                            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                {/* {Categories?.category?.map((category: any) => ( */}
                                {categories?.categories?.map((category: any) => (
                                    <li key={category.name}>
                                        <button className='navbar__link relative' onClick={() => handleCategoryClicked(category)}>{category.name}</button>
                                    </li>
                                ))}
                            </ul>
                            <div className='border-b border-gray-200 py-6'>
                                <h3 className='-my-3 flow-root pb-6 text-sm font-medium text-gray-900'>
                                    Ratings
                                </h3>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-2 lg:gap-10 gap-3 place-items-center justify-center mt-10 ">
                                {!isProductLoading && !isFetching && !isRefetching ?
                                    // (data?.products.map((product: any, key: number) => (
                                    (products?.data.map((product: Product, key: number) => (
                                        <ProductCard product={product} key={key} />
                                    )))
                                    : (
                                        ProductCardSkeletons(20)
                                    )
                                }
                            </div>
                            {!isProductLoading && <div className='flex justify-center items-center w-full mt-10'>
                                <Pagination
                                    total={products?.pagination.totalNumberofPages || 1}
                                    initialPage={page}
                                    showControls
                                    loop
                                    size='lg'
                                    onChange={(page) => {
                                        //semd to top
                                        // window.scrollTo(0, 0)
                                        setPage(page)
                                    }}
                                    about='Page navigation'
                                />
                            </div>}
                        </div>
                    </div>
                </section>
            </main>
        </div >
    )
}

export default ProductsPage