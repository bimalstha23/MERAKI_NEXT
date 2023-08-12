import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { SignupMutation } from '../../services/AuthApi'

export const Register = () => {
    const { register, handleSubmit } = useForm<{
        email: string,
        password: string,
        name: string,
    }>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })
    const { mutate } = useMutation({
        mutationFn: SignupMutation,
        mutationKey: ['signup', 'user'],
    })


    const submit = (data: {
        email: string,
        password: string,
        name: string,
    }) => {
        mutate(data)
    }

    return (
        <form action="" onSubmit={
            handleSubmit(submit)
        }>
            <input type="text" {...register('email')} placeholder='email' />
            <input type="text" {...register('name')} placeholder='name' />
            <input type="password" {...register('password')} placeholder='password' />
            <button type='submit'>Submit</button>
        </form>

    )
}
