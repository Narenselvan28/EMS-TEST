import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ChevronDown, User, Settings, LogOut } from 'lucide-react';

const WebSyraNavbar = ({ userName = 'Admin' }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userInitial = userName.charAt(0).toUpperCase();
    const navigate = useNavigate();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleNavigate = (path) => {
        setIsDropdownOpen(false);
        navigate(path);
    };
    const handleBack = () => navigate(-1);

    return (
        <header className="bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white sticky top-0 z-50 shadow-2xl border-b border-[#312e81] font-poppins">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Left: Back + Branding */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-2 rounded-full bg-[#334155] hover:bg-[#475569] transition duration-200"
                        title="Back"
                    >
                        <ArrowLeft className="w-5 h-5 text-cyan-300" />
                    </button>

                    <div onClick={() => handleNavigate('/')} className="cursor-pointer group">
                        <h1 className="text-2xl font-bold tracking-tight leading-none">
                            <span className="text-cyan-300 group-hover:text-cyan-200 transition">EMS Cocos</span>
                        </h1>
                        <p className="text-sm text-cyan-100 group-hover:text-white transition">Websyra <span className="text-indigo-200">ERP</span></p>
                    </div>
                </div>

                {/* Right: User Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-2 pr-2"
                        title={`Welcome, ${userName}`}
                    >
                        <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-sky-500 text-white rounded-full flex items-center justify-center text-lg font-semibold ring-2 ring-cyan-300">
                            {userInitial}
                        </div>
                        <span className="hidden sm:inline text-cyan-100 font-medium">
                            Welcome, <span className="text-white font-semibold">{userName}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-cyan-200 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 ring-1 ring-cyan-200 z-50">
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNavigate('/profile'); }}
                                className="flex items-center px-4 py-2 text-sm hover:bg-cyan-50 hover:text-cyan-700"
                            >
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </a>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNavigate('/settings'); }}
                                className="flex items-center px-4 py-2 text-sm hover:bg-cyan-50 hover:text-cyan-700"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </a>
                            <div className="border-t border-gray-100 my-1"></div>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleNavigate('/logout'); }}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign out
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default WebSyraNavbar;
