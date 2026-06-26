import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useParams } from "react-router";
import {
  HiOutlineArrowLeft,
  HiOutlineBuildingOffice2,
  HiOutlineEnvelope,
  HiOutlineKey,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";

type CompanyStatus = "Active" | "Inactive";
type HrUserRole = "Group HR" | "Company HR";
type HrUserStatus = "Active" | "Inactive";

type Company = {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  employees: number;
  status: CompanyStatus;
};

type CompanyForm = {
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  status: CompanyStatus;
};

type HrUser = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: HrUserRole;
  access: string;
  status: HrUserStatus;
};

type HrUserForm = {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: HrUserRole;
  companyAccess: string;
  status: HrUserStatus;
};

const initialCompanies: Company[] = [
  {
    id: "COM-001",
    name: "3DH Design",
    code: "3DH-DESIGN",
    email: "design@3dhgroup.com",
    phone: "+94 77 000 0001",
    address: "Colombo",
    employees: 24,
    status: "Active",
  },
  {
    id: "COM-002",
    name: "3DH Insurance",
    code: "3DH-INS",
    email: "insurance@3dhgroup.com",
    phone: "+94 77 000 0002",
    address: "Colombo",
    employees: 18,
    status: "Active",
  },
  {
    id: "COM-003",
    name: "3DH Trading",
    code: "3DH-TRADING",
    email: "trading@3dhgroup.com",
    phone: "+94 77 000 0003",
    address: "Colombo",
    employees: 16,
    status: "Active",
  },
];

const initialHrUsers: HrUser[] = [
  {
    id: "HR-001",
    fullName: "Denam Creamer",
    username: "dc.hr",
    email: "dc@3dhgroup.com",
    phone: "+94 77 000 1111",
    role: "Group HR",
    access: "All Companies",
    status: "Active",
  },
];

const initialCompanyForm: CompanyForm = {
  name: "",
  code: "",
  email: "",
  phone: "",
  address: "",
  status: "Active",
};

const initialHrUserForm: HrUserForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  role: "Group HR",
  companyAccess: "",
  status: "Active",
};

function OrganizationDetailsPage() {
  const { organizationId } = useParams();

  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [hrUsers, setHrUsers] = useState<HrUser[]>(initialHrUsers);

  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isAddHrUserModalOpen, setIsAddHrUserModalOpen] = useState(false);

  const [companyForm, setCompanyForm] =
    useState<CompanyForm>(initialCompanyForm);

  const [hrUserForm, setHrUserForm] =
    useState<HrUserForm>(initialHrUserForm);

  const totalEmployees = companies.reduce(
    (total, company) => total + company.employees,
    0,
  );

  const handleCompanyInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setCompanyForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleHrUserInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setHrUserForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddCompany = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!companyForm.name.trim() || !companyForm.code.trim()) {
      return;
    }

    setCompanies((currentCompanies) => {
      const nextNumber = currentCompanies.length + 1;

      const newCompany: Company = {
        id: `COM-${String(nextNumber).padStart(3, "0")}`,
        name: companyForm.name,
        code: companyForm.code,
        email: companyForm.email,
        phone: companyForm.phone,
        address: companyForm.address,
        employees: 0,
        status: companyForm.status,
      };

      return [newCompany, ...currentCompanies];
    });

    setCompanyForm(initialCompanyForm);
    setIsAddCompanyModalOpen(false);
  };

  const handleAddHrUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !hrUserForm.fullName.trim() ||
      !hrUserForm.username.trim() ||
      !hrUserForm.email.trim() ||
      !hrUserForm.password.trim()
    ) {
      return;
    }

    if (hrUserForm.role === "Company HR" && !hrUserForm.companyAccess) {
      return;
    }

    setHrUsers((currentUsers) => {
      const nextNumber = currentUsers.length + 1;

      const newUser: HrUser = {
        id: `HR-${String(nextNumber).padStart(3, "0")}`,
        fullName: hrUserForm.fullName,
        username: hrUserForm.username,
        email: hrUserForm.email,
        phone: hrUserForm.phone,
        role: hrUserForm.role,
        access:
          hrUserForm.role === "Group HR"
            ? "All Companies"
            : hrUserForm.companyAccess,
        status: hrUserForm.status,
      };

      return [newUser, ...currentUsers];
    });

    setHrUserForm(initialHrUserForm);
    setIsAddHrUserModalOpen(false);
  };

  return (
    <>
      <header className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to="/organizations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <HiOutlineArrowLeft size={18} />
              Back to Organizations
            </Link>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              3DH Group
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Organization ID: {organizationId}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsAddCompanyModalOpen(true)}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <HiOutlinePlus size={20} />
              Add Company
            </button>

            <button
              type="button"
              onClick={() => setIsAddHrUserModalOpen(true)}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <HiOutlinePlus size={20} />
              Add HR User
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-5">
                <div className="flex size-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                  <HiOutlineBuildingOffice2 size={34} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">
                    3DH Group
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    This organization can contain one company or multiple
                    companies. Group HR users can access all companies, while
                    Company HR users can access selected companies only.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Business Plan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <HiOutlineSquares2X2 size={25} />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Companies
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
                  <HiOutlineShieldCheck size={25} />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  HR Users
                </p>
                <h3 className="mt-2 text-4xl font-bold text-slate-950">
                  {String(hrUsers.length).padStart(2, "0")}
                </h3>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    Companies
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Companies registered under this organization.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddCompanyModalOpen(true)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Add Company
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center justify-between px-6 py-5"
                  >
                    <div>
                      <p className="font-semibold text-slate-950">
                        {company.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {company.code} · {company.employees} employees
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        company.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {company.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    HR Users
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Create Group HR or Company HR accounts for this organization.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddHrUserModalOpen(true)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Add HR User
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {hrUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-950">
                        {user.fullName}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {user.email} · username: {user.username}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "Group HR"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        {user.role}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {user.access}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">
                Owner Details
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Owner</p>
                  <p className="mt-1 font-semibold text-slate-950">
                    Shamal Rodrigo
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <HiOutlineEnvelope size={20} />
                  admin@3dhgroup.com
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <HiOutlinePhone size={20} />
                  +94 77 000 0000
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">
                Next Setup Steps
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p>✅ Organization created</p>
                <p>{companies.length > 0 ? "✅" : "⬜"} Companies added</p>
                <p>{hrUsers.length > 0 ? "✅" : "⬜"} HR accounts created</p>
                <p>⬜ Activate employee portal</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {isAddCompanyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Add Company
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Create a company under this organization.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddCompanyModalOpen(false)}
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <HiOutlineXMark size={22} />
              </button>
            </div>

            <form className="space-y-5 p-6" onSubmit={handleAddCompany}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={companyForm.name}
                    onChange={handleCompanyInputChange}
                    placeholder="Example: 3DH Design"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Company Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={companyForm.code}
                    onChange={handleCompanyInputChange}
                    placeholder="Example: 3DH-DESIGN"
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
                    value={companyForm.email}
                    onChange={handleCompanyInputChange}
                    placeholder="company@example.com"
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
                    value={companyForm.phone}
                    onChange={handleCompanyInputChange}
                    placeholder="+94 77 000 0000"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Address / Location
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={companyForm.address}
                    onChange={handleCompanyInputChange}
                    placeholder="Example: Colombo"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={companyForm.status}
                    onChange={handleCompanyInputChange}
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
                  onClick={() => setIsAddCompanyModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddHrUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Add HR User
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Create login access for Group HR or Company HR.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddHrUserModalOpen(false)}
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <HiOutlineXMark size={22} />
              </button>
            </div>

            <form className="space-y-5 p-6" onSubmit={handleAddHrUser}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={hrUserForm.fullName}
                    onChange={handleHrUserInputChange}
                    placeholder="Example: Prabodha Hettiarachchi"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={hrUserForm.username}
                    onChange={handleHrUserInputChange}
                    placeholder="Example: prabodha.hr"
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
                    value={hrUserForm.email}
                    onChange={handleHrUserInputChange}
                    placeholder="hr@company.com"
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
                    value={hrUserForm.phone}
                    onChange={handleHrUserInputChange}
                    placeholder="+94 77 000 0000"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Temporary Password
                  </label>
                  <div className="relative mt-2">
                    <HiOutlineKey
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={19}
                    />
                    <input
                      type="text"
                      name="password"
                      value={hrUserForm.password}
                      onChange={handleHrUserInputChange}
                      placeholder="Example: Welcome@123"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Role
                  </label>
                  <select
                    name="role"
                    value={hrUserForm.role}
                    onChange={handleHrUserInputChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option>Group HR</option>
                    <option>Company HR</option>
                  </select>
                </div>

                {hrUserForm.role === "Company HR" && (
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Company Access
                    </label>
                    <select
                      name="companyAccess"
                      value={hrUserForm.companyAccess}
                      onChange={handleHrUserInputChange}
                      required
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.name}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={hrUserForm.status}
                    onChange={handleHrUserInputChange}
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
                  onClick={() => setIsAddHrUserModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Save HR User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default OrganizationDetailsPage;