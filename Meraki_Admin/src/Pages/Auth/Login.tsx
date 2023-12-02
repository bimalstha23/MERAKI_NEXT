import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoginMutation } from "../../services/AuthApi";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import queryClient from "../../API/ReactQuery";
import { AxiosError } from "axios";
import { IErrorMessage } from "../../types";

interface FormValue {
    email: string,
    password: string
}

export const Login = () => {
    const { register, handleSubmit, } = useForm<FormValue>({
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { isLoading, mutate, } = useMutation({
        mutationFn: LoginMutation,
        mutationKey: ['login'],
        onSuccess: (data) => {
            enqueueSnackbar("You're logged in", { variant: 'success' })
            queryClient.invalidateQueries(['user', 'me'])
            Cookies.set('currentUser', JSON.stringify(data.user))
        },
        onError: (error: AxiosError<IErrorMessage>) => {
            console.log(error, 'loginerror')
            enqueueSnackbar(error.response?.data.message, { variant: 'error' })
        }
    })

    const handleLogin = async (data: FormValue) => {
        mutate(data)
    }


    return (
        <div className="flex w-full h-screen bg-[#121212]">
            <form className="w-full flex items-center justify-center lg:w-1/2"
                onSubmit={handleSubmit(handleLogin)}
            >
                <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                    <h1 className='text-5xl font-semibold'>Welcome Back</h1>
                    <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter you details.</p>
                    <div className='mt-8'>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium'>Email</label>
                            <input
                                {...register("email")}
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your email" />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Password</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your email"
                                type={"password"}
                                {...register("password")}
                            />
                        </div>
                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button disabled={isLoading} type="submit"
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-primary rounded-xl text-black font-bold text-lg'>Sign in</button>
                        </div>
                        <div className="flex flex-col justify-center items-center mt-0">
                            <button className='font-medium text-base text-violet-500'>Forgot password? </button>
                            <span className="text-slate-500 text-xs ">Contact The IT team for new password. </span>
                        </div>
                    </div>
                </div>
            </form>
            <div className=" relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
        </div>
    )
}
