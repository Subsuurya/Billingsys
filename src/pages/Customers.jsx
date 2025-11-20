import React, { useState } from "react";
import { Plus, Search, Funnel, Eye, SquarePen, Trash2, Building2, Mail, Phone, MapPin, User } from "lucide-react";

const Customers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // SAMPLE DATA
  const customers = [
    {
      id: 1,
      name: "John Doe",
      company: "ABC Corp",
      taxNumber: "TX123456",
      email: "john@abccorp.com.my",
      phone: "+6012-345 6789",
      address: "123, Main Street, Kuala Lumpur",
    }
  ];

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Create and Manage Customers</h1>

              <div className="flex items-center space-x-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors hover:cursor-pointer">
                  <Funnel className="w-4 h-4" />
                  Filter
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#660033] bg-white border border-[#660033] rounded-lg hover:bg-[#660033] hover:text-white transition-colors hover:cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Customer
                </button>
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Customer Records</h2>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Tax Number</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">{customer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {customer.company}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.taxNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                        {customer.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                        <span className="truncate">{customer.address}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(customer)}
                          className="text-gray-600 hover:text-[#660033] transition-colors"
                        >
                          <SquarePen className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition-colors">
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

      {/* ADD / EDIT MODAL - Same as before */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditModalOpen ? "Edit Customer" : "Add New Customer"}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedCustomer(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Form fields same as previous version */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCustomer?.name}
                    placeholder="e.g. Ahmad Zulkifli"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#660033] focus:border-[#660033]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCustomer?.company}
                    placeholder="e.g. TechVision Sdn Bhd"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Number</label>
                  <input
                    type="text"
                    defaultValue={selectedCustomer?.taxNumber}
                    placeholder="e.g. C234567890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    defaultValue={selectedCustomer?.email}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue={selectedCustomer?.phone}
                    placeholder="+6012-345 6789"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCustomer?.address}
                    placeholder="Full address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedCustomer(null);
                }}
                className="px-6 py-2.5 text-sm font-medium text-[#660033] bg-white border border-[#660033] rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 text-sm font-medium text-white bg-[#660033] rounded-lg hover:bg-[#4f0026]">
                {isEditModalOpen ? "Update Customer" : "Add Customer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;