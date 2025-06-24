import React, { useState } from "react";

export default function VehicleMasterForm() {
    const [formData, setFormData] = useState({
        vehicleCode: "",
        vehicleNo: "",
        vehicleModel: "",
        manufacturer: "",
        manufacturingYear: "",
        vehicleType: "",
        fuelType: "",
        color: "",
        vehicleCapacity: "",
        engineNumber: "",
        chassisNumber: "",
        currentOdometerReading: "",
        purchaseDate: "",
        purchasePrice: "",
        vehicleStatus: "",
        insuranceProvider: "",
        insurancePolicyNo: "",
        insuranceStartDate: "",
        insuranceEndDate: "",
        nextFcDate: "",
        pollutionCertDate: "",
        assignedDriver: "",
        otherDetails: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        alert("Vehicle Details Submitted Successfully");
        setFormData({
            vehicleCode: "",
            vehicleNo: "",
            vehicleModel: "",
            manufacturer: "",
            manufacturingYear: "",
            vehicleType: "",
            fuelType: "",
            color: "",
            vehicleCapacity: "",
            engineNumber: "",
            chassisNumber: "",
            currentOdometerReading: "",
            purchaseDate: "",
            purchasePrice: "",
            vehicleStatus: "",
            insuranceProvider: "",
            insurancePolicyNo: "",
            insuranceStartDate: "",
            insuranceEndDate: "",
            nextFcDate: "",
            pollutionCertDate: "",
            assignedDriver: "",
            otherDetails: "",
        });
    };

    return (
        <div className="mt-10"> <div className="max-w-6xl mx-auto">

            {/* Back Button and Heading */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="mr-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-dark">Add New Vehicle</h2>

            </div>                 <p className="text-gray-600 mb-6">Fill in the Vehicle details below</p>
            <div className="max-w-6xl mt-10 mx-auto p-6 bg-white rounded-xl shadow-md">


                {/* Description */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { id: "vehicleCode", label: "Vehicle Code", required: true },
                        { id: "vehicleNo", label: "Vehicle Number", required: true },
                        { id: "vehicleModel", label: "Vehicle Model", required: true },
                        { id: "manufacturer", label: "Manufacturer" },
                        { id: "manufacturingYear", label: "Manufacturing Year", type: "number" },
                        { id: "vehicleType", label: "Vehicle Type", type: "select", options: ["Car", "Truck", "Bus", "Motorcycle", "Van", "Other"] },
                        { id: "fuelType", label: "Fuel Type", type: "select", options: ["Petrol", "Diesel", "Electric", "CNG", "LPG"] },
                        { id: "color", label: "Color" },
                        { id: "vehicleCapacity", label: "Vehicle Capacity" },
                        { id: "engineNumber", label: "Engine Number" },
                        { id: "chassisNumber", label: "Chassis Number" },
                        { id: "currentOdometerReading", label: "Odometer Reading", type: "number" },
                        { id: "purchaseDate", label: "Purchase Date", type: "date" },
                        { id: "purchasePrice", label: "Purchase Price (₹)", type: "number" },
                        { id: "vehicleStatus", label: "Vehicle Status", type: "select", options: ["Active", "Inactive", "Under Maintenance", "Sold"] },
                        { id: "insuranceProvider", label: "Insurance Provider" },
                        { id: "insurancePolicyNo", label: "Insurance Policy No." },
                        { id: "insuranceStartDate", label: "Insurance Start Date", type: "date" },
                        { id: "insuranceEndDate", label: "Insurance End Date", type: "date" },
                        { id: "nextFcDate", label: "Next FC Date", type: "date" },
                        { id: "pollutionCertDate", label: "Pollution Cert. Date", type: "date" },
                        { id: "assignedDriver", label: "Assigned Driver" },
                    ].map(({ id, label, type = "text", required, options }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>
                            {type === "select" ? (
                                <select
                                    id={id}
                                    name={id}
                                    value={formData[id]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                >
                                    <option value="">Select {label}</option>
                                    {options.map((opt) => (
                                        <option key={opt} value={opt.toLowerCase()}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    id={id}
                                    name={id}
                                    value={formData[id]}
                                    onChange={handleChange}
                                    required={required}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                />
                            )}
                        </div>
                    ))}

                    <div className="md:col-span-2">
                        <label htmlFor="otherDetails" className="block text-sm font-medium text-gray-700 mb-1">
                            Other Details / Notes
                        </label>
                        <textarea
                            id="otherDetails"
                            name="otherDetails"
                            rows="4"
                            value={formData.otherDetails}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        ></textarea>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-4">
                        <button
                            type="reset"
                            onClick={() => setFormData({ ...formData, ...Object.fromEntries(Object.keys(formData).map(k => [k, ""])) })}
                            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div></div>
        // Corrected: removed the extra ')' here
    );
}   