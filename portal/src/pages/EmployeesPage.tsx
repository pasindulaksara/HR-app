import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineMagnifyingGlass,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";
import type { PortalRole } from "../data/mockUsers";

type AuthUser = {
  fullName: string;
  username: string;
  email: string;
  role: PortalRole;
  organizationName: string;
  companyName: string | null;
};

type EmployeeStatus = "Active" | "Inactive";

type Employee = {
  id: string;
  employeeNo: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
};

type EmployeeForm = {
  employeeNo: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
};

const companies = ["Demo Company", "Demo Trading", "Demo Services"];

const initialEmployees: Employee[] = [
  {
    id: "EMP-001",
    employeeNo: "E001",
    fullName: "Employee User",
    email: "employee@example.com",
    phone: "+94 77 000 1001",
    companyName: "Demo Company",
    department: "Operations",
    designation: "Executive",
    status: "Active",
  },
  {
    id: "EMP-002",
    employeeNo: "E002",
    fullName: "Sample Employee",
    email: "sample.employee@example.com",
    phone: "+94 77 000 1002",
    companyName: "Demo Company",
    department: "HR",
    designation: "Coordinator",
    status: "Active",
  },
  {
    id: "EMP-003",
    employeeNo: "E003",
    fullName: "Demo Staff Member",
    email: "demo.staff@example.com",
    phone: "+94 77 000 1003",
    companyName: "Demo Trading",
    department: "Sales",
    designation: "Sales Executive",
    status: "Active",
  },
];

const initialFormState: EmployeeForm = {
  employeeNo: "",
  fullName: "",
  email: "",
  phone: "",
  companyName: companies[0],
  department: "",
  designation: "",
  status: "Active",
};

function EmployeesPage() {
  const authData = localStorage.getItem("portalAuth");
  const user = authData ? (JSON.parse(authData) as AuthUser) : null;

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeForm>(initialFormState);

  if (!user) {
    return null;
  }

  const canManageEmployees =
    user.role === "GROUP_HR" || user.role === "COMPANY_HR";

  const canViewEmployees =
    user.role === "OWNER_DIRECTOR" ||
    user.role === "GROUP_HR" ||
    user.role === "COMPANY_HR";

  if (!canViewEmployees) {
    return (
      <section className="p-6 lg:p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-700">Access denied</h1>
          <p className="mt-2 text-sm text-red-600">
            You do not have permission to view employee records.
          </p>
        </div>
      </section>
    );
  }

  const visibleEmployees =
    user.role === "COMPANY_HR"
      ? employees.filter((employee) => employee.companyName === user.companyName)
      : employees;

  const filteredEmployees = visibleEmployees.filter((employee) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      employee.fullName.toLowerCase().includes(searchValue) ||
      employee.employeeNo.toLowerCase().includes(searchValue) ||
      employee.email.toLowerCase().includes(searchValue) ||
      employee.companyName.toLowerCase().includes(searchValue) ||
      employee.department.toLowerCase().includes(searchValue) ||
      employee.designation.toLowerCase().includes(searchValue)
    );
  });

  const activeEmployeesCount = visibleEmployees.filter(
    (employee) => employee.status === "Active",
  ).length;

  const departmentCount = new Set(
    visibleEmployees.map((employee) => employee.department),
  ).size;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setFormData({
      ...initialFormState,
      companyName:
        user.role === "COMPANY_HR" && user.companyName
          ? user.companyName
          : companies[0],
    });

    setIsAddModalOpen(true);
  };

  const handleAddEmployee = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.employeeNo.trim() ||
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.department.trim() ||
      !formData.designation.trim()
    ) {
      return;
    }

    setEmployees((currentEmployees) => {
      const nextNumber = currentEmployees.length + 1;

      const newEmployee: Employee = {
        id: `EMP-${String(nextNumber).padStart(3, "0")}`,
        employeeNo: formData.employeeNo,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        companyName:
          user.role === "COMPANY_HR" && user.companyName
            ? user.companyName
            : formData.companyName,
        department: formData.department,
        designation: formData.designation,
        status: formData.status,
      };

      return [newEmployee, ...currentEmployees];
    });

    setFormData(initialFormState);
    setIsAddModalOpen(false);
  };

  return (
    <>
      <section className="space-y-6 p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              HR Portal / Employees
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              Employees
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage employee records for your organization.
            </p>
          </div>

          {canManageEmployees && (
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <HiOutlinePlus size={20} />
              Add Employee
            </button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineUsers size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Employees
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(visibleEmployees.length).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <HiOutlineUsers size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Active Employees
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(activeEmployeesCount).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <HiOutlineUsers size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Departments
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(departmentCount).padStart(2, "0")}
            </h3>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Employee Directory
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {user.role === "COMPANY_HR"
                  ? `Showing employees for ${user.companyName}.`
                  : "Showing employees across visible companies."}
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
                placeholder="Search employee..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Employee</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Department</th>
                  <th className="px-6 py-4 font-semibold">Designation</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {employee.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {employee.employeeNo}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-1 text-slate-600">
                        <p className="flex items-center gap-2">
                          <HiOutlineEnvelope size={16} />
                          {employee.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <HiOutlinePhone size={16} />
                          {employee.phone || "Not added"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {employee.companyName}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {employee.department}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {employee.designation}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          employee.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white hover:text-blue-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredEmployees.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Add Employee
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Create a basic employee record.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <HiOutlineXMark size={22} />
              </button>
            </div>

            <form className="space-y-5 p-6" onSubmit={handleAddEmployee}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Employee No
                  </label>
                  <input
                    type="text"
                    name="employeeNo"
                    value={formData.employeeNo}
                    onChange={handleInputChange}
                    placeholder="Example: E004"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Example: New Employee"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="employee@example.com"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+94 77 000 0000"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {user.role === "GROUP_HR" && (
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Company
                    </label>
                    <select
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      {companies.map((company) => (
                        <option key={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                )}

                {user.role === "COMPANY_HR" && (
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Company
                    </label>
                    <input
                      type="text"
                      value={user.companyName || ""}
                      disabled
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Example: Operations"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Example: Executive"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeesPage;