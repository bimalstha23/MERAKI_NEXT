import { PropsWithChildren, createContext, FC, useState, Dispatch, SetStateAction } from "react";
import { IProduct } from "../globalTypes";

export interface IUserAuthCredintials {
    email: string;
    password: string;
}
interface ContextType {
    setUser: Dispatch<SetStateAction<any>>;
    user: any;
    selectedProduct: IProduct[] | any;
    setSelectedProduct: Dispatch<SetStateAction<IProduct[] | undefined>>;
}


export const AuthContext = createContext<ContextType>({
    user: {},
    setUser: () => { },
    selectedProduct: [], // Update initial value to undefined
    setSelectedProduct: () => { }
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState<IProduct[] | undefined>([]);

    const value = {
        user,
        setUser,
        selectedProduct,
        setSelectedProduct
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
