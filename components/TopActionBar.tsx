import React from 'react';

interface TopActionBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onAddProduct: () => void;
}

export default function TopActionBar({ searchTerm, onSearchChange, onAddProduct }: TopActionBarProps) {
    return (
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button type="button" aria-label="Switch to list view" className="p-1.5 bg-white shadow-sm rounded-md text-slate-700 cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <button type="button" aria-label="Switch to grid view" className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </button>
                </div>
        
                <div className="relative w-full sm:w-auto">
                    <svg className="w-4 h-4 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="search" 
                        aria-label="Search products"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search products..." 
                        className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-violet-500 focus:border-violet-500 w-full md:w-64 bg-slate-50 outline-none" 
                    />
                </div>
            </div>
        
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <button type="button" aria-label="Filter products" className="flex flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                    Filter
                </button>
                <button type="button" aria-label="Add new product" onClick={onAddProduct} className="flex flex-1 md:flex-none justify-center bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap">
                    + Add Product
                </button>
            </div>
        </div>
    );
}