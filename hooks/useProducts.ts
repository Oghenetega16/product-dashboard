import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '@/lib/api';

// Query Keys for cache management
export const PRODUCT_KEYS = {
    all: ['products'] as const,
    lists: () => [...PRODUCT_KEYS.all, 'list'] as const,
    list: (filters: string) => [...PRODUCT_KEYS.lists(), { filters }] as const,
};

export function useProducts(params: { page: number; limit: number; search?: string; status?: string; price?: string; category?: string; store?: string; }) {
    return useQuery({
        queryKey: PRODUCT_KEYS.list(JSON.stringify(params)),
        queryFn: () => productApi.getProducts(params),
        placeholderData: (previousData) => previousData,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productApi.createProduct,
        onSuccess: () => {
        // Automatically refetch the product list to show the new item
            queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productApi.updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productApi.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
        },
    });
}