    import React, { useState } from 'react';
    import ItemFilters from './MasterpageComponents/ItemMasterComponents/ItemFilters';
    import ItemHeader from './MasterpageComponents/ItemMasterComponents/ItemHeader';
    import ItemPagination from './MasterpageComponents/ItemMasterComponents/ItemPagination';
    import ItemTable from './MasterpageComponents/ItemMasterComponents/ItemTable';

    const ItemMaster = () => {
        // Sample item data with added tax fields and stock thresholds
        const [items, setItems] = useState([
            {
                id: 'ITM-1001',
                name: 'Cotton T-Shirt',
                category: 'Apparel',
                subCategory: 'T-Shirts',
                HSN: 'CT-001-BL',
                barcode: '8901234567890',
                price: 12.99,
                sgst: 9,
                cgst: 9,
                stock: 125,
                lowStockThreshold: 20,
                overStockThreshold: 100,
                status: 'active'
            },
            {
                id: 'ITM-1002',
                name: 'Denim Jeans',
                category: 'Apparel',
                subCategory: 'Bottoms',
                HSN: 'DJ-001-BL',
                barcode: '8901234567891',
                price: 29.99,
                sgst: 9,
                cgst: 9,
                stock: 85,
                lowStockThreshold: 15,
                overStockThreshold: 80,
                status: 'active'
            },
            {
                id: 'ITM-1003',
                name: 'Leather Wallet',
                category: 'Accessories',
                subCategory: 'Wallets',
                HSN: 'LW-001-BK',
                barcode: '8901234567892',
                price: 24.99,
                sgst: 9,
                cgst: 9,
                stock: 42,
                lowStockThreshold: 10,
                overStockThreshold: 50,
                status: 'active'
            },
            {
                id: 'ITM-1004',
                name: 'Stainless Steel Bottle',
                category: 'Utilities',
                subCategory: 'Drinkware',
                HSN: 'SSB-001-SL',
                barcode: '8901234567893',
                price: 19.99,
                sgst: 9,
                cgst: 9,
                stock: 0,
                lowStockThreshold: 5,
                overStockThreshold: 30,
                status: 'inactive'
            },
            {
                id: 'ITM-1005',
                name: 'Wireless Earbuds',
                category: 'Electronics',
                subCategory: 'Audio',
                HSN: 'WEB-001-BK',
                barcode: '8901234567894',
                price: 59.99,
                sgst: 14,
                cgst: 14,
                stock: 37,
                lowStockThreshold: 5,
                overStockThreshold: 40,
                status: 'active'
            },
            {
                id: 'ITM-1006',
                name: 'Canvas Backpack',
                category: 'Accessories',
                subCategory: 'Bags',
                HSN: 'CB-001-GN',
                barcode: '8901234567895',
                price: 39.99,
                sgst: 9,
                cgst: 9,
                stock: 28,
                lowStockThreshold: 5,
                overStockThreshold: 30,
                status: 'active'
            },
            {
                id: 'ITM-1007',
                name: 'Smart Watch',
                category: 'Electronics',
                subCategory: 'Wearables',
                HSN: 'SW-001-BK',
                barcode: '8901234567896',
                price: 129.99,
                sgst: 14,
                cgst: 14,
                stock: 15,
                lowStockThreshold: 5,
                overStockThreshold: 20,
                status: 'active'
            },
            {
                id: 'ITM-1008',
                name: 'Ceramic Mug',
                category: 'Utilities',
                subCategory: 'Drinkware',
                HSN: 'CM-001-WH',
                barcode: '8901234567897',
                price: 9.99,
                sgst: 9,
                cgst: 9,
                stock: 63,
                lowStockThreshold: 10,
                overStockThreshold: 50,
                status: 'active'
            },
            {
                id: 'ITM-1009',
                name: 'Yoga Mat',
                category: 'Fitness',
                subCategory: 'Equipment',
                HSN: 'YM-001-BL',
                barcode: '8901234567898',
                price: 22.99,
                sgst: 9,
                cgst: 9,
                stock: 0,
                lowStockThreshold: 5,
                overStockThreshold: 20,
                status: 'inactive'
            },
            {
                id: 'ITM-1010',
                name: 'Bluetooth Speaker',
                category: 'Electronics',
                subCategory: 'Audio',
                HSN: 'BS-001-RD',
                barcode: '8901234567899',
                price: 49.99,
                sgst: 14,
                cgst: 14,
                stock: 21,
                lowStockThreshold: 5,
                overStockThreshold: 25,
                status: 'active'
            }
        ]);

        // Filter states
        const [filters, setFilters] = useState({
            search: '',
            category: '',
            status: '',
            stockStatus: '' // Added stock status filter
        });

        // Pagination state
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 5;

        // Handle filter changes
        const handleFilterChange = (e) => {
            const { name, value } = e.target;
            setFilters(prev => ({ ...prev, [name]: value }));
            setCurrentPage(1);
        };

        // Reset all filters
        const resetFilters = () => {
            setFilters({
                search: '',
                category: '',
                status: '',
                stockStatus: ''
            });
        };

        // Filter items based on filter criteria
        const filteredItems = items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                                item.id.toLowerCase().includes(filters.search.toLowerCase());
            
            const matchesCategory = filters.category === '' || item.category === filters.category;
            const matchesStatus = filters.status === '' || item.status === filters.status;
            
            // Stock status filtering
            let matchesStockStatus = true;
            if (filters.stockStatus === 'low') {
                matchesStockStatus = item.stock > 0 && item.stock <= item.lowStockThreshold;
            } else if (filters.stockStatus === 'over') {
                matchesStockStatus = item.stock >= item.overStockThreshold;
            } else if (filters.stockStatus === 'out') {
                matchesStockStatus = item.stock === 0;
            }
            
            return matchesSearch && matchesCategory && matchesStatus && matchesStockStatus;
        });

        // Pagination logic
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

        // Change page
        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        // Action handlers
        const handleView = (itemId) => {
            console.log(`View item ${itemId}`);
            // Implement view functionality
        };

        const handleEdit = (itemId) => {
            console.log(`Edit item ${itemId}`);
            // Implement edit functionality
        };

        const handleDelete = (itemId) => {
            if (window.confirm('Are you sure you want to delete this item?')) {
                setItems(items.filter(item => item.id !== itemId));
            }
        };

        return (
            <div className="min-h-screen m-3 flex flex-col">
                <main className="flex-grow w-full">
                    <ItemHeader />
                    <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <ItemFilters 
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onReset={resetFilters}
                            categories={[...new Set(items.map(item => item.category))]}
                        />
                        
                        <ItemTable 
                            items={currentItems}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            filteredItems={filteredItems}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />

                        {filteredItems.length > 0 && (
                            <ItemPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={paginate}
                                filteredItems={filteredItems}
                                itemsPerPage={itemsPerPage}
                            />
                        )}
                    </div>
                </main>
            </div>
        );
    };

    export default ItemMaster;