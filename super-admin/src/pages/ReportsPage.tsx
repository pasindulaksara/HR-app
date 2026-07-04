import {
    HiOutlineArrowTrendingUp,
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineCreditCard,
    HiOutlineShieldCheck,
    HiOutlineUsers,
  } from "react-icons/hi2";
  
  type OrganizationReport = {
    name: string;
    companies: number;
    employees: number;
    plan: "Trial" | "Starter" | "Business" | "Enterprise";
    status: "Active" | "Trial" | "Pending" | "Inactive";
    registeredDate: string;
  };
  
  type PlanUsage = {
    plan: string;
    organizations: number;
    companies: number;
    employees: number;
    status: "Active" | "Inactive";
  };
  
  type Activity = {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "organization" | "company" | "plan" | "user";
  };
  
  const organizationReports: OrganizationReport[] = [
    {
      name: "Demo Group",
      companies: 5,
      employees: 86,
      plan: "Business",
      status: "Active",
      registeredDate: "2026-06-01",
    },
    {
      name: "Sample Holdings",
      companies: 3,
      employees: 64,
      plan: "Starter",
      status: "Active",
      registeredDate: "2026-06-08",
    },
    {
      name: "Nova Technologies",
      companies: 2,
      employees: 42,
      plan: "Business",
      status: "Active",
      registeredDate: "2026-06-15",
    },
    {
      name: "Metro Logistics",
      companies: 1,
      employees: 28,
      plan: "Trial",
      status: "Trial",
      registeredDate: "2026-06-24",
    },
    {
      name: "Future Care Services",
      companies: 1,
      employees: 0,
      plan: "Trial",
      status: "Pending",
      registeredDate: "2026-07-01",
    },
  ];
  
  const planUsage: PlanUsage[] = [
    {
      plan: "Trial",
      organizations: 2,
      companies: 2,
      employees: 28,
      status: "Active",
    },
    {
      plan: "Starter",
      organizations: 1,
      companies: 3,
      employees: 64,
      status: "Active",
    },
    {
      plan: "Business",
      organizations: 2,
      companies: 7,
      employees: 128,
      status: "Active",
    },
    {
      plan: "Enterprise",
      organizations: 0,
      companies: 0,
      employees: 0,
      status: "Active",
    },
  ];
  
  const recentActivities: Activity[] = [
    {
      id: "ACT-001",
      title: "New organization registered",
      description: "Future Care Services is waiting for approval.",
      time: "Today",
      type: "organization",
    },
    {
      id: "ACT-002",
      title: "Company added",
      description: "A new company was added under Demo Group.",
      time: "Yesterday",
      type: "company",
    },
    {
      id: "ACT-003",
      title: "Plan updated",
      description: "Business plan limits were reviewed.",
      time: "2 days ago",
      type: "plan",
    },
    {
      id: "ACT-004",
      title: "Platform user active",
      description: "Support user logged into Super Admin dashboard.",
      time: "3 days ago",
      type: "user",
    },
  ];
  
  function getStatusClass(status: OrganizationReport["status"] | PlanUsage["status"]) {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-700";
    }
  
    if (status === "Trial") {
      return "bg-amber-50 text-amber-700";
    }
  
    if (status === "Pending") {
      return "bg-blue-50 text-blue-700";
    }
  
    return "bg-slate-100 text-slate-600";
  }
  
  function getPlanClass(plan: OrganizationReport["plan"] | string) {
    if (plan === "Business") {
      return "bg-blue-50 text-blue-700";
    }
  
    if (plan === "Enterprise") {
      return "bg-purple-50 text-purple-700";
    }
  
    if (plan === "Starter") {
      return "bg-slate-100 text-slate-700";
    }
  
    return "bg-amber-50 text-amber-700";
  }
  
  function getActivityIcon(type: Activity["type"]) {
    if (type === "organization") {
      return HiOutlineBuildingOffice2;
    }
  
    if (type === "company") {
      return HiOutlineUsers;
    }
  
    if (type === "plan") {
      return HiOutlineCreditCard;
    }
  
    return HiOutlineShieldCheck;
  }
  
  function ReportsPage() {
    const totalOrganizations = organizationReports.length;
  
    const totalCompanies = organizationReports.reduce(
      (total, organization) => total + organization.companies,
      0,
    );
  
    const totalEmployees = organizationReports.reduce(
      (total, organization) => total + organization.employees,
      0,
    );
  
    const activeOrganizations = organizationReports.filter(
      (organization) => organization.status === "Active",
    ).length;
  
    const trialOrganizations = organizationReports.filter(
      (organization) => organization.status === "Trial",
    ).length;
  
    const pendingOrganizations = organizationReports.filter(
      (organization) => organization.status === "Pending",
    ).length;
  
    const activePlans = planUsage.filter((plan) => plan.status === "Active").length;
  
    const averageEmployeesPerCompany =
      totalCompanies > 0 ? Math.round(totalEmployees / totalCompanies) : 0;
  
    return (
      <section className="space-y-6 p-6 lg:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Super Admin / Reports
          </p>
  
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Reports
          </h1>
  
          <p className="mt-2 text-sm text-slate-500">
            Platform-level overview of organizations, companies, plans and client
            activity.
          </p>
        </div>
  
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineBuildingOffice2 size={24} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Organizations
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(totalOrganizations).padStart(2, "0")}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <HiOutlineUsers size={24} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Companies
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(totalCompanies).padStart(2, "0")}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <HiOutlineCheckCircle size={24} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Active Clients
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(activeOrganizations).padStart(2, "0")}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <HiOutlineClock size={24} />
            </div>
  
            <p className="mt-5 text-sm font-medium text-slate-500">
              Pending / Trial
            </p>
  
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(pendingOrganizations + trialOrganizations).padStart(2, "0")}
            </h3>
          </div>
        </div>
  
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">
                Platform Summary
              </h3>
  
              <p className="mt-1 text-sm text-slate-500">
                Main SaaS usage indicators.
              </p>
            </div>
  
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <div className="rounded-2xl bg-blue-50 p-5">
                <div className="flex items-center gap-3">
                  <HiOutlineChartBar className="text-blue-600" size={24} />
                  <p className="font-semibold text-blue-900">
                    Total Employees
                  </p>
                </div>
  
                <h4 className="mt-4 text-3xl font-bold text-blue-900">
                  {totalEmployees}
                </h4>
              </div>
  
              <div className="rounded-2xl bg-purple-50 p-5">
                <div className="flex items-center gap-3">
                  <HiOutlineArrowTrendingUp
                    className="text-purple-600"
                    size={24}
                  />
                  <p className="font-semibold text-purple-900">
                    Avg Employees / Company
                  </p>
                </div>
  
                <h4 className="mt-4 text-3xl font-bold text-purple-900">
                  {averageEmployeesPerCompany}
                </h4>
              </div>
  
              <div className="rounded-2xl bg-emerald-50 p-5">
                <div className="flex items-center gap-3">
                  <HiOutlineCreditCard
                    className="text-emerald-600"
                    size={24}
                  />
                  <p className="font-semibold text-emerald-900">
                    Active Plans
                  </p>
                </div>
  
                <h4 className="mt-4 text-3xl font-bold text-emerald-900">
                  {String(activePlans).padStart(2, "0")}
                </h4>
              </div>
  
              <div className="rounded-2xl bg-amber-50 p-5">
                <div className="flex items-center gap-3">
                  <HiOutlineCalendarDays className="text-amber-600" size={24} />
                  <p className="font-semibold text-amber-900">
                    Trial Clients
                  </p>
                </div>
  
                <h4 className="mt-4 text-3xl font-bold text-amber-900">
                  {String(trialOrganizations).padStart(2, "0")}
                </h4>
              </div>
            </div>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">
                Recent Activity
              </h3>
  
              <p className="mt-1 text-sm text-slate-500">
                Latest platform-level actions.
              </p>
            </div>
  
            <div className="space-y-3 p-6">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
  
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <Icon size={20} />
                    </div>
  
                    <div className="flex-1">
                      <p className="font-semibold text-slate-950">
                        {activity.title}
                      </p>
  
                      <p className="mt-1 text-sm text-slate-500">
                        {activity.description}
                      </p>
                    </div>
  
                    <span className="text-xs font-semibold text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Organization Report
            </h3>
  
            <p className="mt-1 text-sm text-slate-500">
              Client organizations, company count, employee count and plan status.
            </p>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Organization</th>
                  <th className="px-6 py-4 font-semibold">Companies</th>
                  <th className="px-6 py-4 font-semibold">Employees</th>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Registered</th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-slate-100">
                {organizationReports.map((organization) => (
                  <tr
                    key={organization.name}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {organization.name}
                      </p>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {organization.companies}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {organization.employees}
                    </td>
  
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getPlanClass(
                          organization.plan,
                        )}`}
                      >
                        {organization.plan}
                      </span>
                    </td>
  
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                          organization.status,
                        )}`}
                      >
                        {organization.status}
                      </span>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {organization.registeredDate}
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
              Plan Usage Report
            </h3>
  
            <p className="mt-1 text-sm text-slate-500">
              Usage summary grouped by subscription plan.
            </p>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Organizations</th>
                  <th className="px-6 py-4 font-semibold">Companies</th>
                  <th className="px-6 py-4 font-semibold">Employees</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-slate-100">
                {planUsage.map((plan) => (
                  <tr key={plan.plan} className="text-sm transition hover:bg-slate-50">
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getPlanClass(
                          plan.plan,
                        )}`}
                      >
                        {plan.plan}
                      </span>
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {plan.organizations}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {plan.companies}
                    </td>
  
                    <td className="px-6 py-5 text-slate-600">
                      {plan.employees}
                    </td>
  
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                          plan.status,
                        )}`}
                      >
                        {plan.status}
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
            Report purpose
          </h3>
  
          <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
            These reports are for platform control. They help Super Admin monitor
            client organizations, subscription plan usage, trial accounts and
            pending registrations from the future landing page signup flow.
          </p>
        </div>
      </section>
    );
  }
  
  export default ReportsPage;