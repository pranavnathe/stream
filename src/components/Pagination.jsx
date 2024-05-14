import React, { useState } from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
    };

    const renderPaginationItems = () => {
    const items = [];
    const visiblePages = 4; // Number of visible page numbers

    // Calculate starting and ending page numbers
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust startPage and endPage if needed
    if (startPage === 1 && endPage < totalPages) {
        endPage = Math.min(totalPages, startPage + visiblePages);
    } else if (endPage === totalPages && startPage > 1) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Render page numbers
    for (let i = startPage; i <= endPage; i++) {
        items.push(
            <div
            key={i}
            className={`inline-block mx-1 px-4 py-1 rounded-lg ${
                i === currentPage
                ? 'bg-loginBlueDark text-white'
                : 'bg-slate-300 text-textBlack dark:bg-backgroundContrast dark:text-white'
            } cursor-pointer`}
            onClick={() => handlePageChange(i)}
            >
            {i}
            </div>
        );
    }

    // Add ellipsis and last page number if needed
    if (startPage > 1) {
        items.unshift(
            <div key="startEllipsis" className="inline-block mx-1">
            ...
            </div>
        );
        }
        if (endPage < totalPages) {
        items.push(
            <div key="endEllipsis" className="inline-block mx-1">
            ...
            </div>
        );
        items.push(
            <div
            key={totalPages}
            className={`inline-block mx-1 px-4 py-1 rounded-lg ${
                totalPages === currentPage
                ? 'bg-loginBlueDark text-white'
                : 'bg-slate-300 text-textBlack dark:bg-backgroundContrast dark:text-white'
            } cursor-pointer`}
            onClick={() => handlePageChange(totalPages)}
            >
            {totalPages}
            </div>
        );
        }

        // Add first page number on the left side when currentPage is four or higher
        if (currentPage >= 4) {
        items.unshift(
            <div
            key={1}
            className={`inline-block mx-1 px-4 py-1 rounded-lg ${
                1 === currentPage
                ? 'bg-loginBlueDark text-white'
                : 'bg-slate-300 text-textBlack dark:bg-backgroundContrast dark:text-white'
            } cursor-pointer`}
            onClick={() => handlePageChange(1)}
            >
            1
            </div>
        );
        }

        return items;
    };

    return (
        <div className="flex items-center justify-center">
        {renderPaginationItems()}
        </div>
    );
};

export default Pagination;