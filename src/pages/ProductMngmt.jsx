import React, { useState } from "react";
import { Plus, Funnel, Eye, SquarePen, Trash2, X } from "lucide-react";

const ProductMngmt = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // SAMPLE DATA
  const products = [
    {
      id: 1,
      name: "GPS",
      description: "GPS DEVICE NR2",
      unitPrice: 5400.00,
      taxType: "Exclusive",
      uom: "PCS",
      taxRate: "SST 8%",
    },
    {
      id: 2,
      name: "GPS",
      description: "GPS DEVICE NR2",
      unitPrice: 5400.00,
      taxType: "Inclusive",
      uom: "PCS",
      taxRate: "SST 8%",
    },
    {
      id: 3,
      name: "GPS",
      description: "GPS DEVICE NR2",
      unitPrice: 5400.00,
      taxType: "No Tax",
      uom: "PCS",
      taxRate: "SST 8%",
    },
  ];

  // OPEN EDIT MODAL AND SET SELECTED PRODUCT
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
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
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* TITLE */}
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Products & Services</h2>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4">Tax Type</th>
                  <th className="px-6 py-4">UOM</th>
                  <th className="px-6 py-4">Tax Rate</th>
                  <th className="px-6 py-4 text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {product.unitPrice.toLocaleString("en-MY", {
                        style: "currency",
                        currency: "MYR",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {product.taxType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.uom}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.taxRate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-gray-600 hover:text-gray-900 hover:cursor-pointer">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(product)}
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

      {/* ================= ADD / EDIT PRODUCT MODAL ================= */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditModalOpen ? "Edit Product / Service" : "New Product / Service"}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6 hover:cursor-pointer" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-8 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedProduct?.name ?? ""}
                  placeholder="e.g. GPS"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  defaultValue={selectedProduct?.description ?? ""}
                  placeholder="e.g. GPS DEVICE NR2"
                  rows={3}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct?.unitPrice ?? ""}
                    placeholder="e.g. 5400.00"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit of Measurement
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct?.uom ?? ""}
                    placeholder="e.g. PCS"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Type
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct?.taxType ?? ""}
                    placeholder="e.g. Exclusive"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Tax Rate
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct?.taxRate ?? ""}
                    placeholder="e.g. SST 8%"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="px-6 py-2.5 text-sm font-medium text-[#660033] bg-white border border-[#660033] rounded-lg hover:cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 text-sm font-medium text-white bg-[#660033] rounded-lg hover:cursor-pointer">
                {isEditModalOpen ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMngmt;