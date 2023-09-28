import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, Fragment } from "react";
import merakilogin from '@/assets/image/merakilogin.jpeg'
import merakioutline from '@/assets/icon/merakioutline.svg'
import Google from '@/assets/icon/Google.png'
import { usePathname } from "next/navigation";
import { getGoogleUrl } from "@/utils/getGoogleUrl";

interface LoginModalProps {
    open: boolean
    handleClose: () => void
}


const LoginModal: FC<LoginModalProps> = ({ open, handleClose }) => {
    const pathname = usePathname()

    return (
        <Transition appear show={open} as={Fragment}>
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
                    <div className="fixed inset-0 bg-black bg-opacity-80" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
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
                                    <div className="w-full rounded-2xl">
                                        <Image src={merakilogin} className="rounded-2xl shadow-meraki" alt="meraki" />
                                    </div>
                                    <div className="w-full flex flex-col justify-start  items-start p-14">
                                        <div className="flex flex-row w-full justify-between items-start">
                                            <h1 className="text-5xl font-extrabold text-merakired">Start <br />
                                                Shoping!</h1>
                                            <Image src={merakioutline} className="w-32 object-cover" alt="meraki" />
                                        </div>

                                        <form className="flex flex-col justify-start items-start w-full gap-16 mt-5 " action="">
                                            <div className="w-full">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                <div className="mt-2">
                                                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:outline-none focus:ring-merakimain sm:text-sm sm:leading-6" />
                                                </div>
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
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="block w-full rounded-lg border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-merakimain 
                                                        focus:outline-none sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <button className="w-full p-3 bg-merakiblack text-white font-bold hover:bg-merakimain hover:text-black text-lg rounded-full transition-all duration-200">
                                                Login
                                            </button>
                                        </form>
                                        <div className="flex flex-col w-full justify-center items-center gap-3">
                                            <h1 className="text-lg font-bold text-center w-full">
                                                New to Meraki ?  <a href="#" className="font-semibold text-merakired   hover:underline transition-all duration-200">
                                                    Sign up
                                                </a>
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

