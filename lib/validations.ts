import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(10, 'Please provide a clearer description'),
    price: z.coerce.number().positive('Price must be greater than 0'),
    stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
    category: z.enum(['Electronics', 'Furniture', 'Accessories', 'Software'], {
        message: 'Please select a category',
    }),
    status: z.enum(['Active', 'Draft', 'Archived']),
    imageUrl: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
});

export type ProductFormData = z.infer<typeof productSchema>;