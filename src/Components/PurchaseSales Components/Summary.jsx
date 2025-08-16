import React, { useState, useEffect } from 'react';
import SearchableDropdown from './Orderinfo';
const ItemRow = ({
    item,
    isGST,
    onUpdate,
    onDelete,
    itemOptions,
    uomOptions,
    debitCreditOptions
}) => {
    const [localItem, setLocalItem] = useState({ ...item });

    useEffect(() => {
        setLocalItem({ ...item });
    }, [item]);

    const handleFieldChange = (field, value) => {
        const updatedItem = { ...localItem, [field]: value };

        if (isGST) {
            // Recalculate GST values
            const taxableValue = updatedItem.qty * updatedItem.price * (1 - updatedItem.discount / 100);
            updatedItem.cgstAmt = (taxableValue * (updatedItem.cgstPercent / 100)).toFixed(2);
            updatedItem.sgstAmt = (taxableValue * (updatedItem.sgstPercent / 100)).toFixed(2);
            updatedItem.totalGst = (parseFloat(updatedItem.cgstAmt) + parseFloat(updatedItem.sgstAmt)).toFixed(2);
            updatedItem.grandTotal = (taxableValue + parseFloat(updatedItem.totalGst)).toFixed(2);
        } else {
            // For regular items
            updatedItem.grandTotal = (updatedItem.qty * updatedItem.price * (1 - updatedItem.discount / 100)).toFixed(2);
        }

        setLocalItem(updatedItem);
        onUpdate(updatedItem);
    };

    const handleInputChange = (e, field) => {
        const value = field === 'itemName' || field === 'uom' || field === 'debitCredit'
            ? e
            : parseFloat(e.target.value) || 0;
        handleFieldChange(field, value);
    };

    return (
        <div id={`item-row-${localItem.id}`} className="card p-4 shadow-md space-y-4">
            <div className="flex justify-between items-start">
                <div className="w-full mr-4">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                        <i className="fas fa-box mr-1"></i> Item Name
                    </label>
                    <SearchableDropdown
                        options={itemOptions}
                        initialValue={localItem.itemName}
                        onChange={(value) => handleInputChange(value, 'itemName')}
                        placeholder="Select item"
                        showIcon={false}
                        renderLabel={false}
                    />
                </div>
                <button
                    onClick={() => onDelete(localItem.id)}
                    className="text-danger-red hover:text-danger-red-dark transition-colors duration-200 p-2 rounded-full"
                    title="Remove Item"
                >
                    <i className="fas fa-times-circle text-lg"></i>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {/* Quantity */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        <i className="fas fa-hashtag mr-1"></i> Quantity
                    </label>
                    <input
                        type="number"
                        value={localItem.qty}
                        className="qty-input input-field w-full text-sm"
                        onChange={(e) => handleInputChange(e, 'qty')}
                    />
                </div>

                {/* UOM */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        <i className="fas fa-balance-scale mr-1"></i> Unit
                    </label>
                    <SearchableDropdown
                        options={uomOptions}
                        initialValue={localItem.uom}
                        onChange={(value) => handleInputChange(value, 'uom')}
                        placeholder="Select UOM"
                        showIcon={false}
                        renderLabel={false}
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        <i className="fas fa-rupee-sign mr-1"></i> Price (per unit)
                    </label>
                    <input
                        type="number"
                        value={localItem.price}
                        className="price-input input-field w-full text-sm"
                        onChange={(e) => handleInputChange(e, 'price')}
                    />
                </div>

                {/* Discount */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        <i className="fas fa-percent mr-1"></i> Discount (%)
                    </label>
                    <input
                        type="number"
                        value={localItem.discount}
                        className="discount-input input-field w-full text-sm"
                        onChange={(e) => handleInputChange(e, 'discount')}
                    />
                </div>

                {/* Transaction Type (only for Regular Items) */}
                {!isGST && (
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            <i className="fas fa-exchange-alt mr-1"></i> Transaction Type
                        </label>
                        <SearchableDropdown
                            options={debitCreditOptions}
                            initialValue={localItem.debitCredit}
                            onChange={(value) => handleInputChange(value, 'debitCredit')}
                            placeholder="Select type"
                            showIcon={false}
                            renderLabel={false}
                        />
                    </div>
                )}
            </div>

            {/* GST specific fields */}
            {isGST && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    {/* CGST % */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">CGST (%)</label>
                        <input
                            type="number"
                            value={localItem.cgstPercent}
                            className="input-field w-full text-sm"
                            onChange={(e) => handleInputChange(e, 'cgstPercent')}
                        />
                    </div>

                    {/* CGST Amt (Read-only) */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">CGST Amt</label>
                        <input
                            type="number"
                            value={localItem.cgstAmt}
                            className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold"
                            readOnly
                        />
                    </div>

                    {/* SGST % */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">SGST (%)</label>
                        <input
                            type="number"
                            value={localItem.sgstPercent}
                            className="input-field w-full text-sm"
                            onChange={(e) => handleInputChange(e, 'sgstPercent')}
                        />
                    </div>

                    {/* SGST Amt (Read-only) */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">SGST Amt</label>
                        <input
                            type="number"
                            value={localItem.sgstAmt}
                            className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold"
                            readOnly
                        />
                    </div>

                    {/* Total GST (Read-only) */}
                    <div className="col-span-full sm:col-span-2 lg:col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Total GST</label>
                        <input
                            type="number"
                            value={localItem.totalGst}
                            className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold"
                            readOnly
                        />
                    </div>

                    {/* Grand Total (Read-only) */}
                    <div className="col-span-full sm:col-span-2 lg:col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Grand Total (Item)</label>
                        <input
                            type="number"
                            value={localItem.grandTotal}
                            className="input-field w-full text-sm bg-gray-100 cursor-not-allowed font-bold text-lg text-primary-blue"
                            readOnly
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemRow;