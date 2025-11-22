import React, { useState } from "react";
import { Funnel, Plus, Info, Link as LinkIcon, Calendar, X } from "lucide-react";

const PaymentsReconciliation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    method: "",
    reference: "",
  });
  const [linkedInvoices, setLinkedInvoices] = useState([""]);

  // Demo data for UI scaffolding
  const paymentRecords = [
    {
      invoices: ["INV-001"],
      invoiceAmount: "RM 5400.00",
      paidAmount: "RM 5400.00",
      balance: "RM 0.00",
      paymentDate: "2025-01-18",
      method: "Bank Transfer",
      status: { label: "Reconciled", tone: "green" },
    },
    {
      invoices: ["INV-002"],
      invoiceAmount: "RM 1200.00",
      paidAmount: "RM 600.00",
      balance: "RM 600.00",
      paymentDate: "2025-01-21",
      method: "Credit Card",
      status: { label: "Partial", tone: "yellow" },
    },
    {
      invoices: ["Multiple (3 invoices)"],
      invoiceAmount: "RM 8500.00",
      paidAmount: "RM 8500.00",
      balance: "RM 0.00",
      paymentDate: "2025-01-22",
      method: "Bank Transfer",
      status: { label: "Reconciled", tone: "green" },
    },
  ];

  const unmatchedPayments = [
    { amount: "RM 2500.00", date: "2025-01-23", reference: "TXN-12345", source: "Bank Transfer" },
    { amount: "RM 1800.00", date: "2025-01-24", reference: "TXN-67890", source: "Credit Card" },
  ];

  const badgeTone = (tone) => {
    if (tone === "green") return "bg-green-100 text-green-700 border-green-200";
    if (tone === "yellow") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (tone === "red") return "bg-red-100 text-red-700 border-red-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const formatRM = (value) => {
    const num = Number(value || 0);
    return `RM ${num.toFixed(2)}`;
  };

  const totalPayment = Number(form.amount || 0);
  const allocated = 0;
  const remaining = Math.max(totalPayment - allocated, 0);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addInvoiceLink = () => setLinkedInvoices((prev) => [...prev, ""]);
  const updateInvoiceAt = (idx, value) => {
    setLinkedInvoices((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Payments &amp; Reconciliation</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                <Funnel className="w-4 h-4" />
                Filter
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#660033] bg-white border border-[#660033] rounded-lg hover:bg-[#660033] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Record Payment
              </button>
            </div>
          </div>

          {/* Payment Records */}
          <div className="px-6 py-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Payment Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice(s)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentRecords.map((r, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {r.invoices.map((inv, i) => (
                          <span key={i} className="block">{inv}</span>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.invoiceAmount}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.paidAmount}</td>
                      <td className={`px-4 py-3 text-sm ${r.balance !== "RM 0.00" ? "text-[#cc3300]" : "text-gray-700"}`}>{r.balance}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.paymentDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.method}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${badgeTone(r.status.tone)}`}>
                          {r.status.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Unmatched Payments */}
          <div className="px-6 pb-6">
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-gray-700">Unmatched Payments</h2>
                  <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 text-xs rounded-full bg-red-600 text-white">
                    {unmatchedPayments.length}
                  </span>
                </div>
                <div className="text-yellow-600" title="Some payments need linking">
                  <Info className="w-4 h-4" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (RM)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {unmatchedPayments.map((p, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{p.amount}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{p.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{p.reference}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{p.source}</td>
                        <td className="px-4 py-3">
                          <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-800 bg-white border border-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                            <LinkIcon className="w-3.5 h-3.5" />
                            Link to Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-4 py-3 border-b border-gray-200">
              <div>
                <p className="text-lg font-semibold text-gray-900">Record Customer Payment</p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                closeModal();
              }}
              className="px-4 py-4 space-y-3"
            >
              {/* Payment Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    className="w-full pr-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <Calendar className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Amount (RM) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => updateForm("amount", e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.method}
                  onChange={(e) => updateForm("method", e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select method</option>
                  <option>Bank Transfer</option>
                  <option>Credit Card</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                </select>
              </div>

              {/* Reference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Number
                </label>
                <input
                  type="text"
                  placeholder="Enter reference number"
                  value={form.reference}
                  onChange={(e) => updateForm("reference", e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Link to invoices */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link to Invoice(s)
                </label>
                <div className="space-y-2">
                  {linkedInvoices.map((val, idx) => (
                    <select
                      key={idx}
                      value={val}
                      onChange={(e) => updateInvoiceAt(idx, e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Invoice</option>
                      <option value="INV-001">INV-001</option>
                      <option value="INV-002">INV-002</option>
                      <option value="INV-003">INV-003</option>
                    </select>
                  ))}
                  <button
                    type="button"
                    onClick={addInvoiceLink}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#660033] bg-white border border-[#660033] rounded-md hover:bg-[#660033] hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Another Invoice
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span>Total Payment:</span>
                  <span>{formatRM(totalPayment)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Allocated:</span>
                  <span>{formatRM(allocated)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Remaining:</span>
                  <span>{formatRM(remaining)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white rounded-md"
                  style={{ backgroundColor: "#660033" }}
                >
                  Save Tax Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsReconciliation;


