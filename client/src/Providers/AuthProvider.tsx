import React, { FC, PropsWithChildren } from 'react'
import { createContext } from 'vm'

const AuthContext = createContext({})

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    
    return (
        <AuthContext.Provider value={''}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
