import { useState } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineBuildingOffice2,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";

type PlanStatus = "Active" | "Inactive";

type Plan = {
  id: string;
  name: string;
  code: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxCompanies: number;
  maxEmployees: number;
  maxUsers: number;
  trialDays: number;
  supportLevel: string;
  publicSignup: boolean;
  approvalRequired: boolean;
  status: PlanStatus;
  features: string[];
};

const STORAGE_KEY = "superAdminPlans";

const defaultPlans: Plan[] = [
  {
    id: "PLAN-001",
    name: "Trial",
    code: "TRIAL",
    monthlyPrice: 0,
    yearlyPrice: 0,
    maxCompanies: 1,
    maxEmployees: 25,
    maxUsers: 3,
    trialDays: 14,
    supportLevel: "Basic support",
    publicSignup: true,
    approvalRequired: true,
    status: "Active",
    features: [
      "1 company",
      "Up to 25 employees",
      "Employee profiles",
      "Leave management",
      "Basic reports",
    ],
  },
  {
    id: "PLAN-002",
    name: "Starter",
    code: "STARTER",
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    maxCompanies: 1,
    maxEmployees: 75,
    maxUsers: 6,
    trialDays: 0,
    supportLevel: "Email support",
    publicSignup: true,
    approvalRequired: true,
    status: "Active",
    features: [
      "1 company",
      "Up to 75 employees",
      "Departments",
      "Leave policies",
      "HR reports",
    ],
  },
  {
    id: "PLAN-003",
    name: "Business",
    code: "BUSINESS",
    monthlyPrice: 35000,
    yearlyPrice: 350000,
    maxCompanies: 5,
    maxEmployees: 300,
    maxUsers: 20,
    trialDays: 0,
    supportLevel: "Priority support",
    publicSignup: true,
    approvalRequired: true,
    status: "Active",
    features: [
      "Up to 5 companies",
      "Up to 300 employees",
      "Group HR access",
      "Company HR access",
      "Advanced reports",
    ],
  },
  {
    id: "PLAN-004",
    name: "Enterprise",
    code: "ENTERPRISE",
    monthlyPrice: 0,
    yearlyPrice: 0,
    maxCompanies: 999,
    maxEmployees: 9999,
    maxUsers: 999,
    trialDays: 0,
    supportLevel: "Dedicated support",
    publicSignup: false,
    approvalRequired: true,
    status: "Active",
    features: [
      "Custom company limit",
      "Custom employee limit",
      "Dedicated support",
      "Custom workflows",
      "Custom billing",
    ],
  },
];

function getStoredPlans() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlans));
    return defaultPlans;
  }

  try {
    return JSON.parse(storedData) as Plan[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlans));
    return defaultPlans;
  }
}

function savePlans(plans: Plan[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

function createPlanId() {
  return `PLAN-${Date.now()}`;
}

function formatPrice(price: number) {
  if (price === 0) {
    return "Custom / Free";
  }

  return `LKR ${price.toLocaleString()}`;
}

function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(getStoredPlans);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const activePlans = plans.filter((plan) => plan.status === "Active").length;
  const publicSignupPlans = plans.filter((plan) => plan.publicSignup).length;
  const approvalRequiredPlans = plans.filter(
    (plan) => plan.approvalRequired,
  ).length;

  const filteredPlans = plans.filter((plan) => {
    const keyword = searchTerm.toLowerCase();

    return (
      plan.name.toLowerCase().includes(keyword) ||
      plan.code.toLowerCase().includes(keyword) ||
      plan.supportLevel.toLowerCase().includes(keyword)
    );
  });

  const emptyPlan: Plan = {
    id: createPlanId(),
    name: "",
    code: "",
    monthlyPrice: 0,
    yearlyPrice: 0,
    maxCompanies: 1,
    maxEmployees: 25,
    maxUsers: 3,
    trialDays: 0,
    supportLevel: "Basic support",
    publicSignup: true,
    approvalRequired: true,
    status: "Active",
    features: ["Employee profiles", "Leave management", "Basic reports"],
  };

  const openCreateForm = () => {
    setEditingPlan({
      ...emptyPlan,
      id: createPlanId(),
    });
    setShowForm(true);
    setMessage("");
  };

  const openEditForm = (plan: Plan) => {
    setEditingPlan(plan);
    setShowForm(true);
    setMessage("");
  };

  const closeForm = () => {
    setEditingPlan(null);
    setShowForm(false);
    setMessage("");
  };

  const updateEditingPlan = <K extends keyof Plan>(key: K, value: Plan[K]) => {
    if (!editingPlan) {
      return;
    }

    setEditingPlan({
      ...editingPlan,
      [key]: value,
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingPlan) {
      return;
    }

    const updatedFeatures = editingPlan.features.map((feature, featureIndex) =>
      featureIndex === index ? value : feature,
    );

    setEditingPlan({
      ...editingPlan,
      features: updatedFeatures,
    });
  };

  const addFeature = () => {
    if (!editingPlan) {
      return;
    }

    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, ""],
    });
  };

  const removeFeature = (index: number) => {
    if (!editingPlan) {
      return;
    }

    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, featureIndex) => {
        return featureIndex !== index;
      }),
    });
  };

  const handleSavePlan = () => {
    if (!editingPlan) {
      return;
    }

    if (!editingPlan.name.trim()) {
      setMessage("Plan name is required.");
      return;
    }

    if (!editingPlan.code.trim()) {
      setMessage("Plan code is required.");
      return;
    }

    const duplicatePlan = plans.find(
      (plan) =>
        plan.id !== editingPlan.id &&
        plan.code.toLowerCase() === editingPlan.code.toLowerCase(),
    );

    if (duplicatePlan) {
      setMessage("A plan with this code already exists.");
      return;
    }

    const cleanedPlan: Plan = {
      ...editingPlan,
      code: editingPlan.code.toUpperCase().replace(/\s+/g, "_"),
      features: editingPlan.features.filter((feature) => feature.trim()),
    };

    const isExisting = plans.some((plan) => plan.id === cleanedPlan.id);

    const updatedPlans = isExisting
      ? plans.map((plan) => (plan.id === cleanedPlan.id ? cleanedPlan : plan))
      : [cleanedPlan, ...plans];

    setPlans(updatedPlans);
    savePlans(updatedPlans);
    setEditingPlan(null);
    setShowForm(false);
    setMessage("Plan saved successfully.");
  };

  return (
    <section className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Super Admin / Plans
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Plans
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage SaaS plans, client limits, trial rules and public
            registration availability.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <HiOutlinePlus size={20} />
          Add Plan
        </button>
      </div>

      {message && !showForm && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          {message}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <HiOutlineBanknotes size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Plans
          </p>

          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(plans.length).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <HiOutlineCheckCircle size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Active Plans
          </p>

          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(activePlans).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <HiOutlineUsers size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Public Signup
          </p>

          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(publicSignupPlans).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <HiOutlineShieldCheck size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Approval Required
          </p>

          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(approvalRequiredPlans).padStart(2, "0")}
          </h3>
        </div>
      </div>

      {showForm && editingPlan && (
        <div className="rounded-3xl border border-blue-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                {plans.some((plan) => plan.id === editingPlan.id)
                  ? "Edit Plan"
                  : "Add Plan"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Configure plan limits, pricing and signup rules.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <HiOutlineXMark size={22} />
            </button>
          </div>

          {message && (
            <div className="mx-6 mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              {message}
            </div>
          )}

          <div className="grid gap-5 p-6 md:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Plan Name
              </label>

              <input
                type="text"
                value={editingPlan.name}
                onChange={(event) =>
                  updateEditingPlan("name", event.target.value)
                }
                placeholder="Example: Business"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Plan Code
              </label>

              <input
                type="text"
                value={editingPlan.code}
                onChange={(event) =>
                  updateEditingPlan("code", event.target.value)
                }
                placeholder="Example: BUSINESS"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                value={editingPlan.status}
                onChange={(event) =>
                  updateEditingPlan(
                    "status",
                    event.target.value as PlanStatus,
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
                Monthly Price
              </label>

              <input
                type="number"
                min={0}
                value={editingPlan.monthlyPrice}
                onChange={(event) =>
                  updateEditingPlan("monthlyPrice", Number(event.target.value))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Yearly Price
              </label>

              <input
                type="number"
                min={0}
                value={editingPlan.yearlyPrice}
                onChange={(event) =>
                  updateEditingPlan("yearlyPrice", Number(event.target.value))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Trial Days
              </label>

              <input
                type="number"
                min={0}
                value={editingPlan.trialDays}
                onChange={(event) =>
                  updateEditingPlan("trialDays", Number(event.target.value))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Max Companies
              </label>

              <input
                type="number"
                min={1}
                value={editingPlan.maxCompanies}
                onChange={(event) =>
                  updateEditingPlan("maxCompanies", Number(event.target.value))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Max Employees
              </label>

              <input
                type="number"
                min={1}
                value={editingPlan.maxEmployees}
                onChange={(event) =>
                  updateEditingPlan("maxEmployees", Number(event.target.value))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Max Users
              </label>

              <input
                type="number"
                min={1}
                value={editingPlan.maxUsers}
                onChange={(event) =>
                  updateEditingPlan("maxUsers", Number(event.target.value))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Support Level
              </label>

              <input
                type="text"
                value={editingPlan.supportLevel}
                onChange={(event) =>
                  updateEditingPlan("supportLevel", event.target.value)
                }
                placeholder="Example: Priority support"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 p-6 md:grid-cols-2">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-semibold text-slate-700">
                Allow public registration from landing page
              </span>

              <input
                type="checkbox"
                checked={editingPlan.publicSignup}
                onChange={(event) =>
                  updateEditingPlan("publicSignup", event.target.checked)
                }
                className="size-5 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm font-semibold text-slate-700">
                Require Super Admin approval
              </span>

              <input
                type="checkbox"
                checked={editingPlan.approvalRequired}
                onChange={(event) =>
                  updateEditingPlan("approvalRequired", event.target.checked)
                }
                className="size-5 accent-blue-600"
              />
            </label>
          </div>

          <div className="border-t border-slate-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-950">
                  Plan Features
                </h4>
                <p className="mt-1 text-sm text-slate-500">
                  Features shown internally and later on landing signup.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
              >
                Add Feature
              </button>
            </div>

            <div className="space-y-3">
              {editingPlan.features.map((feature, index) => (
                <div key={`${feature}-${index}`} className="flex gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(event) => updateFeature(index, event.target.value)}
                    placeholder="Example: Advanced reports"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="rounded-2xl border border-red-100 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {editingPlan.features.length === 0 && (
                <p className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                  No features added yet.
                </p>
              )}
            </div>
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
              onClick={handleSavePlan}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Save Plan
            </button>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-950">
              Plan List
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Pricing plans, limits and signup rules.
            </p>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search plan..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 lg:max-w-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Monthly</th>
                <th className="px-6 py-4 font-semibold">Yearly</th>
                <th className="px-6 py-4 font-semibold">Companies</th>
                <th className="px-6 py-4 font-semibold">Employees</th>
                <th className="px-6 py-4 font-semibold">Users</th>
                <th className="px-6 py-4 font-semibold">Trial</th>
                <th className="px-6 py-4 font-semibold">Signup</th>
                <th className="px-6 py-4 font-semibold">Approval</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="text-sm transition hover:bg-slate-50">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-950">{plan.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{plan.code}</p>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {formatPrice(plan.monthlyPrice)}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {formatPrice(plan.yearlyPrice)}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {plan.maxCompanies === 999 ? "Custom" : plan.maxCompanies}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {plan.maxEmployees === 9999 ? "Custom" : plan.maxEmployees}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {plan.maxUsers === 999 ? "Custom" : plan.maxUsers}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {plan.trialDays > 0 ? `${plan.trialDays} days` : "No trial"}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        plan.publicSignup
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {plan.publicSignup ? "Allowed" : "Disabled"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        plan.approvalRequired
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {plan.approvalRequired ? "Required" : "Auto"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        plan.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => openEditForm(plan)}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                    >
                      <HiOutlinePencilSquare size={16} />
                      Manage
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPlans.length === 0 && (
                <tr>
                  <td
                    colSpan={11}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h3 className="text-lg font-bold text-blue-950">
          Future landing signup logic
        </h3>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
          Plans will control future public registration from the landing page.
          A user can register an organization and first company under an allowed
          plan. If approval is required, Super Admin must approve before the
          company becomes active.
        </p>
      </div>
    </section>
  );
}

export default PlansPage;