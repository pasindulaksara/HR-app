import {
    HiOutlineBuildingOffice2,
    HiOutlineCreditCard,
    HiOutlineSquares2X2,
    HiOutlineUsers,
} from "react-icons/hi2";
import { Link } from "react-router";

const stats = [
    {
        label: "Organizations",
        value: "04",
        change: "+2 this month",
        icon: HiOutlineBuildingOffice2,
    },
    {
        label: "Companies",
        value: "18",
        change: "Across all clients",
        icon: HiOutlineSquares2X2,
    },
    {
        label: "Employees",
        value: "286",
        change: "+34 active users",
        icon: HiOutlineUsers,
    },
    {
        label: "Active Plans",
        value: "04",
        change: "No expired plans",
        icon: HiOutlineCreditCard,
    },
];

const organizations = [
    {
        name: "3DH Group",
        companies: 5,
        employees: 86,
        plan: "Business",
        status: "Active",
    },
    {
        name: "ABC Holdings",
        companies: 3,
        employees: 64,
        plan: "Starter",
        status: "Active",
    },
    {
        name: "Nova Technologies",
        companies: 2,
        employees: 42,
        plan: "Business",
        status: "Active",
    },
    {
        name: "Metro Logistics",
        companies: 1,
        employees: 28,
        plan: "Starter",
        status: "Trial",
    },
];

function DashboardPage() {
    return (
        <>
            <header className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            Super Admin Dashboard
                        </p>
                        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                            Platform Overview
                        </h2>
                    </div>

                    <Link
                        to="/organizations"
                        className="w-fit rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                        Add Organization
                    </Link>
                </div>
            </header>

            <div className="p-6 lg:p-8">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <article
                                key={stat.label}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Icon size={25} />
                                    </div>

                                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        Active
                                    </span>
                                </div>

                                <p className="mt-6 text-sm font-medium text-slate-500">
                                    {stat.label}
                                </p>
                                <h3 className="mt-2 text-4xl font-bold text-slate-950">
                                    {stat.value}
                                </h3>
                                <p className="mt-2 text-sm text-slate-500">{stat.change}</p>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-950">
                                Recent Organizations
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Manage client organizations registered in the HR platform.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="w-fit rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">
                            <thead className="bg-slate-50 text-sm text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Organization</th>
                                    <th className="px-6 py-4 font-semibold">Companies</th>
                                    <th className="px-6 py-4 font-semibold">Employees</th>
                                    <th className="px-6 py-4 font-semibold">Plan</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {organizations.map((organization) => (
                                    <tr key={organization.name} className="text-sm">
                                        <td className="px-6 py-5 font-semibold text-slate-950">
                                            {organization.name}
                                        </td>
                                        <td className="px-6 py-5 text-slate-600">
                                            {organization.companies}
                                        </td>
                                        <td className="px-6 py-5 text-slate-600">
                                            {organization.employees}
                                        </td>
                                        <td className="px-6 py-5 text-slate-600">
                                            {organization.plan}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                                {organization.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;