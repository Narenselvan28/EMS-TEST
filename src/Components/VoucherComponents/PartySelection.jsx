import React from 'react';

const PartySection = () => {
    return (
        <div id="partySection" className="glass-card p-6 rounded-xl mb-6 section-hidden">
            <h2 className="text-2xl font-semibold mb-4 gradient-text flex items-center">
                <i className="fas fa-handshake mr-3"></i> Party Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Party form fields */}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <i className="fas fa-file-invoice-dollar mr-2"></i> Existing Dues
            </h3>
            <div className="overflow-x-auto rounded-lg shadow-lg mb-6">
                <table className="table-auto border-collapse w-full text-sm">
                    <thead>
                        <tr className="table-header">
                            <th className="border border-indigo-200 px-4 py-3 text-center rounded-tl-lg">Select</th>
                            {/* ... other headers ... */}
                        </tr>
                    </thead>
                    <tbody id="existingDuesTableBody">
                        {/* Static example rows */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartySection;