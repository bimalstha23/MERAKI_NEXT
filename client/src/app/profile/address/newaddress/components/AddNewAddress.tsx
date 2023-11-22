'use client'
import { AddAddress, getDistrict, getMunicipals, getProvince } from '@/services/address'
import { IErrorMessage } from '@/types'
import { ErrorMessage } from '@hookform/error-message'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'

interface FormValue {
    name: string,
    phone: string
    district: string
    province: string
    ward: string
    landmark: string
    municipal: string
}


const AddNewAddress = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValue>({
        defaultValues: {
            name: '',
            phone: '',
            district: '',
            province: '',
            ward: '',
            landmark: '',
            municipal: ''
        },
    })

    const provincefield = watch('province')
    const districtfield = watch('district')

    const { data: province, isLoading: isProvinceLoading } = useQuery({
        queryFn: getProvince,
        queryKey: ['address', 'getProvince', 'province']
    })

    const { data: district, isLoading: isDistrictLoading, isFetching: isDistrictFetching } = useQuery({
        queryFn: () => getDistrict(provincefield),
        queryKey: ['district', provincefield],
        enabled: !!provincefield
    })

    const { data: municipal, isLoading: isMunicipalLoading, isFetching: isMunicipalFetching } = useQuery({
        queryFn: () => getMunicipals(districtfield),
        queryKey: ['district', districtfield],
        enabled: !!districtfield
    })
    const router = useRouter()

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: FormValue) => AddAddress(data),
        mutationKey: ['address', 'addAddress'],
        onSuccess: () => {
            enqueueSnackbar('Address added successfully', { variant: 'success' })
            router.push('/profile/address')
        },
        onError: (error: AxiosError<IErrorMessage>) => {
            enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
        }
    })

    const submit = (data: FormValue) => {
        mutate(data)
    }


    return (
        <form className="flex flex-col justify-start items-start w-full lg:gap-10 gap-2" action=""
            onSubmit={handleSubmit(submit)}
        >
            <div className='flex flex-row w-full gap-5'>
                <div className="w-full">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                    <div className="mt-2">
                        <input id="name" {...register("name")} type="name" autoComplete="name" required className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6" />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                    />
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                            Mobile Number
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="phone"
                            type="phone"
                            {...register("phone")}
                            required
                            className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-merakimain
                                        focus:outline-none sm:text-sm sm:leading-6"
                        />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="phone"
                        render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                    />
                </div>
            </div>

            <div className='flex flex-row w-full gap-5'>
                <div className="w-full">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Province</label>
                    <select
                        {...register('province')}
                        name="province"
                        id="province"
                        className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6"
                    >
                        {isProvinceLoading ? <option value="" className="text-gray-900 bg-white">
                            Loading...
                        </option> :
                            <Fragment>

                                <option value="" className="text-gray-900 bg-white">
                                    Select Province
                                </option>

                                {province?.data.provinces.map((item: any) => (
                                    <option key={item.name} value={item} className="text-gray-900 bg-white">
                                        {item}
                                    </option>
                                ))}
                            </Fragment>
                        }
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="province"
                        render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">District</label>
                    <select
                        {...register('district')}
                        name="district"
                        id="district"
                        disabled={isDistrictLoading || !provincefield || isDistrictFetching}
                        className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6"
                    >
                        {isDistrictLoading && isDistrictFetching ? <option value="" className="text-gray-900 bg-white">
                            Loading...
                        </option> : <Fragment>
                            <option value="" className="text-gray-900 bg-white">
                                Select District
                            </option>
                            {district?.data?.districts?.map((item: any) => (
                                <option key={item.name} value={item} className="text-gray-900 bg-white">
                                    {item}
                                </option>
                            ))}
                        </Fragment>}
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="district"
                        render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                    />
                </div>
            </div>

            <div className='flex flex-row w-full gap-5'>
                <div className="w-full">
                    <label htmlFor="municipal" className="block text-sm font-medium leading-6 text-gray-900">municipal</label>
                    <select
                        {...register('municipal')}
                        name="municipal"
                        id="municipal"
                        disabled={isMunicipalLoading || !districtfield}
                        className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6"
                    >
                        {isMunicipalLoading && isMunicipalFetching ?
                            <option value="" className="text-gray-900 bg-white">
                                Loading...
                            </option>
                            : <Fragment>
                                <option value="" className="text-gray-900 bg-white">
                                    Select municipal
                                </option>
                                {municipal?.data?.municipals?.map((item: any) => (
                                    <option key={item.name} value={item} className="text-gray-900 bg-white">
                                        {item}
                                    </option>
                                ))}
                            </Fragment>}
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="municipal"
                        render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="ward" className="block text-sm font-medium leading-6 text-gray-900">Ward</label>
                    <input
                        id="ward"
                        type="text"
                        {...register("ward")}
                        required
                        className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-merakimain
                                        focus:outline-none sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="ward"
                        render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                    />
                </div>
            </div>

            <div className="w-full">
                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Landmark</label>
                <input
                    id="landmark"
                    type="text"
                    {...register("landmark")}
                    required
                    className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-merakimain
                                        focus:outline-none sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                    errors={errors}
                    name="landmark"
                    render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                />
            </div>

            <div className='flex flex-row w-full gap-5'>
                <Fragment>
                    <button disabled={isLoading} type='submit' className=" p-3 bg-merakigreen  text-white font-bold hover:bg-merakired  text-lg  transition-all duration-200">
                        Save Address
                    </button>
                </Fragment>
            </div>
        </form >
    )
}

export default AddNewAddress