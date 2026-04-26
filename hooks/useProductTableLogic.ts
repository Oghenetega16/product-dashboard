import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';
import { Product } from '@/types/product';

export function useProductTableLogic() {
    const [page, setPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500); 
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [price, setPrice] = useState('');
    const [store, setStore] = useState('');

    const queryClient = useQueryClient();
    const deleteMutation = useDeleteProduct();

    const { data, isLoading, isError, error } = useProducts({
        page, 
        limit: 7, 
        search: debouncedSearchTerm, 
        category: category === 'All Categories' ? '' : category,
        status: status === 'All Status' ? '' : status,
        price: price === 'All Prices' ? '' : price,
        store: store === 'All Store' ? '' : store,
    });

    const products = data?.products;
    const totalPages = data?.totalPages || 1;

    const confirmDelete = () => {
        if (!productToDelete) return;
        deleteMutation.mutate(productToDelete.id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['products'] });
                setProductToDelete(null); 
            }
        });
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingProduct(null);
    };

    // Helper handlers to reset pagination when filters change
    const handleSearchChange = (val: string) => { setSearchTerm(val); setPage(1); };
    const handleCategoryChange = (val: string) => { setCategory(val); setPage(1); };
    const handleStatusChange = (val: string) => { setStatus(val); setPage(1); };
    const handlePriceChange = (val: string) => { setPrice(val); setPage(1); };
    const handleStoreChange = (val: string) => { setStore(val); setPage(1); };

    return {
        data: { products, totalPages, isLoading, isError, error },
        filters: { searchTerm, category, status, price, store },
        pagination: { page, setPage },
        modals: { isAddModalOpen, setIsAddModalOpen, editingProduct, setEditingProduct, productToDelete, setProductToDelete, viewingProduct, setViewingProduct, handleCloseModal },
        actions: {
            handleSearchChange, handleCategoryChange, handleStatusChange, handlePriceChange, handleStoreChange,
            confirmDelete,
            isDeleting: deleteMutation.isPending,
            deletingId: deleteMutation.variables
        }
    };
}