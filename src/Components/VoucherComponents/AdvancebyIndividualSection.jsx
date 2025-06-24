import React from 'react';

const AdvanceByIndividualSection = () => {
  return (
    <div id="advanceByIndividualSection" className="glass-card p-6 rounded-xl mb-6 section-hidden">
      <h2 className="text-2xl font-semibold mb-4 gradient-text flex items-center">
        <i className="fas fa-user-plus mr-3"></i> Advance by Individual Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Form fields */}
      </div>
      
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr className="table-header rounded-lg">
              <th className="border border-indigo-200 px-4 py-3 text-left rounded-tl-lg">Employee Code</th>
              {/* ... other headers ... */}
            </tr>
          </thead>
          <tbody id="advIndividualTableBody">
            {/* Will be populated dynamically */}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <button className="btn-primary px-6 py-3 rounded-lg text-base">
          <i className="fas fa-save mr-2"></i> Save Advance
        </button>
      </div>
    </div>
  );
};

export default AdvanceByIndividualSection;