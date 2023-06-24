export interface IProduct {
    id: number
    name: string
    description: string
    selling_price: number
    cost_price: number
    quantity: number
    discount: number
    createdAt: string
    updatedAt: string
    deletedAt: any
    categoryId: number
    status: string
    category: Category
    images: Image[]
    instock: boolean
  }
  
  export interface Category {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    deletedAt: any
  }
  
  export interface Image {
    id: number
    url: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    productId: number
  }
  