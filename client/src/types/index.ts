

export interface IProduct {
    product: Product
}


export interface Product {
    id: number
    name: string
    description: string
    selling_price: number
    cost_price: number
    quantity: number
    discount: number
    createdAt: string
    updatedAt: string
    categoryId: number
    status: string
    soldCount: number
    category: Category
    images: Image[]
    instock: boolean
}

export interface Category {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    image: string
}

export interface Image {
    id: number
    url: string
    createdAt: string
    updatedAt: string
    productId: number
}
