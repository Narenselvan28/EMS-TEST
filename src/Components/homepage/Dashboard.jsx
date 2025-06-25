import React from 'react';

const ERPDashboard = () => {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 p-4">
            {/* Main Content */}
            <main className="p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {[
                        { title: 'Total Revenue', value: '$24,580', trend: '↑ 12% vs last month', color: 'green', iconColor: 'indigo', icon: '💰' },
                        { title: 'Pending Orders', value: '56', trend: '↓ 5% vs last month', color: 'red', iconColor: 'amber', icon: '📦' },
                        { title: 'Low Stock Items', value: '8', trend: 'Check inventory', color: 'red', iconColor: 'red', icon: '⚠️' },
                        { title: 'Open Tasks', value: '14', trend: '3 overdue', color: 'amber', iconColor: 'blue', icon: '📝' },
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm">{card.title}</p>
                                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                                    <p className={`text-${card.color}-500 text-sm mt-1`}>{card.trend}</p>
                                </div>
                                <div className={`bg-${card.iconColor}-100 p-3 rounded-lg text-xl`}>{card.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Metrics Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h2>
                        <div className="space-y-2">
                            {['Jan $12K', 'Feb $19K', 'Mar $15K', 'Apr $20K', 'May $18K', 'Jun $24K'].map((item, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-gray-600">{item.split(' ')[0]}</span>
                                    <div className="w-3/4 h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-500" 
                                            style={{ width: `${(parseInt(item.split('$')[1].replace('K', '')) / 24) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="font-medium">{item.split(' ')[1]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Sales by Region</h2>
                        <div className="space-y-2">
                            {['North $8K', 'South $12K', 'East $6K', 'West $9K'].map((item, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-gray-600">{item.split(' ')[0]}</span>
                                    <div className="w-3/4 h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full" 
                                            style={{ 
                                                width: `${(parseInt(item.split('$')[1].replace('K', '')) / 12) * 100}%`,
                                                backgroundColor: ['#6366F1', '#4F46E5', '#4338CA', '#3730A3'][i]
                                            }}
                                        ></div>
                                    </div>
                                    <span className="font-medium">{item.split(' ')[1]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activities & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activities */}
                    <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
                        <div className="space-y-4">
                            {[
                                { title: 'Order #1234 completed', time: '2 minutes ago', color: 'green' },
                                { title: 'Low stock: Product A', time: '30 minutes ago', color: 'red' },
                                { title: 'New employee onboarded', time: '2 hours ago', color: 'blue' },
                            ].map((a, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <div className={`bg-${a.color}-100 p-2 rounded-full`}>
                                        <div className={`h-5 w-5 text-${a.color}-600`}>●</div>
                                    </div>
                                    <div>
                                        <p className="font-medium">{a.title}</p>
                                        <p className="text-sm text-gray-500">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        {[
                            { label: 'New Order', color: 'indigo', icon: '+' },
                            { label: 'Generate Report', color: 'green', icon: '📊' },
                            { label: 'Check Inventory', color: 'amber', icon: '📦' },
                        ].map((action, i) => (
                            <button key={i} className={`w-full flex items-center space-x-3 bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 px-4 py-3 rounded-lg transition mb-2`}>
                                <span className="text-xl">{action.icon}</span>
                                <span>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ERPDashboard;