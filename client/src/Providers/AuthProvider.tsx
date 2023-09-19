import React, { FC, PropsWithChildren, createContext } from 'react'

const AuthContext = createContext({})

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    
    return (
        <AuthContext.Provider value={''}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
