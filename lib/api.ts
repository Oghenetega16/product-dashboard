import { Product } from '@/types/product';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

interface FetchProductsParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
    price?: string;
    store?: string;
}

export const productApi = {
    getProducts: async ({ 
        page = 1, 
        limit = 7, 
        search, 
        category, 
        status, 
        price, 
        store 
    }: FetchProductsParams) => {
        const url = new URL(BASE_URL);
        
        if (search) url.searchParams.append('name', search);
        if (category) url.searchParams.append('category', category);
        if (status) url.searchParams.append('status', status);
        if (store) url.searchParams.append('store', store);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch products');
        
        let allData = await res.json() as Product[];

        // Filter Price
        if (price && price !== 'All Prices') {
            allData = allData.filter(product => {
                const p = Number(product.price || 0);
                if (price === 'Under ₦50') return p < 50;
                if (price === '₦50 - ₦100') return p >= 50 && p <= 100;
                if (price === '₦100+') return p > 100;
                return true;
            });
        }

        // Sorts the array descending, putting the newest timestamps at index 0
        allData.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        const totalPages = Math.ceil(allData.length / limit);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = allData.slice(startIndex, endIndex);

        return {
            products: paginatedProducts,
            totalPages: totalPages === 0 ? 1 : totalPages, 
        };
    },
    
    // Create a product
    createProduct: async (product: Omit<Product, 'id' | 'createdAt'>) => {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Failed to create product');
        return res.json() as Promise<Product>;
    },

    // Update/Edit a product
    updateProduct: async ({ id, ...data }: Partial<Product> & { id: string }) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update product');
        return res.json() as Promise<Product>;
    },

    // Delete a product
    deleteProduct: async (id: string) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete product');
        return res.json() as Promise<Product>;
    },
};