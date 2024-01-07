export interface Product {
  id:          number;
  title:       string;
  price:       number;
  description: string;
  images:      string[];
  creationAt?:  Date;
  updatedAt?:   Date;
  category?:    Category;
  taxes?: number;
}

export interface Category {
  id:         number;
  name:       Name;
  image:      string;
  creationAt: Date;
  updatedAt:  Date;
}

export enum Name {
  Clothes = "Clothes",
  Electronics = "Electronics",
  Fadhiilsed = "fadhiilsed",
  Furniture = "Furniture",
  Miscellaneous = "Miscellaneous",
  Shoes = "Shoes",
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{};
