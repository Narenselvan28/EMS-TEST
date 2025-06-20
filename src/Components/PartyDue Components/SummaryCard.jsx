import React from 'react';

const SummaryCard = ({ title, amount, icon, borderColor, bgColor, textColor,desc }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${borderColor}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-base font-medium text-gray-500 ">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 text-dark mt-1">{amount}</p>
                    <p className="text-sm font-medium text-gray-600 mt-1 ">{desc}</p>

                    
                </div>
                <div className={`${bgColor} p-3 rounded-full`}>
                    {React.cloneElement(icon, { className: `h-6 w-6 ${textColor}` })}
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;