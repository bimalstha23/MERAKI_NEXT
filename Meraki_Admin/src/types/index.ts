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

export interface Iuser {
  id: number
  email: string
  createdAt: string
  updatedAt: string
  name: string
  phone: any
  profile: string
  verified: boolean
  role: string
}

export interface IErrorMessage {
  message: string
  success: boolean
}