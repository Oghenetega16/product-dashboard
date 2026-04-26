import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductDataTableProps {
    products: Product[] | undefined;
    isDeleting: boolean;
    deletingId: string | undefined;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onView: (product: Product) => void;
}

export default function ProductDataTable({ products, isDeleting, deletingId, onEdit, onDelete, onView }: ProductDataTableProps) {
    return (
        <div className="overflow-x-auto w-full">
            {/* We enforce a min-width of 900px so it never squishes on mobile */}
            <table className="w-full text-sm text-left min-w-225">
                <thead className="text-xs text-slate-400 font-medium border-b border-slate-100">
                    <tr>
                        <th className="p-4 w-12"><input type="checkbox" aria-label="Select all products" className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" /></th>
                        <th className="p-4 font-medium whitespace-nowrap">Product Name</th>
                        <th className="p-4 font-medium flex items-center gap-1 whitespace-nowrap">Price <span className="text-[10px]" aria-hidden="true">↕</span></th>
                        <th className="p-4 font-medium whitespace-nowrap">Stock <span className="text-[10px]" aria-hidden="true">↕</span></th>
                        <th className="p-4 font-medium whitespace-nowrap">Views <span className="text-[10px]" aria-hidden="true">↕</span></th>
                        <th className="p-4 font-medium whitespace-nowrap">Status <span className="text-[10px]" aria-hidden="true">↕</span></th>
                        <th className="p-4 font-medium text-right whitespace-nowrap">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                    {products?.map((product) => (
                        <tr key={product.id} className={`hover:bg-slate-50/50 transition-colors group ${isDeleting && deletingId === product.id ? 'opacity-50' : ''}`}>
                            <td className="p-4"><input type="checkbox" aria-label={`Select ${product.name}`} className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" /></td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <Image src={product.imageUrl} alt="" aria-hidden="true" width={40} height={40} unoptimized className="rounded-md object-cover border border-slate-100 min-w-10 min-h-10" />
                                    <div className="min-w-37.5">
                                        <p className="font-semibold text-slate-800 line-clamp-1">{product.name}</p>
                                        <p className="text-xs text-slate-400">SKU: {product.sku}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">₦{Number(product.price || 0).toFixed(2)}</td>
                            <td className="p-4 text-slate-600 whitespace-nowrap">{product.stock}</td>
                            <td className="p-4 text-slate-600 whitespace-nowrap">{product.sales * 12}</td>
                            <td className="p-4 whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700">
                                    <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'Active' ? 'bg-emerald-500' : product.status === 'Draft' ? 'bg-amber-400' : 'bg-slate-400'}`} aria-hidden="true"></span>
                                    {product.status}
                                </div>
                            </td>
                            <td className="p-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        type="button" 
                                        aria-label={`View details for ${product.name}`} 
                                        onClick={() => onView(product)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 border border-slate-200 rounded-md hover:border-blue-200 transition-colors cursor-pointer bg-white"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </button>
                                    <button 
                                        type="button" 
                                        aria-label={`Edit ${product.name}`} 
                                        onClick={() => onEdit(product)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 text-white rounded-md text-xs font-medium hover:bg-violet-700 transition-colors cursor-pointer"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        Edit
                                    </button>
                                    <button 
                                        type="button" 
                                        aria-label={`Delete ${product.name}`} 
                                        onClick={() => onDelete(product)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 border border-slate-200 rounded-md hover:border-red-200 transition-colors cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                    {products?.length === 0 && (
                        <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-500">
                                No products found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}