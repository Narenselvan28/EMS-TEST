import React from 'react';

const SalaryForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white card p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <selectInput label="Emp Category" name="empCategory" options={['Driver', 'Helper', 'Supervisor']} onChange={handleChange} value={formData.empCategory} />
                <selectInput label="Employee Type" name="empType" options={['Permanent', 'Contract', 'Temporary']} onChange={handleChange} value={formData.empType} />
                <div>
                    <label className="block mb-2 text-sm font-medium">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <selectInput label="Employee Category" name="empCat" options={['Regular', 'Daily Wage']} onChange={handleChange} value={formData.empCat} />
                <selectInput label="Emp Group" name="group" options={['Group A', 'Group B']} onChange={handleChange} value={formData.group} />
                <selectInput label="Party Name" name="party" options={['Party 1', 'Party 2']} onChange={handleChange} value={formData.party} />
                <inputField label="Work Location" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                <inputField label="Rate per Day" name="rate" placeholder="0.00" type="number" value={formData.rate} onChange={handleChange} />
            </div>
        </div>
    );
};

const selectInput = ({ label, name, options, onChange, value }) => (
    <div>
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <select className="w-full p-2 border rounded" name={name} onChange={onChange} value={value}>
            <option value="">Select</option>
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </div>
);

const inputField = ({ label, name, placeholder, type = 'text', value, onChange }) => (
    <div>
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" placeholder={placeholder} />
    </div>
);

export default SalaryForm;
