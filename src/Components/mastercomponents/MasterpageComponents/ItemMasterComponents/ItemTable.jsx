import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHashtag,
  faCube,
  faLayerGroup,
  faBarcode,
  faEye,
  faIndent,
  faUserPen,
  faTrashAlt,
  faWarehouse,
  faBoxes,
  faCircle,
  faRupeeSign,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

const ItemTable = ({
  items,
  onView,
  onEdit,
  onDelete,
  currentPage,
  itemsPerPage,
}) => {
  // Color definitions for professional design
  const colors = {
    primary: '#3182CE',
    primaryLight: '#EBF5FF',
    primaryDark: '#2C5282',
    border: '#E2E8F0',
    text: '#2D3748',
    textLight: '#718096',
    background: '#F7FAFC'
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  // Function to determine stock status color
  const getStockStatusColor = (item) => {
    if (item.stock === 0) return 'bg-red-100 text-red-700';
    if (item.stock <= item.lowStockThreshold) return 'bg-yellow-100 text-yellow-700';
    if (item.stock >= item.overStockThreshold) return 'bg-purple-100 text-purple-700';
    return 'bg-green-100 text-green-700';
  };

  // Function to get stock status text
  const getStockStatusText = (item) => {
    if (item.stock === 0) return 'Out of Stock';
    if (item.stock <= item.lowStockThreshold) return 'Low Stock';
    if (item.stock >= item.overStockThreshold) return 'Over Stock';
    return 'In Stock';
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden w-full border" style={{ borderColor: colors.border }}>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y text-sm">
          <thead>
            <tr style={{ backgroundColor: colors.primaryLight }}>
              {[
                { icon: faHashtag, label: 'ID' },
                { icon: faCube, label: 'Item Name' },
                { icon: faLayerGroup, label: 'Category' },
                { icon: faBarcode, label: 'HSN Code' },
                { icon: faRupeeSign, label: 'Price' },
                { icon: faBoxes, label: 'Stock' },
                { icon: faWarehouse, label: 'Location' },
                { icon: faChartBar, label: 'Stock Status' },
                { icon: faCircle, label: 'Status' },
                { label: 'Actions' },
              ].map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left font-medium uppercase tracking-wider ${
                    col.label === 'Actions' ? 'text-center' : ''
                  }`}
                  style={{ color: colors.primaryDark }}
                >
                  {col.icon && <FontAwesomeIcon icon={col.icon} className="mr-2" size="xs" />}
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ divideColor: colors.border }}>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium" style={{ color: colors.text }}>
                    {item.id}
                  </td>
                  <td className="px-4 py-3" style={{ color: colors.text }}>
                    {item.name}
                  </td>
                  <td className="px-4 py-3" style={{ color: colors.text }}>
                    {item.category}
                  </td>
                  <td className="px-4 py-3" style={{ color: colors.text }}>
                    {item.HSN}
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: colors.text }}>
                    ₹{item.price.toFixed(2)}
                  </td>
                  
                  {/* Current Stock */}
                  <td className="px-4 py-3" style={{ color: colors.text }}>
                    <div className="flex items-center">
                      <span className="font-medium">{item.stock}</span>
                      <span className="text-xs ml-1" style={{ color: colors.textLight }}>units</span>
                    </div>
                  </td>
                  
                  {/* Storage Location */}
                  <td className="px-4 py-3" style={{ color: colors.text }}>
                    {item.storageLocation || 'Main Warehouse'}
                  </td>
                  
                  {/* Stock Status */}
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${getStockStatusColor(item)}`}>
                      {getStockStatusText(item)}
                    </span>
                  </td>
                  
                  {/* Item Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => onView(item.id)}
                        className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        style={{ color: colors.primary }}
                        title="View Details"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => onEdit(item.id)}
                        className="p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                        style={{ color: '#B45309' }}
                        title="Edit Item"
                      >
                        <FontAwesomeIcon icon={faUserPen} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        style={{ color: '#DC2626' }}
                        title="Delete Item"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FontAwesomeIcon 
                      icon={faCube} 
                      className="text-gray-300 mb-2" 
                      size="2x" 
                    />
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      No items found matching your criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;