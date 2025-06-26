import React, { useState } from 'react';
import ConfirmModel from '../../essentials/ConfirmModel';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaPlusCircle, FaSave, FaTimes, FaGasPump, FaCar, FaFileInvoiceDollar, FaHistory, FaTachometerAlt, FaUserTie, FaStore, FaWeight, FaTag, FaCalculator, FaRoad, FaDrum, FaTable, FaHashtag, FaIdCard, FaBuilding, FaDollarSign, FaMoneyBillWave, FaCarSide, FaTruckMoving, FaUser, FaBell } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";


const FuelExpensesForm = () => {
    const [formData, setFormData] = useState({
        barrelCheckbox: false,
        vehicleNumber: '',
        driverName: '',
        vendorName: '',
        fuelQty: '',
        fuelRate: '',
        totalAmount: '',
        currentKM: ''
    });

    const [additionalVehicles, setAdditionalVehicles] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [vehicleToRemove, setVehicleToRemove] = useState(null);
    const [notification, setNotification] = useState(null);
    const [showAddVehicleInfo, setShowAddVehicleInfo] = useState(false);
    const [showRecentInfo, setShowRecentInfo] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'fuelQty' || name === 'fuelRate') {
            calculateTotal(name, value);
        }
    };

    const calculateTotal = (name, value) => {
        const qty = name === 'fuelQty' ? parseFloat(value) || 0 : parseFloat(formData.fuelQty) || 0;
        const rate = name === 'fuelRate' ? parseFloat(value) || 0 : parseFloat(formData.fuelRate) || 0;
        setFormData(prev => ({
            ...prev,
            totalAmount: (qty * rate).toFixed(2)
        }));
    };

    const addVehicle = () => {
        setAdditionalVehicles(prev => [
            ...prev,
            {
                id: Date.now(),
                vehicleNumber: '',
                driverName: '',
                fuelQty: '',
                fuelAmount: '',
                currentKM: ''
            }
        ]);
    };

    const handleAdditionalVehicleChange = (id, e) => {
        const { name, value } = e.target;
        setAdditionalVehicles(prev =>
            prev.map(vehicle =>
                vehicle.id === id ? { ...vehicle, [name]: value } : vehicle
            )
        );
    };

    const confirmRemoveVehicle = (id) => {
        setVehicleToRemove(id);
        setShowConfirm(true);
    };

    const removeVehicle = () => {
        setAdditionalVehicles(prev => prev.filter(vehicle => vehicle.id !== vehicleToRemove));
        setShowConfirm(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log({ mainForm: formData, additionalVehicles });

        // Show success notification
        setNotification({
            message: 'Fuel transaction saved successfully!',
            type: 'success'
        });

        setTimeout(() => setNotification(null), 3000);
    };

    const handleReset = () => {
        setFormData({
            barrelCheckbox: false,
            vehicleNumber: '',
            driverName: '',
            vendorName: '',
            fuelQty: '',
            fuelRate: '',
            totalAmount: '',
            currentKM: ''
        });
        setAdditionalVehicles([]);
    };
    function handleback() {
        window.history.back()

    }

    return (
        <div className="min-h-screen flex flex-col font-poppins bg-gray-50">


            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-6">

                {/* Page Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-dark gap-4 flex items-center">
                        <p className='text-4xl cursor-pointer' onClick={handleback}><IoArrowBack /></p>

                        New Fuel Transaction<FaFileInvoiceDollar className="mr-3 text-primary" />
                    </h2>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center">
                        <FaHistory className="mr-2" /> View History
                    </button>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
                        <h3 className="text-lg font-semibold flex items-center">
                            <FaCar className="mr-2" /> Primary Vehicle Information
                        </h3>
                    </div>

                    <form id="mainForm" className="p-6" onSubmit={handleSubmit} onReset={handleReset}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Barrel Checkbox */}
                            <div className="flex items-center col-span-full">
                                <input
                                    type="checkbox"
                                    id="barrelCheckbox"
                                    name="barrelCheckbox"
                                    checked={formData.barrelCheckbox}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                                />
                                <label htmlFor="barrelCheckbox" className="ml-2 text-gray-700 font-medium flex items-center">
                                    <FaDrum className="mr-2 text-secondary" /> Filled with Barrel
                                </label>
                            </div>

                            {/* Vehicle Number */}
                            <div className="space-y-1">
                                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 flex items-center">
                                    <FaTruckMoving className="mr-2 text-primary" /> Vehicle Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaHashtag className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="vehicleNumber"
                                        name="vehicleNumber"
                                        value={formData.vehicleNumber}
                                        onChange={handleChange}
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Driver Name */}
                            <div className="space-y-1">
                                <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 flex items-center">
                                    <FaUserTie className="mr-2 text-primary" /> Driver Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaIdCard className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="driverName"
                                        name="driverName"
                                        value={formData.driverName}
                                        onChange={handleChange}
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Vendor Name */}
                            <div className="space-y-1">
                                <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 flex items-center">
                                    <FaStore className="mr-2 text-primary" /> Vendor Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaBuilding className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="vendorName"
                                        name="vendorName"
                                        value={formData.vendorName}
                                        onChange={handleChange}
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Fuel Qty */}
                            <div className="space-y-1">
                                <label htmlFor="fuelQty" className="block text-sm font-medium text-gray-700 flex items-center">
                                    <FaGasPump className="mr-2 text-primary" /> Fuel Quantity (Liters)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaWeight className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="fuelQty"
                                        name="fuelQty"
                                        value={formData.fuelQty}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>

                            {/* Fuel Rate */}
                            <div className="space-y-1">
                                <label htmlFor="fuelRate" className="block text-sm font-medium text-gray-700 flex items-center">
                                    <FaTag className="mr-2 text-primary" /> Fuel Rate (per Liter)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaDollarSign className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="fuelRate"
                                        name="fuelRate"
                                        value={formData.fuelRate}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>

                            {/* Total Fuel Amount */}
                            <div className="space-y-1">
                                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 flex items-center">
                                    <FaCalculator className="mr-2 text-primary" /> Total Fuel Amount
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaMoneyBillWave className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="totalAmount"
                                        name="totalAmount"
                                        value={formData.totalAmount}
                                        readOnly
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>

                            {/* Current KM */}
                            <div className="space-y-1">
                                <label htmlFor="currentKM" className="block text-sm font-medium text-gray-700 flex items-center">
                                    <FaTachometerAlt className="mr-2 text-primary" /> Current KM
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaRoad className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="currentKM"
                                        name="currentKM"
                                        value={formData.currentKM}
                                        onChange={handleChange}
                                        step="0.01"
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add More Vehicle Section */}
                        {formData.barrelCheckbox && (
                            <div className="mt-8 border-t pt-6">
                                <div className="mb-4">
                                    {additionalVehicles.map((vehicle, index) => (
                                        <div key={vehicle.id} className="vehicle-form mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200 relative">
                                            <button
                                                type="button"
                                                onClick={() => confirmRemoveVehicle(vehicle.id)}
                                                className="absolute top-3 right-3 text-red-500 hover:text-red-700 remove-vehicle flex items-center text-sm"
                                            >
                                                <p className='text-2xl'><IoMdCloseCircle /></p>

                                            </button>
                                            <h3 className="text-lg font-semibold text-dark flex items-center mb-4">
                                                <FaCarSide className="mr-2 text-secondary" /> Additional Vehicle {index + 1}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {/* Vehicle Number */}
                                                <div className="space-y-1">
                                                    <label htmlFor={`vehicleNumber${vehicle.id}`} className="block text-sm font-medium text-gray-700 flex items-center">
                                                        <FaTruckMoving className="mr-2 text-primary" /> Vehicle Number
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaHashtag className="text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id={`vehicleNumber${vehicle.id}`}
                                                            name="vehicleNumber"
                                                            value={vehicle.vehicleNumber}
                                                            onChange={(e) => handleAdditionalVehicleChange(vehicle.id, e)}
                                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Driver Name */}
                                                <div className="space-y-1">
                                                    <label htmlFor={`driverName${vehicle.id}`} className="block text-sm font-medium text-gray-700 flex items-center">
                                                        <FaUserTie className="mr-2 text-primary" /> Driver Name
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaIdCard className="text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            id={`driverName${vehicle.id}`}
                                                            name="driverName"
                                                            value={vehicle.driverName}
                                                            onChange={(e) => handleAdditionalVehicleChange(vehicle.id, e)}
                                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Fuel Qty */}
                                                <div className="space-y-1">
                                                    <label htmlFor={`fuelQty${vehicle.id}`} className="block text-sm font-medium text-gray-700 flex items-center">
                                                        <FaGasPump className="mr-2 text-primary" /> Fuel Quantity (Liters)
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaWeight className="text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="number"
                                                            id={`fuelQty${vehicle.id}`}
                                                            name="fuelQty"
                                                            value={vehicle.fuelQty}
                                                            onChange={(e) => handleAdditionalVehicleChange(vehicle.id, e)}
                                                            step="0.01"
                                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Fuel Amount */}
                                                <div className="space-y-1">
                                                    <label htmlFor={`fuelAmount${vehicle.id}`} className="block text-sm font-medium text-gray-700 flex items-center">
                                                        <FaMoneyBillWave className="mr-2 text-primary" /> Fuel Amount
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaDollarSign className="text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="number"
                                                            id={`fuelAmount${vehicle.id}`}
                                                            name="fuelAmount"
                                                            value={vehicle.fuelAmount}
                                                            onChange={(e) => handleAdditionalVehicleChange(vehicle.id, e)}
                                                            step="0.01"
                                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Current KM */}
                                                <div className="space-y-1">
                                                    <label htmlFor={`currentKM${vehicle.id}`} className="block text-sm font-medium text-gray-700 flex items-center">
                                                        <FaTachometerAlt className="mr-2 text-primary" /> Current KM
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <FaRoad className="text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="number"
                                                            id={`currentKM${vehicle.id}`}
                                                            name="currentKM"
                                                            value={vehicle.currentKM}
                                                            onChange={(e) => handleAdditionalVehicleChange(vehicle.id, e)}
                                                            step="0.01"
                                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={addVehicle}
                                        className="px-4 py-2 gap-2 bg-primary hover:bg-secondary text-white rounded-lg flex items-center transition-colors"
                                        onMouseEnter={() => setShowAddVehicleInfo(true)}
                                        onMouseLeave={() => setShowAddVehicleInfo(false)}
                                    >
                                        <FaPlusCircle /> Add Vehicle
                                        <BsFillInfoCircleFill className="opacity-70 hover:opacity-100 transition-opacity" />
                                    </button>
                                    {showAddVehicleInfo && (
                                        <div className="absolute left-0 mt-2 w-64 bg-white p-2 rounded shadow-lg z-10 text-sm text-gray-600">
                                            Click to add another vehicle to this transaction
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="mt-8 flex justify-end space-x-4">
                            <button type="reset" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                                <FaTimes className="mr-2" /> Cancel
                            </button>
                            <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity flex items-center shadow-md">
                                <FaSave className="mr-2" /> Save Transaction
                            </button>
                        </div>
                    </form>
                </div>

                {/* Reference Table Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="bg-gradient-to-r flex items-center justify-between from-primary to-secondary p-4 text-white">
                        <h3 className="text-lg gap-2 font-semibold flex items-center">
                            <FaTable className="mr-2 group-hover:rotate-12 transition-transform" /> Recent Fuel Transactions
                        </h3>
                        <div className="relative">
                            <BsFillInfoCircleFill
                                className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                                onMouseEnter={() => setShowRecentInfo(true)}
                                onMouseLeave={() => setShowRecentInfo(false)}
                            />
                            {showRecentInfo && (
                                <div className="absolute right-0 mt-2 w-64 bg-white p-2 rounded shadow-lg z-10 text-sm text-gray-600">
                                    View your recent fuel transactions history
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaHashtag className="inline mr-1" /> Vehicle #
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaUserTie className="inline mr-1" /> Driver
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaStore className="inline mr-1" /> Vendor
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaGasPump className="inline mr-1" /> Qty (L)
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaTag className="inline mr-1" /> Rate
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaCalculator className="inline mr-1" /> Total
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaRoad className="inline mr-1" /> KM
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <FaDrum className="inline mr-1" /> Barrel
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <i className="fas fa-calendar-alt mr-1"></i> Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Sample Data Row 1 */}
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        MH-12-AB-1234
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Rajesh Kumar
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Bharat Petroleum
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        35.50
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        96.20
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ₹3,415.10
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        12,450
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <i className="fas fa-check text-green-500"></i>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        15 Jun 2023
                                    </td>
                                </tr>

                                {/* Sample Data Row 2 */}
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        DL-01-CD-5678
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Mohan Singh
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Indian Oil
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        42.00
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        95.80
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ₹4,023.60
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        8,720
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <i className="fas fa-times text-red-500"></i>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        14 Jun 2023
                                    </td>
                                </tr>

                                {/* Sample Data Row 3 */}
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        KA-05-EF-9012
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Suresh Patel
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Shell India
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        28.75
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        97.50
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ₹2,803.13
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        15,230
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <i className="fas fa-check text-green-500"></i>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        13 Jun 2023
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Confirmation Modal */}
            <ConfirmModel
                isOpen={showConfirm}
                title="Confirm Removal"
                message="Are you sure you want to remove this vehicle from the transaction?"
                onConfirm={removeVehicle}
                onCancel={() => setShowConfirm(false)}
            />

            {/* Notification */}
            {notification && (
                <div className="fixed top-4 right-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg flex items-center animate-fade-in z-50">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span>{notification.message}</span>
                </div>
            )}
        </div>
    );
};

export default FuelExpensesForm;