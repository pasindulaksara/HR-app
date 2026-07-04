import { NavLink, Outlet, useNavigate } from "react-router";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineIdentification,
  HiOutlineSquares2X2,
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

type MenuItem = {
  label: string;
  path: string;
  icon: typeof HiOutlineHome;
  roles: PortalRole[];
};

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: HiOutlineHome,
    roles: [
      "OWNER_DIRECTOR",
      "COMPANY_HEAD",
      "GROUP_HR",
      "COMPANY_HR",
      "EMPLOYEE",
    ],
  },
  {
    label: "Companies",
    path: "/companies",
    icon: HiOutlineBuildingOffice2,
    roles: ["OWNER_DIRECTOR", "GROUP_HR"],
  },
  {
    label: "Employees",
    path: "/employees",
    icon: HiOutlineUsers,
    roles: ["OWNER_DIRECTOR", "GROUP_HR", "COMPANY_HR"],
  },
  {
    label: "Departments",
    path: "/departments",
    icon: HiOutlineSquares2X2,
    roles: ["GROUP_HR", "COMPANY_HR"],
  },
  {
    label: "Leave Requests",
    path: "/leave-requests",
    icon: HiOutlineCalendarDays,
    roles: [ "GROUP_HR", "COMPANY_HR"],
  },
  {
    label: "Leave Approvals",
    path: "/leave-approvals",
    icon: HiOutlineUserGroup,
    roles: ["COMPANY_HEAD"],
  },
  {
    label: "My Leave",
    path: "/my-leave",
    icon: HiOutlineCalendarDays,
    roles: ["COMPANY_HEAD", "GROUP_HR", "COMPANY_HR", "EMPLOYEE"],
  },
  {
    label: "Leave Policy",
    path: "/leave-policy",
    icon: HiOutlineCalendarDays,
    roles: [ "GROUP_HR", "COMPANY_HR"],
  },
  {
    label: "My Profile",
    path: "/profile",
    icon: HiOutlineIdentification,
    roles: ["OWNER_DIRECTOR","EMPLOYEE", "COMPANY_HEAD", "GROUP_HR", "COMPANY_HR"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: HiOutlineChartBar,
    roles: ["OWNER_DIRECTOR", "GROUP_HR", "COMPANY_HR"],
  },
];

const roleLabels: Record<PortalRole, string> = {
  OWNER_DIRECTOR: "Owner / Director",
  COMPANY_HEAD: "Company Head",
  GROUP_HR: "Group HR",
  COMPANY_HR: "Company HR",
  EMPLOYEE: "Employee",
};

function PortalLayout() {
  const navigate = useNavigate();

  const authData = localStorage.getItem("portalAuth");
  const user = authData ? (JSON.parse(authData) as AuthUser) : null;

  if (!user) {
    return null;
  }

  const visibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(user.role),
  );

  const handleLogout = () => {
    localStorage.removeItem("portalAuth");
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <HiOutlineBuildingOffice2 size={26} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-950">HR Portal</h1>
            <p className="text-sm text-slate-500">Client Dashboard</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-950">{user.fullName}</p>
          <p className="mt-1 text-xs font-semibold text-blue-600">
            {roleLabels[user.role]}
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            {user.organizationName}
            {user.companyName ? ` / ${user.companyName}` : ""}
          </p>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                <Icon size={22} />
                {item.label}
              </NavLink>
            );
          })}

          <button
            type="button"
            onClick={handleLogout}
            className="mt-auto flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <HiOutlineArrowRightOnRectangle size={22} />
            Logout
          </button>
        </nav>
      </aside>

      <section className="flex-1">
        <header className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              {user.organizationName}
              {user.companyName ? ` / ${user.companyName}` : ""}
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              {roleLabels[user.role]} Portal
            </h2>
          </div>
        </header>

        <Outlet />
      </section>
    </main>
  );
}

export default PortalLayout;