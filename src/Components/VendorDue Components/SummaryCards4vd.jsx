import React from 'react';

const cards = [
    { title: 'Total Outstanding', amount: '$87,420.00', subtitle: 'Across 32 vendors', color: 'primary' },
    { title: 'Due This Month', amount: '$24,150.00', subtitle: 'From 14 vendors', color: 'accent' },
    { title: 'Overdue Payments', amount: '$12,780.00', subtitle: 'From 8 vendors', color: 'danger' },
    { title: 'Disputed Invoices', amount: '$5,430.00', subtitle: 'From 3 vendors', color: 'warning' },
];

// Tailwind-safe class mapping
const colorClasses = {
    primary: 'border-primary',
    accent: 'border-accent',
    danger: 'border-danger',
    warning: 'border-warning',
};

const SummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {cards.map((card, idx) => (
            <div
                key={idx}
                className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${
                    colorClasses[card.color] || 'border-gray-300'
                }`}
            >
                <h3 className="text-gray-500 font-medium">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{card.amount}</p>
                <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
            </div>
        ))}
    </div>
);

export default SummaryCards;
