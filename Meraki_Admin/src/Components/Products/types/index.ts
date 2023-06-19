export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
}

export interface ICategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFormValues {
  name: string;
  costPrice: number;
  sellingPrice: number;
  description: string;
  image: string;
  category: number;
  quantity: number;
  discount: number;
  images: File[];
}
