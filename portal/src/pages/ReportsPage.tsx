import {
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineDocumentText,
    HiOutlineUsers,
    HiOutlineXCircle,
  } from "react-icons/hi2";
  import type { PortalRole } from "../data/mockUsers";
  import { getLeaveRequests } from "../data/leaveRequestsStore";
  
  type AuthUser = {
    fullName: string;
    username: string;
    email: string;
    role: PortalRole;
    organizationName: string;
    companyName: string | null;
  };
  
  type CompanyReport = {
    name: string;
    employees: number;
    activeEmployees: number;
    inactiveEmployees: number;
    departments: number;
    hrUsers: number;
    pendingLeave: number;
    status: "Active" | "Inactive";
  };
  
  type DepartmentReport = {
    companyName: string;
    departmentName: string;
    employees: number;
    activeEmployees: number;
    manager: string;
  };
  
  type MonthlyHrSummary = {
    month: string;
    employees: number;
    newEmployees: number;
    leaveRequests: number;
    approved: number;
    rejected: number;
    pending: number;
  };
  
  const companyReports: CompanyReport[] = [
    {
      name: "Demo Company",
      employees: 42,
      activeEmployees: 40,
      inactiveEmployees: 2,
      departments: 4,
      hrUsers: 2,
      pendingLeave: 4,
      status: "Active",
    },
    {
      name: "Demo Trading",
      employees: 68,
      activeEmployees: 65,
      inactiveEmployees: 3,
      departments: 5,
      hrUsers: 2,
      pendingLeave: 3,
      status: "Active",
    },
    {
      name: "Demo Services",
      employees: 35,
      activeEmployees: 34,
      inactiveEmployees: 1,
      departments: 3,
      hrUsers: 1,
      pendingLeave: 2,
      status: "Active",
    },
  ];
  
  const departmentReports: DepartmentReport[] = [
    {
      companyName: "Demo Company",
      departmentName: "Operations",
      employees: 18,
      activeEmployees: 17,
      manager: "Operations Manager",
    },
    {
      companyName: "Demo Company",
      departmentName: "HR",
      employees: 6,
      activeEmployees: 6,
      manager: "HR Manager",
    },
    {
      companyName: "Demo Trading",
      departmentName: "Sales",
      employees: 28,
      activeEmployees: 27,
      manager: "Sales Manager",
    },
    {
      companyName: "Demo Trading",
      departmentName: "Finance",
      employees: 10,
      activeEmployees: 10,
      manager: "Finance Manager",
    },
    {
      companyName: "Demo Services",
      departmentName: "Customer Support",
      employees: 16,
      activeEmployees: 15,
      manager: "Support Manager",
    },
  ];
  
  const monthlyHrSummary: MonthlyHrSummary[] = [
    {
      month: "January",
      employees: 130,
      newEmployees: 4,
      leaveRequests: 18,
      approved: 14,
      rejected: 2,
      pending: 2,
    },
    {
      month: "February",
      employees: 136,
      newEmployees: 6,
      leaveRequests: 21,
      approved: 16,
      rejected: 3,
      pending: 2,
    },
    {
      month: "March",
      employees: 140,
      newEmployees: 4,
      leaveRequests: 19,
      approved: 15,
      rejected: 1,
      pending: 3,
    },
    {
      month: "April",
      employees: 143,
      newEmployees: 3,
      leaveRequests: 24,
      approved: 18,
      rejected: 3,
      pending: 3,
    },
    {
      month: "May",
      employees: 145,
      newEmployees: 2,
      leaveRequests: 28,
      approved: 21,
      rejected: 4,
      pending: 3,
    },
    {
      month: "June",
      employees: 145,
      newEmployees: 0,
      leaveRequests: 32,
      approved: 24,
      rejected: 5,
      pending: 3,
    },
  ];
  
  function ReportsPage() {
    const authData = localStorage.getItem("portalAuth");
    const user = authData ? (JSON.parse(authData) as AuthUser) : null;
  
    if (!user) {
      return null;
    }
  
    const canViewReports =
      user.role === "OWNER_DIRECTOR" ||
      user.role === "GROUP_HR" ||
      user.role === "COMPANY_HR";
  
    if (!canViewReports) {
      return (
        <section className="p-6 lg:p-8">
          <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
            <h1 className="text-xl font-bold text-red-700">Access denied</h1>
            <p className="mt-2 text-sm text-red-600">
              You do not have permission to view reports.
            </p>
          </div>
        </section>
      );
    }
  
    const visibleCompanies =
      user.role === "COMPANY_HR" && user.companyName
        ? companyReports.filter((company) => company.name === user.companyName)
        : companyReports;
  
    const visibleDepartments =
      user.role === "COMPANY_HR" && user.companyName
        ? departmentReports.filter(
            (department) => department.companyName === user.companyName,
          )
        : departmentReports;
  
    const leaveRequests = getLeaveRequests();
  
    const visibleLeaveRequests =
      user.role === "COMPANY_HR" && user.companyName
        ? leaveRequests.filter(
            (request) => request.companyName === user.companyName,
          )
        : leaveRequests;
  
    const totalEmployees = visibleCompanies.reduce(
      (total, company) => total + company.employees,
      0,
    );
  
    const activeEmployees = visibleCompanies.reduce(
      (total, company) => total + company.activeEmployees,
      0,
    );
  
    const inactiveEmployees = visibleCompanies.reduce(
      (total, company) => total + company.inactiveEmployees,
      0,
    );
  
    const totalDepartments = visibleCompanies.reduce(
      (total, company) => total + company.departments,
      0,
    );
  
    const totalHrUsers = visibleCompanies.reduce(
      (total, company) => total + company.hrUsers,
      0,
    );
  
    const pendingLeave = visibleLeaveRequests.filter(
      (request) => request.status === "Pending",
    ).length;
  
    const approvedLeave = visibleLeaveRequests.filter(
      (request) => request.status === "Approved",
    ).length;
  
    const rejectedLeave = visibleLeaveRequests.filter(
      (request) => request.status === "Rejected",
    ).length;
  
    const totalLeaveRequests = visibleLeaveRequests.length;
  
    const activeRate =
      totalEmployees > 0
        ? Math.round((activeEmployees / totalEmployees) * 100)
        : 0;
  
    const leaveApprovalRate =
      totalLeaveRequests > 0
        ? Math.round((approvedLeave / totalLeaveRequests) * 100)
        : 0;
  
    return (
      <section className="space-y-6 p-6 lg:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            HR Portal / Reports
          </p>
  
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Reports
          </h1>
  
          <p className="mt-2 text-sm text-slate-500">
            {user.role === "OWNER_DIRECTOR"
              ? "Owner-level employee, company, department and leave overview."
              : user.role === "GROUP_HR"
                ? "Group HR reports across all companies."
                : `Company HR reports for ${user.companyName}.`}
          </p>
        </div>
  
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineUsers size={25} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Employees
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {totalEmployees}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <HiOutlineCheckCircle size={25} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Active Employees
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {activeEmployees}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <HiOutlineBuildingOffice2 size={25} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Companies
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(visibleCompanies.length).padStart(2, "0")}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <HiOutlineCalendarDays size={25} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Leave Requests
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(totalLeaveRequests).padStart(2, "0")}
            </h3>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              1. Employee Summary
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Overall workforce status and employee activity.
            </p>
          </div>
  
          <div className="grid gap-5 p-6 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Total Employees
              </p>
              <h4 className="mt-3 text-3xl font-bold text-slate-950">
                {totalEmployees}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-700">
                Active Employees
              </p>
              <h4 className="mt-3 text-3xl font-bold text-emerald-900">
                {activeEmployees}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-700">
                Inactive Employees
              </p>
              <h4 className="mt-3 text-3xl font-bold text-red-900">
                {inactiveEmployees}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">
                Active Workforce Rate
              </p>
              <h4 className="mt-3 text-3xl font-bold text-blue-900">
                {activeRate}%
              </h4>
            </div>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              2. Company Summary
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Company-wise employees, departments, HR users and leave activity.
            </p>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Employees</th>
                  <th className="px-6 py-4 font-semibold">Active</th>
                  <th className="px-6 py-4 font-semibold">Inactive</th>
                  <th className="px-6 py-4 font-semibold">Departments</th>
                  <th className="px-6 py-4 font-semibold">HR Users</th>
                  <th className="px-6 py-4 font-semibold">Pending Leave</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-slate-100">
                {visibleCompanies.map((company) => (
                  <tr
                    key={company.name}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {company.name}
                      </p>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.employees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.activeEmployees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.inactiveEmployees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.departments}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.hrUsers}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.pendingLeave}
                    </td>
  
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          company.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              3. Department Summary
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Department-wise employee distribution.
            </p>
          </div>
  
          <div className="grid gap-5 border-b border-slate-200 p-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Total Departments
              </p>
              <h4 className="mt-3 text-3xl font-bold text-slate-950">
                {String(totalDepartments).padStart(2, "0")}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">HR Users</p>
              <h4 className="mt-3 text-3xl font-bold text-blue-900">
                {String(totalHrUsers).padStart(2, "0")}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-purple-50 p-5">
              <p className="text-sm font-semibold text-purple-700">
                Largest Department
              </p>
              <h4 className="mt-3 text-2xl font-bold text-purple-900">Sales</h4>
            </div>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Department</th>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Employees</th>
                  <th className="px-6 py-4 font-semibold">Active Employees</th>
                  <th className="px-6 py-4 font-semibold">Manager</th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-slate-100">
                {visibleDepartments.map((department) => (
                  <tr
                    key={`${department.companyName}-${department.departmentName}`}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {department.departmentName}
                      </p>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {department.companyName}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {department.employees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {department.activeEmployees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {department.manager}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              4. Leave Summary
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Leave request status and approval overview.
            </p>
          </div>
  
          <div className="grid gap-5 p-6 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <HiOutlineDocumentText className="text-slate-600" size={24} />
                <p className="font-semibold text-slate-950">Total Leave</p>
              </div>
              <h4 className="mt-4 text-3xl font-bold text-slate-950">
                {String(totalLeaveRequests).padStart(2, "0")}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="flex items-center gap-3">
                <HiOutlineClock className="text-amber-600" size={24} />
                <p className="font-semibold text-amber-900">Pending</p>
              </div>
              <h4 className="mt-4 text-3xl font-bold text-amber-900">
                {String(pendingLeave).padStart(2, "0")}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle className="text-emerald-600" size={24} />
                <p className="font-semibold text-emerald-900">Approved</p>
              </div>
              <h4 className="mt-4 text-3xl font-bold text-emerald-900">
                {String(approvedLeave).padStart(2, "0")}
              </h4>
            </div>
  
            <div className="rounded-2xl bg-red-50 p-5">
              <div className="flex items-center gap-3">
                <HiOutlineXCircle className="text-red-600" size={24} />
                <p className="font-semibold text-red-900">Rejected</p>
              </div>
              <h4 className="mt-4 text-3xl font-bold text-red-900">
                {String(rejectedLeave).padStart(2, "0")}
              </h4>
            </div>
          </div>
  
          <div className="border-t border-slate-200 p-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-700">
                Leave Approval Rate
              </span>
              <span className="font-bold text-slate-950">
                {leaveApprovalRate}%
              </span>
            </div>
  
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-600"
                style={{ width: `${leaveApprovalRate}%` }}
              />
            </div>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              5. Monthly HR Overview
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Month-by-month employee and leave activity.
            </p>
          </div>
  
          <div className="grid gap-5 border-b border-slate-200 p-6 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="flex items-center gap-3">
                <HiOutlineChartBar className="text-blue-600" size={24} />
                <p className="font-semibold text-blue-900">Employee Growth</p>
              </div>
              <h4 className="mt-4 text-3xl font-bold text-blue-900">+15</h4>
              <p className="mt-1 text-sm text-blue-700">Last 6 months</p>
            </div>
  
            <div className="rounded-2xl bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <HiOutlineCheckCircle className="text-emerald-600" size={24} />
                <p className="font-semibold text-emerald-900">
                  Avg Approval Rate
                </p>
              </div>
              <h4 className="mt-4 text-3xl font-bold text-emerald-900">78%</h4>
              <p className="mt-1 text-sm text-emerald-700">Across 6 months</p>
            </div>
  
            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="flex items-center gap-3">
                <HiOutlineClock className="text-amber-600" size={24} />
                <p className="font-semibold text-amber-900">
                  Pending This Month
                </p>
              </div>
              <h4 className="mt-4 text-3xl font-bold text-amber-900">03</h4>
              <p className="mt-1 text-sm text-amber-700">Needs follow-up</p>
            </div>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Month</th>
                  <th className="px-6 py-4 font-semibold">Employees</th>
                  <th className="px-6 py-4 font-semibold">New Employees</th>
                  <th className="px-6 py-4 font-semibold">Leave Requests</th>
                  <th className="px-6 py-4 font-semibold">Approved</th>
                  <th className="px-6 py-4 font-semibold">Rejected</th>
                  <th className="px-6 py-4 font-semibold">Pending</th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-slate-100">
                {monthlyHrSummary.map((summary) => (
                  <tr
                    key={summary.month}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {summary.month}
                      </p>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {summary.employees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {summary.newEmployees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {summary.leaveRequests}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {summary.approved}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {summary.rejected}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {summary.pending}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="text-lg font-bold text-blue-950">Report logic</h3>
  
          <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
            Reports show owner-level and HR-level summaries. Owner / Director can
            review business HR status, while HR users can monitor workforce,
            departments and leave activity.
          </p>
        </div>
      </section>
    );
  }
  
  export default ReportsPage;