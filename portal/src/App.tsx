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
        </Route>
      </Route>
    </Routes>
  );
}

export default App;