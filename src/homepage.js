import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNavigate = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 1000); // 1s delay to show loader
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
            {loading ? (
                <div className="h-10 w-10 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
            ) : (
                <ul className="space-y-4 text-lg">
                    <li
                        onClick={() => handleNavigate('/purchase&sales')}
                        className="text-indigo-600 cursor-pointer hover:underline"
                    >
                        Purchase & Sales
                    </li>
                    <li
                        onClick={() => handleNavigate('/PartyDues')}
                        className="text-indigo-600 cursor-pointer hover:underline"
                    >
                        Party Dues
                    </li>
                    <li
                        onClick={() => handleNavigate('/employeeduesmanagements')}
                        className="text-indigo-600 cursor-pointer hover:underline"
                    >
                        Employee Dues Management
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Homepage;
            