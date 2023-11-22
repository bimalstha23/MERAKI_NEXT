'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const DesktopNav = () => {
    const pathname = usePathname()
    const [_, parentpathname, childPathname] = pathname.split('/')

    return (
        <div className='flex flex-col gap-8 w-fit'>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl'>Manage my Profile</h1>
                <Link className={
                    (pathname === '/profile') ? 'text-merakigreen' : 'text-gray-500'
                } href={'/profile'}>Profile</Link>
                <Link href={'/profile/address'}>Address</Link>
            </div>

            <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl'>Manage my Orders</h1>
                <Link href={'/profile'}>My Orders</Link>
                {/* <Link href={'/profile'}>Address</Link> */}
            </div>
        </div>
    )
}

export default DesktopNav