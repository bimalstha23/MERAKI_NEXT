import React, { Suspense } from 'react'
import AddNewAddress from './components/AddNewAddress'

const page = () => {
    return (
        <div className='flex flex-col w-full'>
            <h1 className='text-2xl font-semibold'>Add New Address</h1>
            <div className='flex flex-col  lg:w-1/2'>
                <Suspense fallback={<div>Loading...</div>}>
                    <AddNewAddress />
                </Suspense>
            </div>
        </div>
    )
}

export default page