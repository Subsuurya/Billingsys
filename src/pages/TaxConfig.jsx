import React, { useState } from "react";
import { Plus, Funnel, Eye, SquarePen, Trash2, X, CircleCheckBig } from "lucide-react";

const TaxConfig = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);

  // SAMPLE DATA
  const taxRecords = [
    {
      id: 1,
      name: "SST 8%",
      rate: 8.00,
      category: "Exclusive",
      isDefault: true,
    },
    {
      id: 2,
      name: "GST 6%",
      rate: 6.00,
      category: "Inclusive",
      isDefault: false,
    },
    {
      id: 3,
      name: "No Tax",
      rate: 0.00,
      category: "No Tax",
      isDefault: false,
    },
  ];

  // OPEN EDIT MODAL WITH SELECTED TAX RECORD
  const openEditModal = (tax) => {
    setSelectedTax(tax);
    setIsEditModalOpen(true);
  };
  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedTax(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* HEADER */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center space-x-3 ml-auto">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors hover:cursor-pointer">
                  <Funnel className="w-4 h-4" />
                  Filter
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#660033] bg-white border border-[#660033] rounded-lg hover:bg-[#660033] hover:text-white transition-colors hover:cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Tax record
                </button>
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Tax Records</h2>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-6 py-4">Tax Name</th>
                  <th className="px-6 py-4">Tax Rate (%)</th>
                  <th className="px-6 py-4">Tax Category</th>
                  <th className="px-6 py-4 text-center">Default</th>
                  <th className="px-6 py-4 text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {taxRecords.map((tax) => (
                  <tr key={tax.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {tax.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {tax.rate.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <span
                        className={`inline-flex justify-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full w-25 ${
                          tax.category === "Exclusive"
                            ? "bg-purple-100 text-purple-800"
                            : tax.category === "Inclusive"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tax.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {tax.isDefault ? (
                        <CircleCheckBig className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => openEditModal(tax)}
                          className="text-gray-600 hover:text-gray-900 hover:cursor-pointer">
                          <SquarePen className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 hover:cursor-pointer">
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

      {/* ================= ADD / EDIT TAX MODAL ================= */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditModalOpen ? "Edit Tax Record" : "New Tax Record"}
              </h3>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6 hover:cursor-pointer" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedTax?.name ?? ""}
                  placeholder="e.g. SST 8%"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={selectedTax?.rate ?? ""}
                    placeholder="e.g. 8.00"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    defaultValue={selectedTax?.category ?? ""}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Exclusive">Tax Exclusive</option>
                    <option value="Inclusive">Tax Inclusive</option>
                    <option value="No Tax">No Tax</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-200">
              <button
                onClick={closeModals}
                className="px-6 py-2.5 text-sm font-medium text-[#660033] bg-white border border-[#660033] rounded-lg hover:cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 text-sm font-medium text-white bg-[#660033] rounded-lg hover:cursor-pointer">
                {isEditModalOpen ? "Update Tax Record" : "Save Tax Record"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxConfig;