import { useState } from "react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineMagnifyingGlass,
  HiOutlineSquares2X2,
  HiOutlineUsers,
} from "react-icons/hi2";

const companies = [
  {
    id: "COM-001",
    name: "3DH Design",
    organization: "3DH Group",
    email: "design@3dhgroup.com",
    employees: 24,
    hrUsers: 2,
    status: "Active",
  },
  {
    id: "COM-002",
    name: "3DH Insurance",
    organization: "3DH Group",
    email: "insurance@3dhgroup.com",
    employees: 18,
    hrUsers: 1,
    status: "Active",
  },
  {
    id: "COM-003",
    name: "3DH Trading",
    organization: "3DH Group",
    email: "trading@3dhgroup.com",
    employees: 16,
    hrUsers: 1,
    status: "Active",
  },
  {
    id: "COM-004",
    name: "ABC Manufacturing",
    organization: "ABC Holdings",
    email: "admin@abcholdings.com",
    employees: 64,
    hrUsers: 2,
    status: "Active",
  },
  {
    id: "COM-005",
    name: "Metro Logistics",
    organization: "Metro Logistics",
    email: "admin@metrologistics.com",
    employees: 28,
    hrUsers: 1,
    status: "Trial",
  },
];

function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter((company) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      company.name.toLowerCase().includes(searchValue) ||
      company.organization.toLowerCase().includes(searchValue) ||
      company.email.toLowerCase().includes(searchValue) ||
      company.status.toLowerCase().includes(searchValue)
    );
  });

  const totalEmployees = companies.reduce(
    (total, company) => total + company.employees,
    0,
  );

  return (
    <>
      <header className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Super Admin / Companies
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Companies
          </h2>
        </div>
      </header>

      <div className="space-y-6 p-6 lg:p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineSquares2X2 size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Companies
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(companies.length).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineUsers size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Employees
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {totalEmployees}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineBuildingOffice2 size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Active Companies
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {companies.filter((company) => company.status === "Active").length}
            </h3>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                All Companies
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                View companies registered under all client organizations.
              </p>
            </div>

            <div className="relative w-full lg:w-80">
              <HiOutlineMagnifyingGlass
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search company..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Organization</th>
                  <th className="px-6 py-4 font-semibold">Employees</th>
                  <th className="px-6 py-4 font-semibold">HR Users</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {company.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {company.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {company.organization}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {company.employees}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {company.hrUsers}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          company.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white hover:text-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCompanies.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompaniesPage;