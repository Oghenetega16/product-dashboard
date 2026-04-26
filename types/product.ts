export type ProductStatus = 'Active' | 'Draft' | 'Archived';
export type ProductCategory = 'Electronics' | 'Furniture' | 'Accessories' | 'Software';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
    status: ProductStatus;
    sku: string;
    imageUrl: string;
    sales: number;
    rating: number;
    createdAt: string;
    store: string;
}