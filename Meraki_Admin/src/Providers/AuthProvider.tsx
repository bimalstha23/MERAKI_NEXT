import { PropsWithChildren, createContext, FC, useState, Dispatch, SetStateAction } from "react";

export interface IUserAuthCredintials {
    email: string;
    password: string;
}
interface ContextType {
    setUser: Dispatch<SetStateAction<any>>
    user: any
}


export const AuthContext = createContext<ContextType>({
    user: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: () => { }
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        setUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
