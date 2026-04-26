import React from 'react';

interface FilterBarProps {
    filters: { category: string; status: string; price: string; store: string; };
    actions: {
        handleCategoryChange: (val: string) => void;
        handleStatusChange: (val: string) => void;
        handlePriceChange: (val: string) => void;
        handleStoreChange: (val: string) => void;
    };
}

export default function FilterBar({ filters, actions }: FilterBarProps) {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-slate-100 bg-white">
            <div>
                <label htmlFor="category-filter" className="block text-xs text-slate-500 mb-1">Category</label>
                <select 
                    id="category-filter"
                    aria-label="Filter by category"
                    value={filters.category}
                    onChange={(e) => actions.handleCategoryChange(e.target.value)}
                    className="w-full border border-slate-200 sm:border-none bg-slate-50 rounded-lg text-sm p-2.5 text-slate-700 font-medium cursor-pointer outline-none focus:ring-2 focus:ring-violet-500"
                >
                    <option value="All Categories">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Software">Software</option>
                </select>
            </div>

            <div>
                <label htmlFor="status-filter" className="block text-xs text-slate-500 mb-1">Status</label>
                <select 
                    id="status-filter" 
                    aria-label="Filter by status" 
                    value={filters.status}
                    onChange={(e) => actions.handleStatusChange(e.target.value)}
                    className="w-full border border-slate-200 sm:border-none bg-slate-50 rounded-lg text-sm p-2.5 text-slate-700 font-medium cursor-pointer outline-none focus:ring-2 focus:ring-violet-500"
                >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                </select>
            </div>

            <div>
                <label htmlFor="price-filter" className="block text-xs text-slate-500 mb-1">Price</label>
                <select 
                    id="price-filter" 
                    aria-label="Filter by price" 
                    value={filters.price}
                    onChange={(e) => actions.handlePriceChange(e.target.value)}
                    className="w-full border border-slate-200 sm:border-none bg-slate-50 rounded-lg text-sm p-2.5 text-slate-700 font-medium cursor-pointer outline-none focus:ring-2 focus:ring-violet-500"
                >
                    <option value="All Prices">All Prices</option>
                    <option value="Under ₦50">Under ₦50</option>
                    <option value="₦50 - ₦100">₦50 - ₦100</option>
                    <option value="₦100+">₦100+</option>
                </select>
            </div>

            <div>
                <label htmlFor="store-filter" className="block text-xs text-slate-500 mb-1">Store</label>
                <select 
                    id="store-filter" 
                    aria-label="Filter by store" 
                    value={filters.store}
                    onChange={(e) => actions.handleStoreChange(e.target.value)}
                    className="w-full border border-slate-200 sm:border-none bg-slate-50 rounded-lg text-sm p-2.5 text-slate-700 font-medium cursor-pointer outline-none focus:ring-2 focus:ring-violet-500"
                >
                    <option value="All Store">All Store</option>
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Dropship">Dropship</option>
                </select>
            </div>
        </div>
    );
}