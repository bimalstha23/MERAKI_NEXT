import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, Fragment } from "react";
import merakilogin from '@/assets/image/merakilogin.jpeg'
import merakioutline from '@/assets/icon/merakioutline.svg'
import Google from '@/assets/icon/Google.png'
import { usePathname } from "next/navigation";
import { getGoogleUrl } from "@/utils/getGoogleUrl";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from "@tanstack/react-query";
import { registerMutation } from "@/services/Auth";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { IErrorMessage } from "@/types";


interface RegisterModalProps {
    open: boolean
    handleClose: () => void,
    openLoginModal: boolean,
    setisLoginModalOpen: any
}


interface RegisterForm {
    name: string
    email: string
    password: string
}

const RegisterModal: FC<RegisterModalProps> = ({ open, handleClose, setisLoginModalOpen }) => {
    const pathname = usePathname()

    const schema = yup.object().shape({
        name: yup.string().required('name is required').min(3, 'name must be at least 3 characters'),
        email: yup.string().email('please provide valid email').required('email is required'),
        password: yup.string().required('password is required').min(6, 'password must be at least 6 characters')
    })

    const { register, formState: { errors }, handleSubmit } = useForm<RegisterForm>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const { mutate, isLoading } = useMutation({
        mutationKey: ['register', 'user', 'me'],
        mutationFn: (data: RegisterForm) => registerMutation(data),
        onSuccess: (data) => {
            enqueueSnackbar('registered successfully now you can log into your account ', { variant: 'success' })
            setisLoginModalOpen(true)
        },

        onError: (error: AxiosError<IErrorMessage>) => {
            enqueueSnackbar(error?.response?.data?.message || 'error registering user', { variant: 'error' })
            console.log('error registering user', error?.response?.data?.message)
        }
    })

    const submit = (data: RegisterForm) => {
        mutate(data)
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog
                onClose={handleClose}
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
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-80 " />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <div className="flex flex-row justify-start items-start w-full h-full gap-5">
                                    <div className="w-full h-full rounded-2xl lg:block hidden">
                                        <Image src={merakilogin} className="rounded-2xl shadow-meraki object-cover" alt="meraki" />
                                    </div>

                                    <div className="w-full flex flex-col justify-start  items-start lg:px-14 px-2 py-5">
                                        <div className="flex flex-row w-full justify-between items-start">
                                            <h1 className="lg:text-5xl text-3xl font-extrabold text-merakired">Create <br />
                                                Account!</h1>
                                            <Image src={merakioutline} className="lg:w-32 w-20 object-cover" alt="meraki" />
                                        </div>

                                        <form className="flex flex-col justify-start items-start w-full lg:gap-10 gap-2" action=""
                                            onSubmit={handleSubmit(submit)}
                                        >
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
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                <div className="mt-2">
                                                    <input {...register("email")} id="email" type="email" autoComplete="email" required className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6" />
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
                                                </div>

                                                <div className="mt-2">
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        {...register("password")}
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
                                            <button disabled={isLoading} type="submit" className="w-full p-3 bg-merakiblack text-white font-bold hover:bg-merakimain hover:text-black text-lg rounded-full transition-all duration-200">
                                                Sign up
                                            </button>
                                        </form>
                                        <div className="flex flex-col w-full justify-center items-center gap-3">
                                            <h1 className="text-lg font-bold text-center w-full">
                                                Already have an account ?  <button onClick={() => {
                                                    handleClose()
                                                    setisLoginModalOpen(true)
                                                }} className="font-semibold text-merakired   hover:underline transition-all duration-200">
                                                    Log in
                                                </button>
                                            </h1>
                                            <h1 className="text-merakiTextGray w-full text-center">
                                                ----- OR -----
                                            </h1>
                                            <a href={getGoogleUrl(pathname)} className="w-full lg:p-3 p-2 flex gap-3 flex-row justify-center items-center hover:bg-merakiblack hover:text-white font-bold bg-merakimain text-black text-lg rounded-full transition-all duration-200">
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
            </Dialog>
        </Transition>
    )
}

export default RegisterModal

