import React, { Suspense } from 'react'
import AddressPage from './components/AddressPage'
import { prefetchAddresses } from '@/services/prefetch'

const page = async () => {
    await prefetchAddresses()
    return (
        <div className='flex flex-col w-full'>
            <h1 className='text-2xl font-semibold'>Address Book</h1>
            <div className='flex flex-col lg:w-1/2'>
                <Suspense fallback={<div>Loading...</div>}>
                    <AddressPage />
                </Suspense>
            </div>
        </div>
    )
}

export default page