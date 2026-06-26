import {
    HiOutlineBriefcase,
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineUserGroup,
    HiOutlineUsers,
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
  
  const roleLabels: Record<PortalRole, string> = {
    OWNER_DIRECTOR: "Owner / Director",
    COMPANY_HEAD: "Company Head",
    GROUP_HR: "Group HR",
    COMPANY_HR: "Company HR",
    EMPLOYEE: "Employee",
  };
  
  function getDashboardCards(role: PortalRole) {
    if (role === "OWNER_DIRECTOR") {
      return [
        { title: "Companies", value: "05", icon: HiOutlineBuildingOffice2 },
        { title: "Employees", value: "286", icon: HiOutlineUsers },
        { title: "Pending Leave", value: "12", icon: HiOutlineCalendarDays },
        { title: "Reports", value: "08", icon: HiOutlineBriefcase },
      ];
    }
  
    if (role === "COMPANY_HEAD") {
      return [
        { title: "My Company", value: "01", icon: HiOutlineBuildingOffice2 },
        { title: "Team Members", value: "42", icon: HiOutlineUsers },
        { title: "Leave to Approve", value: "06", icon: HiOutlineCalendarDays },
        { title: "Approved This Month", value: "18", icon: HiOutlineBriefcase },
      ];
    }
  
    if (role === "GROUP_HR") {
      return [
        { title: "Companies", value: "05", icon: HiOutlineBuildingOffice2 },
        { title: "Employees", value: "286", icon: HiOutlineUsers },
        { title: "Leave Requests", value: "24", icon: HiOutlineCalendarDays },
        { title: "Departments", value: "14", icon: HiOutlineUserGroup },
      ];
    }
  
    if (role === "COMPANY_HR") {
      return [
        { title: "Employees", value: "42", icon: HiOutlineUsers },
        { title: "Leave Requests", value: "08", icon: HiOutlineCalendarDays },
        { title: "Departments", value: "04", icon: HiOutlineUserGroup },
        { title: "Company Reports", value: "03", icon: HiOutlineBriefcase },
      ];
    }
  
    return [
      { title: "Leave Balance", value: "14", icon: HiOutlineCalendarDays },
      { title: "Pending Requests", value: "01", icon: HiOutlineBriefcase },
      { title: "Approved Leave", value: "06", icon: HiOutlineUsers },
      { title: "Profile Status", value: "90%", icon: HiOutlineUserGroup },
    ];
  }
  
  function getMainMessage(role: PortalRole) {
    if (role === "OWNER_DIRECTOR") {
      return "View organization performance, company summaries, employee counts and leave overview.";
    }
  
    if (role === "COMPANY_HEAD") {
      return "Approve or reject leave requests for your assigned company or team.";
    }
  
    if (role === "GROUP_HR") {
      return "Manage HR operations across all companies under this organization.";
    }
  
    if (role === "COMPANY_HR") {
      return "Manage employees and leave records for your assigned company.";
    }
  
    return "View your profile, apply leave and track your leave request status.";
  }
  
  function DashboardPage() {
    const authData = localStorage.getItem("portalAuth");
    const user = authData ? (JSON.parse(authData) as AuthUser) : null;
  
    if (!user) {
      return null;
    }
  
    const cards = getDashboardCards(user.role);
  
    return (
      <section className="space-y-6 p-6 lg:p-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-blue-600">
            {roleLabels[user.role]} Dashboard
          </p>
  
          <h1 className="mt-2 text-2xl font-bold text-slate-950">
            Welcome, {user.fullName}
          </h1>
  
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {getMainMessage(user.role)}
          </p>
        </div>
  
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
  
            return (
              <div
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={25} />
                </div>
  
                <p className="mt-5 text-sm font-medium text-slate-500">
                  {card.title}
                </p>
  
                <h3 className="mt-2 text-4xl font-bold text-slate-950">
                  {card.value}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  
  export default DashboardPage;