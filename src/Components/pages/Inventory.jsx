import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import ItemPagination from '../mastercomponents/MasterpageComponents/ItemMasterComponents/ItemPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faUserPen, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  CubeIcon,
  ExclamationTriangleIcon,
  ArchiveBoxIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const InventoryDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const stockChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const stockChartInstance = useRef(null);
  const categoryChartInstance = useRef(null);

  const items = [
    {
      location: 'Warehouse A',
      code: 'ITM-1001',
      name: 'Premium Laptop',
      category: 'Electronics',
      stock: 45,
      uom: 'Unit',
      value: '$45,000',
      status: 'In Stock',
      statusColor: 'green',
    },
    {
      location: 'Warehouse B',
      code: 'ITM-2045',
      name: 'Wireless Mouse',
      category: 'Accessories',
      stock: 8,
      uom: 'Unit',
      value: '$320',
      status: 'Low Stock',
      statusColor: 'yellow',
    },
    {
      location: 'Warehouse C',
      code: 'ITM-3056',
      name: 'Office Chair',
      category: 'Furniture',
      stock: 120,
      uom: 'Unit',
      value: '$24,000',
      status: 'Over Stock',
      statusColor: 'red',
    },
    {
      location: 'Warehouse A',
      code: 'ITM-4089',
      name: 'Monitor 27"',
      category: 'Electronics',
      stock: 32,
      uom: 'Unit',
      value: '$12,800',
      status: 'In Stock',
      statusColor: 'green',
    },
    {
      location: 'Warehouse B',
      code: 'ITM-5023',
      name: 'Keyboard',
      category: 'Accessories',
      stock: 5,
      uom: 'Unit',
      value: '$250',
      status: 'Low Stock',
      statusColor: 'yellow',
    },
  ];

  // Filter items based on search term (location or name)
  const filteredItems = items.filter(item => 
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (stockChartInstance.current) stockChartInstance.current.destroy();
    if (categoryChartInstance.current) categoryChartInstance.current.destroy();

    // Doughnut Chart
    stockChartInstance.current = new Chart(stockChartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['In Stock', 'Low Stock', 'Over Stock'],
        datasets: [{
          data: [1178, 42, 28],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
          borderColor: '#fff',
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              boxWidth: 12
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.raw} items`
            }
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw(chart) {
          const { width, height, ctx } = chart;
          const centerX = width / 2;
          const centerY = height / 2;
          ctx.save();
          ctx.font = 'bold 20px Poppins';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#333';
          ctx.fillText('1248', centerX, centerY - 5);
          ctx.font = 'normal 14px Poppins';
          ctx.fillStyle = '#888';
          ctx.fillText('Total Items', centerX, centerY + 18);
          ctx.restore();
        }
      }]
    });

    // Bar Chart
    categoryChartInstance.current = new Chart(categoryChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Electronics', 'Furniture', 'Accessories', 'Office Supplies', 'Software'],
        datasets: [{
          label: 'Inventory Value ($)',
          data: [120000, 75000, 28000, 15000, 10750],
          backgroundColor: function (context) {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, '#3B82F6');
            gradient.addColorStop(1, '#60A5FA');
            return gradient;
          },
          borderRadius: 6,
          barPercentage: 0.6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `$${value.toLocaleString()}`
            },
            grid: {
              color: '#e5e7eb'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: ctx => `$${ctx.raw.toLocaleString()}`
            }
          }
        }
      }
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="m-2 bg-gray-50 min-h-screen font-['Poppins']">
      <div className="container mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Inventory Dashboard</h1>
          <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
            </svg>
            Export
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Items", value: "1,248", icon: <CubeIcon className="h-6 w-6 text-blue-600" />, color: "blue", trend: "+12%" },
            { title: "Low Stock", value: "42", icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />, color: "red", trend: "-5%" },
            { title: "Over Stock", value: "28", icon: <ArchiveBoxIcon className="h-6 w-6 text-yellow-600" />, color: "yellow", trend: "+3%" },
            { title: "Inventory Value", value: "$248,750", icon: <BanknotesIcon className="h-6 w-6 text-green-600" />, color: "green", trend: "+8%" },
          ].map(({ title, value, icon, color, trend }, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
              </div>
              <p className={`text-${color}-500 text-sm mt-2 flex items-center`}>
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {trend} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Status</h3>
            <div className="h-64"><canvas ref={stockChartRef}></canvas></div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Value by Category</h3>
            <div className="h-64"><canvas ref={categoryChartRef}></canvas></div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-4">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by location or item name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg flex items-center"
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search
            </button>
          </form>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Stock Location', 'Item Code', 'Item Name', 'Category', 'Stock', 'UOM', 'Value', 'Status', 'Actions'].map((th, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedItems.map((item, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.uom}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.value}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${item.statusColor}-100 text-${item.statusColor}-800`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 space-x-3">
                      <button className="text-green-600 hover:text-green-800" title="View"><FontAwesomeIcon icon={faEye} /></button>
                      <button className="text-blue-600 hover:text-blue-800" title="Edit"><FontAwesomeIcon icon={faUserPen} /></button>
                      <button className="text-red-600 hover:text-red-800" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <ItemPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            filteredItems={filteredItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;