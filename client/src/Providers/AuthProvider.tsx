'use client';
import { getMeQuery } from '@/services/Auth';
import { useQuery } from '@tanstack/react-query';
import React, { FC, PropsWithChildren, createContext, useState } from 'react'
interface Iuser {
    id: number
    email: string
    password: string
    createdAt: string
    updatedAt: string
    name: string
    phone: any
    profile: string
    verified: boolean
    role: string
}

interface IAuthContext {
    currentUser: Iuser | null
    isLoading: boolean
}

const AuthContext = createContext<IAuthContext>({
    currentUser: null,
    isLoading: false

})

export const useAuth = () => React.useContext(AuthContext)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', 'me'],
        queryFn: () => getMeQuery()
    })

    const AuthValues: IAuthContext = {
        currentUser: user?.user || null,
        isLoading
    }

    return (
        <AuthContext.Provider value={AuthValues}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
