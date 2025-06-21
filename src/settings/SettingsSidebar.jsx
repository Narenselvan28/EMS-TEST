const SettingsSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">ERP Settings</h2>
            </div>
            <nav className="p-4">
                <ul className="space-y-2">
                    {[
                        { id: 'mapping', label: 'Mapping Options' },
                        { id: 'general', label: 'General Settings' },
                        { id: 'users', label: 'User Management' },
                        { id: 'license', label: 'License Management' }
                    ].map((tab) => (
                        <li key={tab.id}>
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-4 py-2 rounded-md transition-all duration-300 ${
                                    activeTab === tab.id 
                                        ? 'bg-blue-100 text-blue-600' 
                                        : 'text-gray-700 hover:bg-gray-100 hover:pl-6'
                                }`}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SettingsSidebar;