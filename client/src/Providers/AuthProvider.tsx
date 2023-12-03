'use client';
import { getMeQuery } from '@/services/Auth';
import { useQuery } from '@tanstack/react-query';
import React, { FC, PropsWithChildren, createContext } from 'react'
import Cookies from 'js-cookie'
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface IAuthContext {
    isLoading: boolean,
    isLoginModalOpen: boolean,
    isRegisterModalOpen: boolean
    setisLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setisRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const AuthContext = createContext<IAuthContext>({
    isLoading: false,
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    setisLoginModalOpen: () => { },
    setisRegisterModalOpen: () => { }
})

export const useAuth = () => React.useContext(AuthContext)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {


    const [isLoginModalOpen, setisLoginModalOpen] = React.useState(false)
    const [isRegisterModalOpen, setisRegisterModalOpen] = React.useState(false)
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: () => getMeQuery(),
        onSuccess(data) {
            if (data?.user) {
                Cookies.set('currentUser', JSON.stringify(data.user))
            }
        },
        onError(err) {
            Cookies.remove('currentUser')
            console.log(err)
        }
    })

    const AuthValues: IAuthContext = {
        isLoading,
        isLoginModalOpen,
        isRegisterModalOpen,
        setisLoginModalOpen,
        setisRegisterModalOpen
    }

    return (
        <AuthContext.Provider value={AuthValues}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
