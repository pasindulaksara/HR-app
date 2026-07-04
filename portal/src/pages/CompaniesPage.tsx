import {
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineCheckCircle,
    HiOutlineUsers,
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
  
  type Company = {
    id: string;
    name: string;
    code: string;
    email: string;
    phone: string;
    location: string;
    employees: number;
    departments: number;
    status: "Active" | "Inactive";
  };
  
  const companies: Company[] = [
    {
      id: "COM-001",
      name: "Demo Company",
      code: "DEMO-COMPANY",
      email: "demo.company@example.com",
      phone: "+94 77 000 1000",
      location: "Colombo",
      employees: 42,
      departments: 4,
      status: "Active",
    },
    {
      id: "COM-002",
      name: "Demo Trading",
      code: "DEMO-TRADING",
      email: "demo.trading@example.com",
      phone: "+94 77 000 2000",
      location: "Galle",
      employees: 68,
      departments: 5,
      status: "Active",
    },
    {
      id: "COM-003",
      name: "Demo Services",
      code: "DEMO-SERVICES",
      email: "demo.services@example.com",
      phone: "+94 77 000 3000",
      location: "Kandy",
      employees: 35,
      departments: 3,
      status: "Active",
    },
  ];
  
  function CompaniesPage() {
    const authData = localStorage.getItem("portalAuth");
    const user = authData ? (JSON.parse(authData) as AuthUser) : null;
  
    if (!user) {
      return null;
    }
  
    const canViewCompanies =
      user.role === "OWNER_DIRECTOR" || user.role === "GROUP_HR";
  
    if (!canViewCompanies) {
      return (
        <section className="p-6 lg:p-8">
          <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
            <h1 className="text-xl font-bold text-red-700">Access denied</h1>
            <p className="mt-2 text-sm text-red-600">
              You do not have permission to view company records.
            </p>
          </div>
        </section>
      );
    }
  
    const leaveRequests = getLeaveRequests();
  
    const totalEmployees = companies.reduce(
      (total, company) => total + company.employees,
      0,
    );
  
    const totalDepartments = companies.reduce(
      (total, company) => total + company.departments,
      0,
    );
  
    const activeCompanies = companies.filter(
      (company) => company.status === "Active",
    ).length;
  
    const pendingLeave = leaveRequests.filter(
      (request) => request.status === "Pending",
    ).length;
  
    return (
      <section className="space-y-6 p-6 lg:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            HR Portal / Companies
          </p>
  
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Companies
          </h1>
  
          <p className="mt-2 text-sm text-slate-500">
            Company-wise overview for {user.organizationName}.
          </p>
        </div>
  
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineBuildingOffice2 size={25} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Companies
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(companies.length).padStart(2, "0")}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <HiOutlineCheckCircle size={25} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Active Companies
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(activeCompanies).padStart(2, "0")}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
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
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <HiOutlineCalendarDays size={25} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Pending Leave
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(pendingLeave).padStart(2, "0")}
            </h3>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Company Overview
            </h3>
  
            <p className="mt-1 text-sm text-slate-500">
              View company details, employee count, departments and current status.
            </p>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Employees</th>
                  <th className="px-6 py-4 font-semibold">Departments</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-slate-100">
                {companies.map((company) => (
                  <tr
                    key={company.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {company.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {company.code}
                      </p>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      <p>{company.email}</p>
                      <p className="mt-1 text-xs">{company.phone}</p>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.location}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.employees}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {company.departments}
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
  
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="text-lg font-bold text-blue-950">
            Owner view logic
          </h3>
  
          <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
            Owner / Director can view company-wise summaries. HR users handle
            employee registration, departments and daily HR records.
          </p>
        </div>
      </section>
    );
  }
  
  export default CompaniesPage;