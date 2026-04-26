

interface PaginationProps {
    currentPage: number;
    setPage: (page: number) => void;
    hasMore: boolean; 
    totalPages?: number;
}

export default function Pagination({ currentPage, setPage, hasMore, totalPages = 24 }: PaginationProps) {

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, 6, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1 bg-white">
            <button 
                type="button"
                onClick={() => setPage(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1} 
                className="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition-colors cursor-pointer"
                aria-label="Previous page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => typeof page === 'number' && setPage(page)}
                    disabled={page === '...'}
                    aria-label={page === '...' ? 'More pages' : `Page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`min-w-8 h-8 px-1 flex items-center justify-center rounded-lg text-sm transition-colors ${
                        page === currentPage
                            ? 'bg-violet-100 text-violet-700 font-semibold' // Active state from image
                            : page === '...'
                            ? 'text-slate-400 cursor-default font-medium tracking-widest' // Ellipsis
                            : 'text-slate-500 hover:bg-slate-100 font-medium cursor-pointer' // Inactive state
                    }`}
                >
                    {page}
                </button>
            ))}

            <button 
                type="button"
                onClick={() => setPage(currentPage + 1)} 
                disabled={!hasMore} 
                className="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition-colors cursor-pointer"
                aria-label="Next page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            
        </div>
    );
}