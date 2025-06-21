import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDatabase,
  faBoxOpen,
  faTags,
  faLayerGroup,
  faBarcode,
  faEye,
  faStopwatch,
  faIndianRupeeSign,
  faUserPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const ItemTable = ({
  items,
  onView,
  onEdit,
  onDelete,
  currentPage,
  itemsPerPage,
}) => {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden w-full">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {[
                { icon: faDatabase, label: 'ID' },
                { icon: faBoxOpen, label: 'Item Name' },
                { icon: faLayerGroup, label: 'Category' },
                { icon: faTags, label: 'Sub-Category' },
                { icon: faBarcode, label: 'SKU' },
                { icon: faIndianRupeeSign, label: 'Price' },
                { label: 'Stock' },
                { icon: faStopwatch, label: 'Status' },
                { label: 'Actions' },
              ].map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider ${
                    col.label === 'Actions' ? 'text-center' : ''
                  }`}
                >
                  {col.icon && <FontAwesomeIcon icon={col.icon} className="mr-1" />}
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 font-medium">{item.id}</td>
                  <td className="px-4 py-3 text-gray-700">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600">{item.category}</td>
                  <td className="px-4 py-3 text-gray-600">{item.subCategory}</td>
                  <td className="px-4 py-3 text-gray-600">{item.sku}</td>
                  <td className="px-4 py-3 text-gray-600">₹{item.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        item.stock > 0 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.stock} in stock
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => onView(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => onEdit(item.id)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faUserPen} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                  No items found matching your criteria.
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
