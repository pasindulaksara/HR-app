import './App.css'

import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import PortalLayout from "./layouts/PortalLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from './pages/EmployeesPage';
import MyLeavePage from './pages/MyLeavePage';
import LeaveApprovalsPage from './pages/LeaveApprovalsPage';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import CompaniesPage from './pages/CompaniesPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import LeavePolicyPage from './pages/LeavePolicyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<PortalLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/my-leave" element={<MyLeavePage />} />
          <Route path="/leave-approvals" element={<LeaveApprovalsPage />} />
          <Route path="/leave-requests" element={<LeaveRequestsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leave-policy" element={<LeavePolicyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;