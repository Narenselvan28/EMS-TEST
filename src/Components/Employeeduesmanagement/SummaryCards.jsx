import React from 'react';
import clsx from 'clsx'; // Optional: For cleaner conditional classes

const SummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Outstanding" amount="$24,560.00" info="From 45 employees" color="border-indigo-600" />
        <Card title="Cleared This Month" amount="$8,320.00" info="From 12 employees" color="border-red-600" />
        <Card title="Overdue Payments" amount="$5,670.00" info="From 8 employees" color="border-teal-700" />
    </div>
);

const Card = ({ title, amount, info, color }) => (
    <div className={clsx("bg-white p-6 rounded-lg shadow-sm border-l-4", color)}>
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{amount}</p>
        <p className="text-sm text-gray-500 mt-1">{info}</p>
    </div>
);

export default SummaryCards;
