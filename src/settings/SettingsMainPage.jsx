import { useState, useEffect } from 'react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('mapping');
    const [isLoading, setIsLoading] = useState(false);

    // Mock data for users
    const [users, setUsers] = useState([
        { id: 1, username: 'admin', password: 'admin123', showPassword: false },
        { id: 2, username: 'manager', password: 'manager123', showPassword: false },
        { id: 3, username: 'employee', password: 'employee123', showPassword: false },
    ]);

    // Default company profile with address
    const [companyProfile, setCompanyProfile] = useState({
        companyName: 'Acme Corporation',
        contactNumber: '+1 (555) 123-4567',
        addressLine1: '123 Business Park Ave',
        addressLine2: 'Suite 450',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
        eSignature: '',
        accountantName: 'John Smith',
        accountNumber: '1234567890',
        bankName: 'Global Bank',
        branch: 'Manhattan',
        ifscCode: 'GBANKUS123'
    });

    const [adminPassword, setAdminPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [mappingOptions, setMappingOptions] = useState({
        employeeCategory: '',
        employeeGroup: ''
    });

    const [isEditingCompany, setIsEditingCompany] = useState(false);

    useEffect(() => {
        // Simulate loading data
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, [activeTab]);

    const handleCompanyProfileChange = (e) => {
        const { name, value } = e.target;
        setCompanyProfile(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (userId) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, showPassword: !user.showPassword }
                : user
        ));
    };

    const handleAdminPasswordChange = (e) => {
        const { name, value } = e.target;
        setAdminPassword(prev => ({ ...prev, [name]: value }));
    };

    const handleMappingChange = (e) => {
        const { name, value } = e.target;
        setMappingOptions(prev => ({ ...prev, [name]: value }));
    };

    const saveCompanyProfile = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsEditingCompany(false);
        }, 800);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">ERP Settings</h2>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setActiveTab('mapping')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'mapping' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:pl-6'}`}
                            >
                                Mapping Options
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'general' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:pl-6'}`}
                            >
                                General Settings
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'users' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:pl-6'}`}
                            >
                                User Management
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('license')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-all duration-300 ${activeTab === 'license' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:pl-6'}`}
                            >
                                License Management
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {activeTab === 'mapping' && <MappingTab mappingOptions={mappingOptions} handleChange={handleMappingChange} />}
                        {activeTab === 'general' && <GeneralSettingsTab
                            companyProfile={companyProfile}
                            handleChange={handleCompanyProfileChange}
                            isEditing={isEditingCompany}
                            onEditToggle={() => setIsEditingCompany(!isEditingCompany)}
                            onSave={saveCompanyProfile}
                        />}
                        {activeTab === 'users' && <UserManagementTab
                            users={users}
                            togglePasswordVisibility={togglePasswordVisibility}
                            adminPassword={adminPassword}
                            handleAdminPasswordChange={handleAdminPasswordChange}
                        />}
                        {activeTab === 'license' && <LicenseManagementTab />}
                    </>
                )}
            </div>
        </div>
    );
};

// Loader Component with enhanced animation
const Loader = () => {
    return (
        <div className="flex space-x-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
    );
};

// Mapping Tab Component
const MappingTab = ({ mappingOptions, handleChange }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Mapping Options</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-semibold mb-4">Employee Categories & Groups</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category</label>
                        <select
                            name="employeeCategory"
                            value={mappingOptions.employeeCategory}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                            <option value="">Select Category</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="temporary">Temporary</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee Group</label>
                        <select
                            name="employeeGroup"
                            value={mappingOptions.employeeGroup}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                            <option value="">Select Group</option>
                            <option value="management">Management</option>
                            <option value="operations">Operations</option>
                            <option value="sales">Sales</option>
                            <option value="support">Support</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-md font-medium mb-3">Mapping Flowchart</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex flex-col items-center">
                            {/* Modern Flowchart */}
                            <div className="w-full max-w-2xl">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg font-medium shadow-sm transition-all duration-300 hover:shadow-md">
                                        Employee Data
                                    </div>
                                </div>

                                <div className="flex justify-center mb-2">
                                    <svg className="h-6 w-6 text-gray-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div className="flex justify-around mb-4">
                                    <div className="bg-purple-100 text-purple-800 px-4 py-3 rounded-lg font-medium shadow-sm transition-all duration-300 hover:shadow-md">
                                        Category Mapping
                                    </div>
                                    <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg font-medium shadow-sm transition-all duration-300 hover:shadow-md">
                                        Group Mapping
                                    </div>
                                </div>

                                <div className="flex justify-center mb-2">
                                    <svg className="h-6 w-6 text-gray-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div className="flex justify-center">
                                    <div className="bg-indigo-100 text-indigo-800 px-4 py-3 rounded-lg font-medium shadow-sm transition-all duration-300 hover:shadow-md">
                                        ERP System Integration
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// General Settings Tab Component
const GeneralSettingsTab = ({ companyProfile, handleChange, isEditing, onEditToggle, onSave }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">General Settings</h2>
                {!isEditing ? (
                    <button
                        onClick={onEditToggle}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 transform"
                    >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit Company Profile
                    </button>
                ) : (
                    <div className="space-x-3">
                        <button
                            onClick={onEditToggle}
                            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 hover:scale-105 transform"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 transform"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-semibold mb-6">Company Profile</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={companyProfile.companyName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={companyProfile.contactNumber}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                    <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <button
                            type="button"
                            disabled={!isEditing}
                            className={`ml-5 py-2 px-3 border rounded-md shadow-sm text-sm leading-4 font-medium ${isEditing ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' : 'bg-gray-100 border-gray-200 text-gray-400'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200`}
                        >
                            Change
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-md font-medium mb-3">Billing Address</h4>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={companyProfile.addressLine1}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={companyProfile.addressLine2}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={companyProfile.city}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={companyProfile.state}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={companyProfile.postalCode}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={companyProfile.country}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-md font-medium mb-3">E-Signature</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload E-Signature</label>
                        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isEditing ? 'border-gray-300 border-dashed' : 'border-gray-200'} rounded-md`}>
                            <div className="space-y-1 text-center">
                                <svg
                                    className={`mx-auto h-12 w-12 ${isEditing ? 'text-gray-400' : 'text-gray-300'}`}
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className={`relative cursor-pointer rounded-md font-medium ${isEditing ? 'text-blue-600 hover:text-blue-500' : 'text-gray-400'}`}
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" disabled={!isEditing} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-md font-medium mb-3">Bank Account Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Accountant Name</label>
                            <input
                                type="text"
                                name="accountantName"
                                value={companyProfile.accountantName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={companyProfile.accountNumber}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                            <input
                                type="text"
                                name="bankName"
                                value={companyProfile.bankName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                            <input
                                type="text"
                                name="branch"
                                value={companyProfile.branch}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                            <input
                                type="text"
                                name="ifscCode"
                                value={companyProfile.ifscCode}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border ${isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// User Management Tab Component
const UserManagementTab = ({ users, togglePasswordVisibility, adminPassword, handleAdminPasswordChange }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-semibold mb-6">Change Admin Password</h3>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="currentPassword"
                                value={adminPassword.currentPassword}
                                onChange={handleAdminPasswordChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="newPassword"
                                value={adminPassword.newPassword}
                                onChange={handleAdminPasswordChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={adminPassword.confirmPassword}
                                onChange={handleAdminPasswordChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 transform"
                        >
                            Update Password
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-semibold mb-6">User Accounts</h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Password
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            {user.showPassword ? user.password : '••••••••'}
                                            <button
                                                onClick={() => togglePasswordVisibility(user.id)}
                                                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                            >
                                                {user.showPassword ? (
                                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">Reset Password</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 transform"
                    >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New User
                    </button>
                </div>
            </div>
        </div>
    );
};

// License Management Tab Component
const LicenseManagementTab = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">License Management</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Current License</h3>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 transition-all duration-300 hover:shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-blue-800">Enterprise Edition</h4>
                                    <p className="text-sm text-blue-600 mt-1">License valid until: December 31, 2025</p>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Active
                                </span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-blue-500">Users</p>
                                    <p className="font-medium text-blue-800">Unlimited</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-500">Modules</p>
                                    <p className="font-medium text-blue-800">All</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-500">Support</p>
                                    <p className="font-medium text-blue-800">24/7 Premium</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-500">Version</p>
                                    <p className="font-medium text-blue-800">v5.2.1</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-md font-medium mb-3">License Key</h4>
                            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <code className="text-sm font-mono text-gray-700">XXXX-XXXX-XXXX-XXXX-XXXX</code>
                                    <button className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Renew or Upgrade</h3>

                        <div className="space-y-4">
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all duration-300 hover:shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-800">Enterprise Edition</h4>
                                        <p className="text-sm text-gray-600 mt-1">All features included</p>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Current
                                    </span>
                                </div>
                                <div className="mt-3 flex items-baseline">
                                    <span className="text-2xl font-bold text-gray-900">$499</span>
                                    <span className="ml-1 text-sm font-medium text-gray-500">/month</span>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all duration-300 hover:shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-800">Professional Edition</h4>
                                        <p className="text-sm text-gray-600 mt-1">Most features included</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-baseline">
                                    <span className="text-2xl font-bold text-gray-900">$299</span>
                                    <span className="ml-1 text-sm font-medium text-gray-500">/month</span>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all duration-300 hover:shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-800">Basic Edition</h4>
                                        <p className="text-sm text-gray-600 mt-1">Essential features only</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-baseline">
                                    <span className="text-2xl font-bold text-gray-900">$149</span>
                                    <span className="ml-1 text-sm font-medium text-gray-500">/month</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  transition-all duration-300 hover:scale-105 transform"
                            >
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;