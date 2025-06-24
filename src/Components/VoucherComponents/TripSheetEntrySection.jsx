import React from 'react';

const TripsheetEntrySection = () => {
    return (
        <div id="tripsheetEntrySection" className="section-hidden glass-panel p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <i className="fas fa-clipboard-list mr-2"></i> Tripsheet Entries
            </h3>
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table-auto border-collapse w-full text-sm">
                    <thead>
                        <tr className="table-header">
                            <th className="border border-indigo-200 px-4 py-3 text-center rounded-tl-lg">Close Voucher</th>
                            {/* ... other headers ... */}
                        </tr>
                    </thead>
                    <tbody id="tripsheetTableBody">
                        {/* Will be populated dynamically */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripsheetEntrySection;