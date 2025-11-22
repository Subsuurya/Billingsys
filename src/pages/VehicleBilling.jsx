import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronDown,
  X,
} from "lucide-react";

const STATUS_OPTIONS = ["All Status", "Active", "Inactive"];

const DEMO_VEHICLES = [
  {
    deviceName: "VEH-001-ABC1234",
    status: "Active",
    gsm: 85,
    eventMessage: "Engine On",
    version: "v2.1.5",
    simNumber: "+60123456789",
    location: "Kuala Lumpur",
    dateTime: "2025-01-22 14:30",
    company: "ABC Corp",
  },
  {
    deviceName: "VEH-002-XYZ5678",
    status: "Active",
    gsm: 92,
    eventMessage: "Idle",
    version: "v2.1.5",
    simNumber: "+60198765432",
    location: "Petaling Jaya",
    dateTime: "2025-01-22 14:28",
    company: "XYZ Ltd",
  },
  {
    deviceName: "VEH-003-DEF9012",
    status: "Inactive",
    gsm: 0,
    eventMessage: "No Signal",
    version: "v2.0.3",
    simNumber: "+60187654321",
    location: "-",
    dateTime: "2025-01-20 09:15",
    company: "ABC Corp",
  },
  {
    deviceName: "VEH-004-GHI3456",
    status: "Active",
    gsm: 78,
    eventMessage: "Moving",
    version: "v2.1.5",
    simNumber: "+60176543210",
    location: "Shah Alam",
    dateTime: "2025-01-22 14:32",
    company: "Tech Solutions",
  },
  {
    deviceName: "VEH-005-JKL7890",
    status: "Active",
    gsm: 88,
    eventMessage: "Parked",
    version: "v2.1.5",
    simNumber: "+60165432109",
    location: "Subang Jaya",
    dateTime: "2025-01-22 14:25",
    company: "XYZ Ltd",
  },
];

const Badge = ({ tone, children }) => {
  const className =
    tone === "green"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${className}`}>
      {children}
    </span>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5">
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
  </div>
);

const Dropdown = ({ value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pr-9 pl-3 py-2 text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

const VehicleBilling = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [company, setCompany] = useState("All Companies");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const companies = useMemo(() => {
    const unique = Array.from(new Set(DEMO_VEHICLES.map((v) => v.company)));
    return ["All Companies", ...unique];
  }, []);

  const filteredVehicles = useMemo(() => {
    return DEMO_VEHICLES.filter((v) => {
      const matchesQuery =
        query.trim().length === 0 ||
        v.deviceName.toLowerCase().includes(query.toLowerCase()) ||
        v.simNumber.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All Status" || v.status === status;
      const matchesCompany = company === "All Companies" || v.company === company;
      return matchesQuery && matchesStatus && matchesCompany;
    });
  }, [query, status, company]);

  const totals = useMemo(() => {
    const total = DEMO_VEHICLES.length;
    const active = DEMO_VEHICLES.filter((v) => v.status === "Active").length;
    const inactive = DEMO_VEHICLES.filter((v) => v.status === "Inactive").length;
    const uniqueCompanies = new Set(DEMO_VEHICLES.map((v) => v.company)).size;
    return { total, active, inactive, companies: uniqueCompanies };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search vehicles..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <Dropdown value={status} onChange={setStatus} options={STATUS_OPTIONS} />
              <Dropdown value={company} onChange={setCompany} options={companies} />
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg"
                style={{ backgroundColor: "#660033" }}
              >
                <Plus className="w-4 h-4" />
                Add Vehicle
              </button>
            </div>
          </div>

          <div className="px-6 py-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Vehicles" value={totals.total} />
            <StatCard title="Active" value={totals.active} />
            <StatCard title="Inactive" value={totals.inactive} />
            <StatCard title="Companies" value={totals.companies} />
          </div>

          <div className="px-6 pb-6">
            <div className="mb-3">
              <h2 className="text-sm font-semibold text-gray-700">Vehicle List</h2>
              <p className="text-xs text-gray-500 mt-1">
                Showing {filteredVehicles.length} of {DEMO_VEHICLES.length} vehicles
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GSM Signal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Message</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SIM Number</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVehicles.map((v, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{v.deviceName}</td>
                      <td className="px-4 py-3">
                        {v.status === "Active" ? (
                          <Badge tone="green">Active</Badge>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{v.gsm}%</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.eventMessage}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.version}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.simNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.dateTime}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.company}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100" aria-label="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md border border-gray-300 text-red-600 hover:bg-red-50" aria-label="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start sm:items-center justify-center p-4" onClick={() => setIsAddOpen(false)}>
          <div className="w-full max-w-lg bg-white rounded-lg shadow-xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <p className="text-lg font-semibold text-gray-900">Add Vehicle</p>
              <button className="text-gray-600 hover:text-gray-900" onClick={() => setIsAddOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddOpen(false);
              }}
              className="px-4 py-4 space-y-3"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Device Name</label>
                <input type="text" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Active">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GSM Signal (%)</label>
                  <input type="number" min="0" max="100" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SIM Number</label>
                  <input type="text" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white rounded-md" style={{ backgroundColor: "#660033" }}>
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleBilling;


