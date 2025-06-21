import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const ItemPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    filteredItems,
    itemsPerPage
}) => {
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;

    return (
        <div className="bg-white px-4 py-3 w-full flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(indexOfLastItem, filteredItems.length)}</span> of{' '}
                        <span className="font-medium">{filteredItems.length}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <span className="sr-only">Previous</span>
                            <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                            if (
                                number === 1 ||
                                number === totalPages ||
                                (number >= currentPage - 1 && number <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={number}
                                        onClick={() => onPageChange(number)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${number === currentPage
                                                ? 'z-10 bg-blue-800 border-blue-800 text-white'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                );
                            }

                            if (
                                (number === currentPage - 2 && currentPage > 3) ||
                                (number === currentPage + 2 && currentPage < totalPages - 2)
                            ) {
                                return (
                                    <span key={number} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        <FontAwesomeIcon icon={faEllipsisH} className="h-4 w-4" />
                                    </span>
                                );
                            }

                            return null;
                        })}

                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <span className="sr-only">Next</span>
                            <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ItemPagination;