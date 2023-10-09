

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


export interface IErrorMessage {
    message: string
    success: boolean
}

export interface Iuser {
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

export interface ICartItem {
    id: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    product: Product;
}
