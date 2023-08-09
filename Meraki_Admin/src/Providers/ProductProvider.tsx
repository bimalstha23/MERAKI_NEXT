import { FC, PropsWithChildren, createContext, useState } from "react";


interface IProductFilters {
    category?: number,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    sortOrder?: string,
    searchTerm?: string | number,
    status?: string,
    page?: number,
    pageSize?: number,

}

export const ProductContext = createContext({
    selectedProduct: null,
    setSelectedProduct: (_value: any) => { },
    ProductFilters: {},
    setProductFilters: (_value: IProductFilters) => { }
});

export const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [ProductFilters, setProductFilters] = useState<IProductFilters>({
        pageSize: 14,
    })

    const value = {
        selectedProduct,
        setSelectedProduct,
        ProductFilters,
        setProductFilters
    }
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
