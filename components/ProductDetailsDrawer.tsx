'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export default function ProductDetailsDrawer({ isOpen, onClose, product }: ProductDetailsDrawerProps) {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!product) return null;

    return (
        <>
            {/* Dark Overlay */}
            <div 
                className={`fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Slide-out Panel */}
            <div 
                className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-label="Product Details"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800">Product Details</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        aria-label="Close details"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    
                    {/* Hero Image */}
                    <div className="w-full h-64 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden mb-6 relative group">
                        <Image 
                            src={product.imageUrl} 
                            alt={product.name} 
                            fill
                            unoptimized
                            className="object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                            }}
                        />
                    </div>

                    {/* Title & Price */}
                    <div className="mb-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-1">{product.name}</h1>
                                <p className="text-sm text-slate-500 font-mono">SKU: {product.sku}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-violet-600">₦{Number(product.price).toFixed(2)}</p>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-1 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700">
                                    <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'Active' ? 'bg-emerald-500' : product.status === 'Draft' ? 'bg-amber-400' : 'bg-slate-400'}`} aria-hidden="true"></span>
                                    {product.status}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-xs font-medium text-slate-500 mb-1">Inventory</p>
                            <p className="text-lg font-semibold text-slate-900">{product.stock} <span className="text-sm font-normal text-slate-500">units</span></p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-xs font-medium text-slate-500 mb-1">Lifetime Sales</p>
                            <p className="text-lg font-semibold text-slate-900">{product.sales}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-xs font-medium text-slate-500 mb-1">Category</p>
                            <p className="text-sm font-semibold text-slate-900">{product.category}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-xs font-medium text-slate-500 mb-1">Fulfillment</p>
                            <p className="text-sm font-semibold text-slate-900">{product.store}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-2">Description</h3>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {product.description}
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}