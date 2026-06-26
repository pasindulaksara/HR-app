
import './App.css'

import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import OrganizationDetailsPage from "./pages/OrganizationDetailsPage";
import CompaniesPage from "./pages/CompaniesPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<SuperAdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route
            path="/organizations/:organizationId"
            element={<OrganizationDetailsPage />}
          />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;