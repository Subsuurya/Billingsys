import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Invoices from "./pages/Invoices.jsx";
import Customers from "./pages/Customers.jsx";
import ProductMngmt from "./pages/ProductMngmt.jsx";
import TaxConfig from "./pages/TaxConfig.jsx";
import PaymentsReconciliation from "./pages/PaymentsReconciliation.jsx";
import VehicleBilling from "./pages/VehicleBilling.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<DashboardLayout />}>
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/product-management" element={<ProductMngmt />} />
        <Route path="/tax-config" element={<TaxConfig />} />
        <Route path="/payments-reconciliation" element={<PaymentsReconciliation />} />
        <Route path="/vehicle-billing" element={<VehicleBilling />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
