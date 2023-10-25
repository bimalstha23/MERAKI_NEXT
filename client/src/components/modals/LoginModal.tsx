import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, Fragment } from "react";
import merakilogin from '@/assets/image/merakilogin.jpeg'
import merakioutline from '@/assets/icon/merakioutline.svg'
import Google from '@/assets/icon/Google.png'
import { usePathname } from "next/navigation";
import { getGoogleUrl } from "@/utils/getGoogleUrl";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { QueryClient, useMutation } from "@tanstack/react-query";
import { loginMutation } from "@/services/Auth";
import { AxiosError } from "axios";
import { IErrorMessage } from "@/types";
import { enqueueSnackbar } from "notistack";
import Cookies from "js-cookie";
import { queryClient } from "@/services/queryClient";

interface LoginModalProps {
    open: boolean
    handleClose: () => void,
    registerModal?: boolean
    setRegisterModalOpen?: any
}

interface ILoginform {
    email: string
    password: string
}

const schema = yup.object().shape({
    email: yup.string().email('please provide valid email').required('email is required'),
    password: yup.string().required('password is required').min(6, 'password must be at least 6 characters')
})

const LoginModal: FC<LoginModalProps> = ({ open, handleClose, setRegisterModalOpen, registerModal }) => {
    const pathname = usePathname()
    const { register, formState: { errors }, handleSubmit } = useForm<ILoginform>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema)
    })

    const { mutate, isLoading } = useMutation({
        mutationKey: ['login', 'user', 'me'],
        mutationFn: (data: ILoginform) => loginMutation(data),
        onSuccess: (data) => {
            enqueueSnackbar("You're logged in", { variant: 'success' })
            queryClient.invalidateQueries(['user', 'me'])
            Cookies.set('currentUser', JSON.stringify(data.user))
            handleClose()
        },
        onError: (error: AxiosError<IErrorMessage>) => {
            enqueueSnackbar(error.response?.data.message || 'Something Went Wrong! try again', { variant: 'error' })
        }
    })

    const onSubmit = (data: ILoginform) => {
        if (!isLoading) {
            mutate(data)
        }
    }


    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                onClose={handleClose}
                className={''}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className=" fixed  z-40 inset-0 bg-black bg-opacity-80" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto z-50 ">
                    <div className="relative flex min-h-full items-center justify-center p-4 text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full  max-w-7xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <div className="flex flex-row justify-start items-start w-full h-full gap-5 ">
                                    <div className="w-full rounded-2xl">
                                        <Image src={merakilogin} className="rounded-2xl shadow-meraki" alt="meraki" />
                                    </div>
                                    <div className="w-full flex flex-col justify-start  items-start p-14">
                                        <div className="flex flex-row w-full justify-between items-start">
                                            <h1 className="text-5xl font-extrabold text-merakired">Start <br />
                                                Shoping!</h1>
                                            <Image src={merakioutline} className="w-32 object-cover" alt="meraki" />
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start items-start w-full gap-16 mt-5 " action="">
                                            <div className="w-full">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                <div className="mt-2">
                                                    <input id="email" {...register('email')} type="email" autoComplete="email" required className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6" />
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="email"
                                                    render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Password
                                                    </label>
                                                    <div className="text-sm">
                                                        <a href="#" className="font-semibold text-merakired  hover:text-blue-900 hover:underline transition-all duration-200">
                                                            Forgot password?
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        id="password"
                                                        {...register('password')}
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-merakimain 
                                                        focus:outline-none sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="password"
                                                    render={({ message }) => <p className="text-red-500 text-xs">{message}</p>}
                                                />
                                            </div>
                                            <button type="submit" disabled={isLoading} className="w-full p-3 bg-merakiblack text-white font-bold hover:bg-merakimain hover:text-black text-lg rounded-full transition-all duration-200">
                                                Login
                                            </button>
                                        </form>
                                        <div className="flex flex-col w-full justify-center items-center gap-3">
                                            <h1 className="text-lg font-bold text-center w-full">
                                                New to Meraki ?  <button onClick={() => {
                                                    handleClose()
                                                    setRegisterModalOpen(true)
                                                }} className="font-semibold text-merakired   hover:underline transition-all duration-200">
                                                    Sign up
                                                </button>
                                            </h1>
                                            <h1 className="text-merakiTextGray w-full text-center">
                                                ----- OR -----
                                            </h1>
                                            <a href={getGoogleUrl(pathname)} className="w-full p-3 flex gap-3 flex-row justify-center items-center hover:bg-merakiblack hover:text-white font-bold bg-merakimain text-black text-lg rounded-full transition-all duration-200">
                                                <Image src={Google} alt="google" />
                                                Log in with Google
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog >
        </Transition >
    )
}

export default LoginModal

