import { FC, PropsWithChildren, createContext, useState } from "react";
interface IOrderFilter {
    name?: string,
    sortBy?: string,
    sortOrder?: string,
    searchTerm?: string | number,
    status?: string,
    page?: number,
    pageSize?: number,
    filter?: string
}

export const OrderContext = createContext({
    orderFilters: {} as IOrderFilter,
    setorderFilters: (_value: IOrderFilter) => { }
});

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
    const [orderFilters, setorderFilters] = useState<IOrderFilter>({
        pageSize: 14,
    })

    const value = {
        orderFilters,
        setorderFilters
    }
    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}
