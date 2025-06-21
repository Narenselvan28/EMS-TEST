import React, { useState } from 'react';
import EmployeeHeader from './MasterpageComponents/employeeMasterComps/EmployeeHeader';
import EmployeeTable from './MasterpageComponents/employeeMasterComps/EmployeeTable';
import EmployeeFilters from './MasterpageComponents/employeeMasterComps/EmployeeFilters'; // Fixed import path

const EmployeeMaster = () => {
    const [department, setDepartment] = useState('All');
    const [role, setRole] = useState('All');
    const [status, setStatus] = useState('All');
    const [search, setSearch] = useState('');

    const employees = [
        { code: 'EMP-001', name: 'John Doe', dept: 'HR', role: 'Manager', phone: '9876543210', status: 'Active' },
        { code: 'EMP-002', name: 'Jane Smith', dept: 'Sales', role: 'Executive', phone: '8765432109', status: 'Inactive' },
        { code: 'EMP-003', name: 'Arjun Mehta', dept: 'Production', role: 'Intern', phone: '9988776655', status: 'Active' },
        { code: 'EMP-004', name: 'Divya Ramesh', dept: 'Sales', role: 'Executive', phone: '9876523456', status: 'Active' },
        { code: 'EMP-005', name: 'Kiran Rao', dept: 'HR', role: 'Intern', phone: '8765987654', status: 'Inactive' },
        { code: 'EMP-006', name: 'Suresh Babu', dept: 'Production', role: 'Manager', phone: '9988123456', status: 'Active' },
        { code: 'EMP-007', name: 'Meena Kumari', dept: 'HR', role: 'Executive', phone: '9876098765', status: 'Inactive' },
        { code: 'EMP-008', name: 'Rahul Nair', dept: 'Sales', role: 'Manager', phone: '9090909090', status: 'Active' },
        { code: 'EMP-001', name: 'John Doe', dept: 'HR', role: 'Manager', phone: '9876543210', status: 'Active' },
        { code: 'EMP-002', name: 'Jane Smith', dept: 'Sales', role: 'Executive', phone: '8765432109', status: 'Inactive' },
        { code: 'EMP-003', name: 'Arjun Mehta', dept: 'Production', role: 'Intern', phone: '9988776655', status: 'Active' },
        { code: 'EMP-004', name: 'Divya Ramesh', dept: 'Sales', role: 'Executive', phone: '9876523456', status: 'Active' },
        { code: 'EMP-005', name: 'Kiran Rao', dept: 'HR', role: 'Intern', phone: '8765987654', status: 'Inactive' },
        { code: 'EMP-006', name: 'Suresh Babu', dept: 'Production', role: 'Manager', phone: '9988123456', status: 'Active' },
        { code: 'EMP-007', name: 'Meena Kumari', dept: 'HR', role: 'Executive', phone: '9876098765', status: 'Inactive' },
        { code: 'EMP-008', name: 'Rahul Nair', dept: 'Sales', role: 'Manager', phone: '9090909090', status: 'Active' }
    ];

    const filtered = employees.filter(emp => {
        const matchDept = department === 'All' || emp.dept === department;
        const matchRole = role === 'All' || emp.role === role;
        const matchStatus = status === 'All' || emp.status === status;
        const matchSearch =
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.code.toLowerCase().includes(search.toLowerCase());
        return matchDept && matchRole && matchStatus && matchSearch;
    });

    return (
        <div className="min-h-screen p-6 m-2 space-y-6 bg-gray-50 font-poppins">
            <EmployeeHeader />
            <EmployeeFilters
                search={search}
                setSearch={setSearch}
                department={department}
                setDepartment={setDepartment}
                role={role}
                setRole={setRole}
                status={status}
                setStatus={setStatus}
            />
            <EmployeeTable data={filtered} />
        </div>
    );
};

export default EmployeeMaster;