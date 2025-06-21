import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ForwardLoading from '../../essentials/ForwardLoading'; // adjust path if needed

function MastersPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNavigate = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 1200);
    };

    const masterOptions = [
        { label: "Item Master", path: "/masters/item" },
        { label: "Party Master", path: "/masters/party" },
{ label: "Employee Master", path: "/masters/employee" }    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex items-center justify-center px-4">
            {loading ? (
                <ForwardLoading />
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                        Master Modules
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {masterOptions.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleNavigate(option.path)}
                                className="cursor-pointer p-5 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-all duration-200 text-center text-indigo-700 font-medium shadow-sm hover:shadow-md"
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MastersPage;
