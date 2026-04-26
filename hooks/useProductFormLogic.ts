import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts'; 
import { Product, ProductCategory, ProductStatus } from '@/types/product';

interface UseProductFormLogicProps {
    onClose: () => void;
    initialData?: Product | null;
}

export function useProductFormLogic({ onClose, initialData }: UseProductFormLogicProps) {
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct(); 
    const queryClient = useQueryClient();
    
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        price: initialData?.price?.toString() || '',
        category: (initialData?.category || 'Electronics') as ProductCategory, 
        stock: initialData?.stock?.toString() || '',
        status: (initialData?.status || 'Active') as ProductStatus,
        store: initialData?.store || 'Main Warehouse',
        imageUrl: initialData?.imageUrl || '', 
    });

    const isPending = createMutation.isPending || updateMutation.isPending;

    // Image Compression & Upload Handler
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target?.result as string;
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400; 
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                setFormData({ ...formData, imageUrl: compressedBase64 });
            };
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            name: formData.name,
            description: initialData?.description || 'A new product added via dashboard.',
            price: Number(formData.price),
            category: formData.category,
            stock: Number(formData.stock),
            status: formData.status,
            store: formData.store,
            imageUrl: formData.imageUrl || 'https://via.placeholder.com/150?text=No+Image',
            sku: initialData?.sku || `NEW-${Math.floor(Math.random() * 1000)}`,
            sales: initialData?.sales || 0,
            rating: initialData?.rating || 0,
            createdAt: initialData?.createdAt || new Date().toISOString(), 
        };

        const handleSuccess = () => {
            queryClient.invalidateQueries(); 
            onClose(); 
        };

        if (initialData) {
            updateMutation.mutate({ id: initialData.id, ...payload }, { onSuccess: handleSuccess });
        } else {
            createMutation.mutate(payload, { onSuccess: handleSuccess });
        }
    };

    return {
        formData,
        setFormData,
        isPending,
        handleImageUpload,
        handleSubmit
    };
}