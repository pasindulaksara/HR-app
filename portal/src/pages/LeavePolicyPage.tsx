import { useMemo, useRef, useState } from "react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineIdentification,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
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

type LeavePolicy = {
  id: string;
  companyName: string;
  employeeType: "Full-time" | "Intern" | "Probation" | "Contract";
  casualLeaveDays: number;
  annualLeaveDays: number;
  sickLeaveDays: number;
  halfDayAllowed: boolean;
  probationLeaveAllowed: boolean;
  carryForwardAllowed: boolean;
  status: "Active" | "Inactive";
};

const STORAGE_KEY = "portalLeavePolicies";

const defaultLeavePolicies: LeavePolicy[] = [
  {
    id: "LP-001",
    companyName: "Demo Company",
    employeeType: "Full-time",
    casualLeaveDays: 14,
    annualLeaveDays: 14,
    sickLeaveDays: 7,
    halfDayAllowed: true,
    probationLeaveAllowed: true,
    carryForwardAllowed: false,
    status: "Active",
  },
  {
    id: "LP-002",
    companyName: "Demo Company",
    employeeType: "Intern",
    casualLeaveDays: 5,
    annualLeaveDays: 0,
    sickLeaveDays: 3,
    halfDayAllowed: true,
    probationLeaveAllowed: true,
    carryForwardAllowed: false,
    status: "Active",
  },
  {
    id: "LP-003",
    companyName: "Demo Trading",
    employeeType: "Full-time",
    casualLeaveDays: 14,
    annualLeaveDays: 14,
    sickLeaveDays: 7,
    halfDayAllowed: true,
    probationLeaveAllowed: true,
    carryForwardAllowed: false,
    status: "Active",
  },
  {
    id: "LP-004",
    companyName: "Demo Services",
    employeeType: "Full-time",
    casualLeaveDays: 12,
    annualLeaveDays: 14,
    sickLeaveDays: 7,
    halfDayAllowed: true,
    probationLeaveAllowed: false,
    carryForwardAllowed: false,
    status: "Active",
  },
];

const companies = ["Demo Company", "Demo Trading", "Demo Services"];

const employeeTypes: LeavePolicy["employeeType"][] = [
  "Full-time",
  "Intern",
  "Probation",
  "Contract",
];

function getStoredPolicies() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLeavePolicies));
    return defaultLeavePolicies;
  }

  try {
    return JSON.parse(storedData) as LeavePolicy[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLeavePolicies));
    return defaultLeavePolicies;
  }
}

function savePolicies(policies: LeavePolicy[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
}

function createPolicyId() {
  return `LP-${Date.now()}`;
}

function LeavePolicyPage() {
  const authData = localStorage.getItem("portalAuth");
  const user = authData ? (JSON.parse(authData) as AuthUser) : null;

  const [policies, setPolicies] = useState<LeavePolicy[]>(getStoredPolicies);
const [selectedCompany, setSelectedCompany] = useState(
  user?.companyName ?? "All Companies",
);
const [editingPolicy, setEditingPolicy] = useState<LeavePolicy | null>(null);
const [showForm, setShowForm] = useState(false);
const [message, setMessage] = useState("");

const formRef = useRef<HTMLDivElement | null>(null);

  if (!user) {
    return null;
  }

  const canManagePolicy =
    user.role === "GROUP_HR" || user.role === "COMPANY_HR";

  if (!canManagePolicy) {
    return (
      <section className="p-6 lg:p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-700">Access denied</h1>
          <p className="mt-2 text-sm text-red-600">
            Only Group HR and Company HR users can manage leave policies.
          </p>
        </div>
      </section>
    );
  }

  const companyOptions =
    user.role === "COMPANY_HR" && user.companyName
      ? [user.companyName]
      : companies;

  const visiblePolicies = useMemo(() => {
    if (user.role === "COMPANY_HR" && user.companyName) {
      return policies.filter((policy) => policy.companyName === user.companyName);
    }

    if (selectedCompany === "All Companies") {
      return policies;
    }

    return policies.filter((policy) => policy.companyName === selectedCompany);
  }, [policies, selectedCompany, user.companyName, user.role]);

  const activePolicyCount = visiblePolicies.filter(
    (policy) => policy.status === "Active",
  ).length;

  const fullTimePolicyCount = visiblePolicies.filter(
    (policy) => policy.employeeType === "Full-time",
  ).length;

  const internPolicyCount = visiblePolicies.filter(
    (policy) => policy.employeeType === "Intern",
  ).length;

  const halfDayAllowedCount = visiblePolicies.filter(
    (policy) => policy.halfDayAllowed,
  ).length;

  const emptyPolicy: LeavePolicy = {
    id: createPolicyId(),
    companyName:
      user.role === "COMPANY_HR" && user.companyName
        ? user.companyName
        : selectedCompany === "All Companies"
          ? "Demo Company"
          : selectedCompany,
    employeeType: "Full-time",
    casualLeaveDays: 14,
    annualLeaveDays: 14,
    sickLeaveDays: 7,
    halfDayAllowed: true,
    probationLeaveAllowed: true,
    carryForwardAllowed: false,
    status: "Active",
  };

  const openCreateForm = () => {
    setEditingPolicy({
      ...emptyPolicy,
      id: createPolicyId(),
    });
  
    setShowForm(true);
    setMessage("");
  
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const openEditForm = (policy: LeavePolicy) => {
    setEditingPolicy(policy);
    setShowForm(true);
    setMessage("");
  };

  const closeForm = () => {
    setEditingPolicy(null);
    setShowForm(false);
    setMessage("");
  };

  const updateEditingPolicy = <K extends keyof LeavePolicy>(
    key: K,
    value: LeavePolicy[K],
  ) => {
    if (!editingPolicy) {
      return;
    }

    setEditingPolicy({
      ...editingPolicy,
      [key]: value,
    });
  };

  const handleSavePolicy = () => {
    if (!editingPolicy) {
      return;
    }

    const isExisting = policies.some((policy) => policy.id === editingPolicy.id);

    const duplicatePolicy = policies.find(
      (policy) =>
        policy.id !== editingPolicy.id &&
        policy.companyName === editingPolicy.companyName &&
        policy.employeeType === editingPolicy.employeeType,
    );

    if (duplicatePolicy) {
      setMessage(
        "A leave policy already exists for this company and employee type.",
      );
      return;
    }

    const updatedPolicies = isExisting
      ? policies.map((policy) =>
          policy.id === editingPolicy.id ? editingPolicy : policy,
        )
      : [editingPolicy, ...policies];

    setPolicies(updatedPolicies);
    savePolicies(updatedPolicies);
    setShowForm(false);
    setEditingPolicy(null);
    setMessage("Leave policy saved successfully.");
  };

  return (
    <section className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            HR Portal / Leave Policy
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Leave Policy
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage company leave rules for casual, annual, sick and half-day
            leave.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          Add Leave Policy
        </button>
      </div>

      {message && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          {message}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <HiOutlineCalendarDays size={24} />
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Policies
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(visiblePolicies.length).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <HiOutlineCheckCircle size={24} />
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">
            Active Policies
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(activePolicyCount).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <HiOutlineIdentification size={24} />
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">
            Full-time Policies
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(fullTimePolicyCount).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <HiOutlineClock size={24} />
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">
            Half-day Allowed
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(halfDayAllowedCount).padStart(2, "0")}
          </h3>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Company Filter
            </label>

            <select
              value={selectedCompany}
              disabled={user.role === "COMPANY_HR"}
              onChange={(event) => setSelectedCompany(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
            >
              {user.role === "GROUP_HR" && (
                <option value="All Companies">All Companies</option>
              )}

              {companyOptions.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <HiOutlineBuildingOffice2 className="text-blue-600" size={23} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                  Access Scope
                </p>
                <p className="mt-1 text-sm font-bold text-blue-950">
                  {user.role === "GROUP_HR"
                    ? "All companies"
                    : user.companyName}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <HiOutlineShieldCheck className="text-slate-600" size={23} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Editable By
                </p>
                <p className="mt-1 text-sm font-bold text-slate-950">
                  Group HR / Company HR
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && editingPolicy && (
  <div
    ref={formRef}
    className="rounded-3xl border border-blue-100 bg-white shadow-sm"
  >
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              {policies.some((policy) => policy.id === editingPolicy.id)
                ? "Edit Leave Policy"
                : "Add Leave Policy"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Configure leave allowance based on company and employee type.
            </p>
          </div>

          {message && (
            <div className="mx-6 mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              {message}
            </div>
          )}

          <div className="grid gap-5 p-6 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Company
              </label>

              <select
                value={editingPolicy.companyName}
                disabled={user.role === "COMPANY_HR"}
                onChange={(event) =>
                  updateEditingPolicy("companyName", event.target.value)
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
              >
                {companyOptions.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Employee Type
              </label>

              <select
                value={editingPolicy.employeeType}
                onChange={(event) =>
                  updateEditingPolicy(
                    "employeeType",
                    event.target.value as LeavePolicy["employeeType"],
                  )
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                {employeeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                value={editingPolicy.status}
                onChange={(event) =>
                  updateEditingPolicy(
                    "status",
                    event.target.value as LeavePolicy["status"],
                  )
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Casual Leave Days
              </label>

              <input
                type="number"
                min={0}
                value={editingPolicy.casualLeaveDays}
                onChange={(event) =>
                  updateEditingPolicy(
                    "casualLeaveDays",
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Annual Leave Days
              </label>

              <input
                type="number"
                min={0}
                value={editingPolicy.annualLeaveDays}
                onChange={(event) =>
                  updateEditingPolicy(
                    "annualLeaveDays",
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Sick Leave Days
              </label>

              <input
                type="number"
                min={0}
                value={editingPolicy.sickLeaveDays}
                onChange={(event) =>
                  updateEditingPolicy(
                    "sickLeaveDays",
                    Number(event.target.value),
                  )
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 p-6 md:grid-cols-3">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-semibold text-slate-700">
                Half-day leave allowed
              </span>
              <input
                type="checkbox"
                checked={editingPolicy.halfDayAllowed}
                onChange={(event) =>
                  updateEditingPolicy("halfDayAllowed", event.target.checked)
                }
                className="size-5 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-semibold text-slate-700">
                Probation leave allowed
              </span>
              <input
                type="checkbox"
                checked={editingPolicy.probationLeaveAllowed}
                onChange={(event) =>
                  updateEditingPolicy(
                    "probationLeaveAllowed",
                    event.target.checked,
                  )
                }
                className="size-5 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-semibold text-slate-700">
                Carry forward allowed
              </span>
              <input
                type="checkbox"
                checked={editingPolicy.carryForwardAllowed}
                onChange={(event) =>
                  updateEditingPolicy("carryForwardAllowed", event.target.checked)
                }
                className="size-5 accent-blue-600"
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
            <button
              type="button"
              onClick={closeForm}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSavePolicy}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Save Policy
            </button>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-950">
            Leave Policy List
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Company-wise and employee-type-wise leave allowance rules.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Employee Type</th>
                <th className="px-6 py-4 font-semibold">Casual</th>
                <th className="px-6 py-4 font-semibold">Annual</th>
                <th className="px-6 py-4 font-semibold">Sick</th>
                <th className="px-6 py-4 font-semibold">Half Day</th>
                <th className="px-6 py-4 font-semibold">Probation Leave</th>
                <th className="px-6 py-4 font-semibold">Carry Forward</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {visiblePolicies.map((policy) => (
                <tr
                  key={policy.id}
                  className="text-sm transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-950">
                      {policy.companyName}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {policy.employeeType}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {policy.casualLeaveDays} days
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {policy.annualLeaveDays} days
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {policy.sickLeaveDays} days
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        policy.halfDayAllowed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {policy.halfDayAllowed ? "Allowed" : "No"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        policy.probationLeaveAllowed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {policy.probationLeaveAllowed ? "Allowed" : "No"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        policy.carryForwardAllowed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {policy.carryForwardAllowed ? "Allowed" : "No"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        policy.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {policy.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => openEditForm(policy)}
                      className="rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {visiblePolicies.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-6 py-8 text-center text-sm text-slate-500">
                    No leave policies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h3 className="text-lg font-bold text-blue-950">
          Leave policy logic
        </h3>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
          Leave policy is company-based and employee-type-based. Company HR can
          edit only their assigned company policy. Group HR can manage leave
          policies for all companies.
        </p>
      </div>
    </section>
  );
}

export default LeavePolicyPage;