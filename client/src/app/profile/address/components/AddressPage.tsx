'use client'
import { GetAddresses, deleteAddress } from '@/services/address'
import { queryClient } from '@/services/queryClient'
import { Address, Addresses } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BiXCircle } from 'react-icons/bi'

const AddressPage = () => {
    const { data } = useQuery<Addresses>({
        queryKey: ['addresses'],
        queryFn: GetAddresses
    })

    const { mutate } = useMutation({
        mutationKey: ['deleteAddress'],
        mutationFn: (id: number) => deleteAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses'])
            enqueueSnackbar('Address Deleted', { variant: 'success' })
        }
    })

    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 '>
                {data ? data?.addresses?.map((item: Address) => (
                    <div className='flex flex-col border border-gray-500 rounded-md p-5 mt-3' key={item.id}>
                        <div className='flex flex-row items-center justify-between'>
                            <h1 className='font-bold text-gray-600'>{item.name}</h1>
                            <div className='flex flex-row justify-center items-center'>
                                <button onClick={() => mutate(item?.id)}><BiXCircle size={20} /></button>
                                <button ><AiFillEdit size={20} /></button>
                            </div>
                        </div>
                        <h1 className='text-sm text-gray-500'>{item.phone}</h1>
                        <h1 className='text-sm text-gray-500'>{item.province} , {item.district}, {item.municipal},  {item.landmark}</h1>
                    </div>)) : <h1>No Addresses available</h1>
                }
            </div>
            <Link href={'address/newaddress'} type='button' className="p-3 bg-merakigreen w-fit  text-white font-bold hover:bg-merakired text-lg  transition-all duration-200">
                Add New Address
            </Link>
        </div >
    )
}


export default AddressPage