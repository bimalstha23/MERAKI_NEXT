'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { updateUserMutation } from '@/services/Auth'
import { queryClient } from '@/services/queryClient'
import { IErrorMessage } from '@/types'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormValue {
    name: string,
    email: string,
    phone: string
}

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required().min(10).max(10).matches(/^(98|97|96)\d{8}$/, "Invalid Mobile Number")
})

const ProfileForm = () => {
    const { currentUser } = useCurrentUser()
    const [isEditClicked, setIsEditClicked] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors, }, reset } = useForm<FormValue>({
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email,
            phone: currentUser?.phone
        },
        resolver: yupResolver(schema),
        mode: 'onBlur'
    })

    useEffect(() => {
        reset({
            name: currentUser?.name,
            email: currentUser?.email,
            phone: currentUser?.phone
        })
    }, [currentUser])

    const { mutate } = useMutation({
        mutationFn: updateUserMutation,
        mutationKey: ['updateUser', 'getMe', 'user', 'me'],
        onSuccess: (data) => {
            enqueueSnackbar("Profile Updated", { variant: 'success' })
            queryClient.invalidateQueries(['user', 'me'])
            setIsEditClicked(false)
        },
        onError: (error: AxiosError<IErrorMessage>) => {
            enqueueSnackbar(error.response?.data.message, { variant: 'error' })
        }
    })

    const submit = (data: FormValue) => {
        mutate(data)
    }
    return (
        <form className="flex flex-col justify-start items-start w-full lg:gap-10 gap-2" action=""
            onSubmit={handleSubmit(submit)}
        >
            <div className="w-full">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                <div className="mt-2">
                    <input disabled={!isEditClicked} id="name" {...register("name")} type="name" autoComplete="name" required className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6" />
                </div>
                <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                />
            </div>

            <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                    <input {...register("email")} disabled={!isEditClicked} id="email" type="email" autoComplete="email" required className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6" />
                </div>
                <ErrorMessage
                    errors={errors}

                    name="email"
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
                        disabled={!isEditClicked}
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
            <div className='flex flex-row w-full gap-5'>
                {!isEditClicked ?

                    <Fragment>
                        <button type='button' onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setIsEditClicked(true)
                        }} className=" p-3 bg-merakigreen  text-white font-bold hover:bg-merakired  text-lg  transition-all duration-200">
                            Edit Profile
                        </button>
                        <button type='button' className="p-3 bg-merakigreen  text-white font-bold hover:bg-merakired text-lg  transition-all duration-200">
                            Change Password
                        </button>
                    </Fragment>
                    : <button type='submit' className=" p-3 bg-merakired text-white font-bold hover:bg-merakigreen  text-lg  transition-all duration-200">
                        Save Changes
                    </button>}
            </div>
        </form>
    )
}

export default ProfileForm