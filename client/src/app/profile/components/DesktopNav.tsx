import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const DesktopNav = () => {
    const pathname = usePathname()
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-2xl'>Manage my Profile</h1>
                <Link href={'/profile'}>Profile</Link>
                <Link href={'/profile'}>Address</Link>
            </div>

            <div className='flex flex-col'>
                <h1 className='font-bold text-2xl'>Manage my Orders</h1>
                <Link href={'/profile'}
                    className={
                        (pathname === '/profile') ? 'text-red-500' : 'text-gray-500'
                    }
                >Profile</Link>
                <Link href={'/profile'}>Address</Link>
            </div>
        </div>
    )
}

export default DesktopNav