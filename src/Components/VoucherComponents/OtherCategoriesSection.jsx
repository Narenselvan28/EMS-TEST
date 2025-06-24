import React from 'react';

const OtherCategoriesSection = () => {
    return (
        <div id="otherCategoriesSection" className="glass-card p-6 rounded-xl mb-6 section-hidden">
            <h2 className="text-2xl font-semibold mb-4 gradient-text flex items-center">
                <i className="fas fa-info-circle mr-3"></i> General Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="generalAmount" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-hand-holding-usd mr-2"></i> Amount (₹)
                    </label>
                    <input type="number" step="0.01" className="w-full glass-panel focus:ring-2 focus:ring-indigo-200"
                        id="generalAmount" placeholder="Enter Amount" />
                </div>
                <div>
                    <label htmlFor="generalDescription" className="block mb-2 font-medium text-gray-700">
                        <i className="fas fa-comment-dots mr-2"></i> Description
                    </label>
                    <textarea className="w-full glass-panel focus:ring-2 focus:ring-indigo-200" id="generalDescription"
                        placeholder="Enter Description"></textarea>
                </div>
            </div>
        </div>
    );
};

export default OtherCategoriesSection;