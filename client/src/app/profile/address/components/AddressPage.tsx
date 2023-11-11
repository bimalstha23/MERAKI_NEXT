import Link from 'next/link'
import React from 'react'

const AddressPage = () => {
    return (
        <div className='w-full'>
            <Link href={'address/newaddress'} type='button' className="p-3 bg-merakigreen  text-white font-bold hover:bg-merakired text-lg  transition-all duration-200">
                Add New Address
            </Link>
        </div>
    )
}


export default AddressPage