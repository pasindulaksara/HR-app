import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineKey,
  HiOutlineMagnifyingGlass,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";

type PlatformUserRole = "Owner" | "Admin" | "Support" | "Viewer";
type PlatformUserStatus = "Active" | "Inactive";

type PlatformUser = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: PlatformUserRole;
  status: PlatformUserStatus;
  lastLogin: string;
};

type PlatformUserForm = {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: PlatformUserRole;
  status: PlatformUserStatus;
};

const initialUsers: PlatformUser[] = [
  {
    id: "SAU-001",
    fullName: "Platform Owner",
    username: "owner.admin",
    email: "owner@example.com",
    phone: "+94 77 000 0000",
    role: "Owner",
    status: "Active",
    lastLogin: "Today",
  },
  {
    id: "SAU-002",
    fullName: "Platform Admin",
    username: "platform.admin",
    email: "admin@example.com",
    phone: "+94 77 000 0001",
    role: "Admin",
    status: "Active",
    lastLogin: "Yesterday",
  },
  {
    id: "SAU-003",
    fullName: "Support User",
    username: "support.user",
    email: "support@example.com",
    phone: "+94 77 000 0002",
    role: "Support",
    status: "Active",
    lastLogin: "2 days ago",
  },
];

const initialFormState: PlatformUserForm = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  role: "Admin",
  status: "Active",
};

const roleDescriptions: Record<PlatformUserRole, string> = {
  Owner: "Full platform access",
  Admin: "Manage organizations, companies, users and plans",
  Support: "Support client setup and view platform records",
  Viewer: "Read-only platform access",
};

function UsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] =
    useState<PlatformUserForm>(initialFormState);

  const filteredUsers = users.filter((user) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(searchValue) ||
      user.username.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.role.toLowerCase().includes(searchValue) ||
      user.status.toLowerCase().includes(searchValue)
    );
  });

  const activeUsersCount = users.filter((user) => user.status === "Active").length;
  const adminUsersCount = users.filter(
    (user) => user.role === "Owner" || user.role === "Admin",
  ).length;
  const supportUsersCount = users.filter(
    (user) => user.role === "Support",
  ).length;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return;
    }

    setUsers((currentUsers) => {
      const nextNumber = currentUsers.length + 1;

      const newUser: PlatformUser = {
        id: `SAU-${String(nextNumber).padStart(3, "0")}`,
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        lastLogin: "Not logged in yet",
      };

      return [newUser, ...currentUsers];
    });

    setFormData(initialFormState);
    setIsAddModalOpen(false);
  };

  return (
    <>
      <header className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Super Admin / Users
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              Platform Users
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Manage internal team members who can access this Super Admin dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <HiOutlinePlus size={20} />
            Add Platform User
          </button>
        </div>
      </header>

      <div className="space-y-6 p-6 lg:p-8">
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineUsers size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Total Users
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(users.length).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <HiOutlineShieldCheck size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Active Users
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(activeUsersCount).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <HiOutlineKey size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Admin Access
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(adminUsersCount).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <HiOutlineUsers size={25} />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Support Users
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(supportUsersCount).padStart(2, "0")}
            </h3>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Internal Platform Team
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                These accounts can access your Super Admin dashboard.
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
                placeholder="Search platform user..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Access Level</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Last Login</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {user.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        @{user.username}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-1 text-slate-600">
                        <p className="flex items-center gap-2">
                          <HiOutlineEnvelope size={16} />
                          {user.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <HiOutlinePhone size={16} />
                          {user.phone || "Not added"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "Owner"
                            ? "bg-slate-950 text-white"
                            : user.role === "Admin"
                              ? "bg-blue-50 text-blue-700"
                              : user.role === "Support"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {roleDescriptions[user.role]}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {user.lastLogin}
                    </td>

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white hover:text-blue-600"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No platform users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="text-lg font-bold text-blue-950">
            Platform user logic
          </h3>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
            These users are for your own team only. Client HR users should still
            be created inside each Organization Details page as Group HR or Company HR.
          </p>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Add Platform User
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Create internal access for your HR system team.
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

            <form className="space-y-5 p-6" onSubmit={handleAddUser}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Example: Platform Admin"
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
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Example: platform.admin"
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
                    placeholder="admin@example.com"
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
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Example: Admin@123"
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
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option>Owner</option>
                    <option>Admin</option>
                    <option>Support</option>
                    <option>Viewer</option>
                  </select>
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
                  Save Platform User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersPage;