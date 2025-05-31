import Dropdown from "../Dropdown";

function Orderinfo({ formData, onFormChange }) {
    const partyOptions = [
        "Anand SOK",
        "Maniyarasu",
        "Kaniyarasu",
        "Naveen",
        "Hari",
        "Vicky"
    ];

    const brokerOptions = [
        "Anand SOK",
        "Maniyarasu",
        "Kaniyarasu",
        "Naveen",
        "Hari",
        "Vicky"
    ];

    return (
        <div>
            <div className="bg-white m-5 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 glass-card p-6 floating transition-all">
                <div>
                    <label htmlFor="entryDate" className="block  mb-2 font-medium text-secondary">
                        Date
                    </label>
                    <input
                        type="date"
                        id="entryDate"
                        value={formData.entryDate}
                        onChange={(e) => onFormChange('entryDate', e.target.value)}
                        className="glass-panel border h-10 border-slate-200 p-3 h-12 rounded-lg w-full text-base focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                <div>
                    <label htmlFor="orderType" className="block mb-2 font-medium text-secondary">
                        Order Type
                    </label>
                    <Dropdown
                        options={["purchase", "sale"]}
                        onSelect={(value) => onFormChange('orderType', value)}
                        placeholder="Select order type"
                        value={formData.orderType}
                    />
                </div>

                <div>
                    <label htmlFor="partyName" className="block mb-2 font-medium text-secondary">
                        Party Name
                    </label>
                    <Dropdown
                        options={partyOptions}
                        onSelect={(value) => onFormChange('partyName', value)}
                        placeholder="Select party"
                        value={formData.partyName}
                    />
                </div>

                <div>
                    <label htmlFor="brokerName" className="block mb-2 font-medium text-secondary">
                        Broker Name
                    </label>
                    <Dropdown
                        options={brokerOptions}
                        onSelect={(value) => onFormChange('brokerName', value)}
                        placeholder="Select broker"
                        value={formData.brokerName}
                    />
                </div>
            </div>
        </div>
    );
}

export default Orderinfo;