'use client';

import React from 'react';
import Modal from './Modal';
import ProductForm from './ProductForm';
import Pagination from './Pagination'; 
import TopActionBar from './TopActionBar';         
import FilterBar from './FilterBar';               
import ProductDataTable from './ProductDataTable'; 
import ProductDetailsDrawer from './ProductDetailsDrawer';
import { useProductTableLogic } from '@/hooks/useProductTableLogic'; 

export default function ProductTable() {
    const { data, filters, pagination, modals, actions } = useProductTableLogic();

    if (data.isLoading && !data.products) return <div className="p-8 animate-pulse text-slate-500">Loading inventory data...</div>;
    
    if (data.isError) return (
        <div className="p-8 text-red-500 bg-red-50 rounded-xl border border-red-100 m-6">
            <h3 className="font-bold">Data Pipeline Error:</h3>
            <p>{data.error?.message || 'Failed to connect to MockAPI.'}</p>
        </div>
    );

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
                
                <TopActionBar 
                    searchTerm={filters.searchTerm}
                    onSearchChange={actions.handleSearchChange}
                    onAddProduct={() => modals.setIsAddModalOpen(true)}
                />

                <FilterBar 
                    filters={filters} 
                    actions={actions} 
                />

                <ProductDataTable 
                    products={data.products}
                    isDeleting={actions.isDeleting}
                    deletingId={actions.deletingId as string}
                    onView={(product) => modals.setViewingProduct(product)} // <-- Pass the onView handler
                    onEdit={(product) => modals.setEditingProduct(product)}
                    onDelete={(product) => modals.setProductToDelete(product)}
                />

                <div className="p-4 border-t border-slate-100 flex justify-center w-full overflow-x-auto">
                    <Pagination 
                        currentPage={pagination.page} 
                        setPage={pagination.setPage} 
                        hasMore={pagination.page < data.totalPages} 
                        totalPages={data.totalPages}    
                    />
                </div>
            </div>

            {/* Form Modal (Create / Edit) */}
            <Modal 
                isOpen={modals.isAddModalOpen || !!modals.editingProduct} 
                onClose={modals.handleCloseModal} 
                title={modals.editingProduct ? "Edit Product" : "Add New Product"}
            >
                <ProductForm 
                    onClose={modals.handleCloseModal} 
                    initialData={modals.editingProduct} 
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal 
                isOpen={!!modals.productToDelete} 
                onClose={() => modals.setProductToDelete(null)} 
                title="Confirm Deletion"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-slate-600">
                        Are you sure you want to delete <span className="font-semibold text-slate-800">{modals.productToDelete?.name}</span>? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                        <button 
                            type="button" 
                            onClick={() => modals.setProductToDelete(null)}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            onClick={actions.confirmDelete}
                            disabled={actions.isDeleting}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                        >
                            {actions.isDeleting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Deleting...
                                </>
                            ) : (
                                'Delete Product'
                            )}
                        </button>
                    </div>
                </div>
            </Modal>

            <ProductDetailsDrawer 
                isOpen={!!modals.viewingProduct}
                onClose={() => modals.setViewingProduct(null)}
                product={modals.viewingProduct}
            />
        </>
    );
}