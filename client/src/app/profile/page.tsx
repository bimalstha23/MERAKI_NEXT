import React, { Suspense, lazy } from 'react'
const ProfileForm = lazy(() => import('@/app/profile/components/ProfileForm'))

const page = () => {
    return (
        <div className='flex flex-col w-full'>
            <h1 className='text-2xl font-semibold'>My Profile</h1>
            <div className='flex flex-col lg:w-1/2'>
                <Suspense fallback={<div>Loading...</div>}>
                    <ProfileForm />
                </Suspense>
            </div>
        </div>
    )
}

export default page