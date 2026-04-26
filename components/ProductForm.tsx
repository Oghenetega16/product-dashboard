'use client';

import Image from 'next/image'; 
import { Product, ProductCategory, ProductStatus } from '@/types/product';
import { useProductFormLogic } from '@/hooks/useProductFormLogic';

interface ProductFormProps {
    onClose: () => void;
    initialData?: Product | null; 
}

export default function ProductForm({ onClose, initialData }: ProductFormProps) {
    // Destructure the logic from our custom hook
    const { 
        formData, 
        setFormData, 
        isPending, 
        handleImageUpload, 
        handleSubmit 
    } = useProductFormLogic({ onClose, initialData });

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="flex gap-4 items-start">
                
                {/* Clickable Dropzone / Preview Box */}
                <label 
                    htmlFor="image-upload" 
                    aria-label="Upload product image"
                    className="w-20 h-20 shrink-0 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-violet-400 transition-all relative group"
                >
                    <input 
                        id="image-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload} 
                    />
                    
                    {formData.imageUrl ? (
                        <>
                            <Image 
                                src={formData.imageUrl} 
                                alt="Preview" 
                                width={80}
                                height={80}
                                unoptimized 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL';
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center backdrop-blur-[1px]">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-slate-400 group-hover:text-violet-500 transition-colors">
                            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-[10px] font-medium">Upload</span>
                        </div>
                    )}
                </label>
                
                <div className="flex-1">
                    <label htmlFor="product-image-url" className="block text-sm font-medium text-slate-700 mb-1">Or Paste Image URL</label>
                    <input 
                        id="product-image-url"
                        type="url" 
                        value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl} 
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="product-name" className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input 
                    id="product-name"
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                    placeholder="e.g. Ergonomic Keyboard"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="product-price" className="block text-sm font-medium text-slate-700 mb-1">Price (₦)</label>
                    <input 
                        id="product-price"
                        required
                        type="number" 
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="0.00"
                    />
                </div>
                <div>
                    <label htmlFor="product-stock" className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                    <input 
                        id="product-stock"
                        required
                        type="number" 
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                        placeholder="Qty"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="product-category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select 
                        id="product-category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as ProductCategory})}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none bg-white cursor-pointer"
                    >
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Software">Software</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="product-status" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select 
                        id="product-status"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as ProductStatus})}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none bg-white cursor-pointer"
                    >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="product-store" className="block text-sm font-medium text-slate-700 mb-1">Store</label>
                    <select 
                        id="product-store"
                        value={formData.store}
                        onChange={(e) => setFormData({...formData, store: e.target.value})}
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-violet-500 outline-none bg-white cursor-pointer"
                    >
                        <option value="Main Warehouse">Main Warehouse</option>
                        <option value="Dropship">Dropship</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                <button 
                    type="button" 
                    onClick={onClose}
                    aria-label="Cancel"
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={isPending}
                    aria-label={isPending ? 'Saving...' : initialData ? 'Update Product' : 'Save Product'}
                    className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {isPending ? 'Saving...' : initialData ? 'Update Product' : 'Save Product'}
                </button>
            </div>
        </form>
    );
}