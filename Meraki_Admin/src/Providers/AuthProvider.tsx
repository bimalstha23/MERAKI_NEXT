import { PropsWithChildren, createContext, FC, useState } from "react";
import { AxiosInstance } from "../API/axios";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUser: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    login: () => { },
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState(null);

    AxiosInstance.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken?.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    const logout = () => {
        setUser(null);
    };

    const refreshToken = async () => {
        try {
            const res = await AxiosInstance.post("/refresh", {
                token: user?.refreshToken,
            });
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const login = async (user: any) => {
        try {
            const res = await AxiosInstance.post("/login", user);
            setUser(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }


    const value = {
        user,
        setUser,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
