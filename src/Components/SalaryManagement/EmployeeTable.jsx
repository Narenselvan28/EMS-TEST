import React from 'react';

const EmployeeTable = ({ title, rate, employees, setEmployees }) => {
    const handleChange = (idx, value) => {
        const updated = [...employees];
        updated[idx].days = value;
        setEmployees(updated);
    };

    return (
        <div className="bg-white card p-4">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-2">Emp Code</th>
                            <th className="p-2">Emp Name</th>
                            <th className="p-2">Rate</th>
                            <th className="p-2">Days</th>
                            <th className="p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="p-2">{emp.code}</td>
                                <td className="p-2">{emp.name}</td>
                                <td className="p-2">{rate}</td>
                                <td className="p-2">
                                    <input
                                        type="number"
                                        value={emp.days}
                                        onChange={(e) => handleChange(idx, e.target.value)}
                                        className="w-full p-1 border rounded"
                                    />
                                </td>
                                <td className="p-2">{(rate * emp.days).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
