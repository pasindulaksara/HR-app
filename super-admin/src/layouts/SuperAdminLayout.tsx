import { NavLink, Outlet, useNavigate } from "react-router";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBuildingOffice2,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineCreditCard,
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineUsers,
} from "react-icons/hi2";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
  {
    label: "Organizations",
    path: "/organizations",
    icon: HiOutlineBuildingOffice2,
  },
  { label: "Companies", path: "/companies", icon: HiOutlineSquares2X2 },
  { label: "Users", path: "/users", icon: HiOutlineUsers },
  { label: "Plans", path: "/plans", icon: HiOutlineCreditCard },
  { label: "Reports", path: "/reports", icon: HiOutlineChartBar },
  { label: "Settings", path: "/settings", icon: HiOutlineCog6Tooth },
];

function SuperAdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("superAdminAuth");
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
            <h1 className="text-lg font-bold text-slate-950">HR Admin</h1>
            <p className="text-sm text-slate-500">Platform Control</p>
          </div>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          {menuItems.map((item) => {
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
        <Outlet />
      </section>
    </main>
  );
}

export default SuperAdminLayout;