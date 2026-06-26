import { useState, type ChangeEvent, type FormEvent } from "react";
import {
    HiOutlineBuildingOffice2,
    HiOutlineMagnifyingGlass,
    HiOutlinePlus,
    HiOutlineXMark,
} from "react-icons/hi2";
import { Link } from "react-router";

type OrganizationStatus = "Active" | "Trial" | "Suspended" | "Inactive";

type Organization = {
    id: string;
    name: string;
    owner: string;
    email: string;
    phone: string;
    companies: number;
    employees: number;
    plan: string;
    status: OrganizationStatus;
};

type OrganizationForm = {
    name: string;
    owner: string;
    email: string;
    phone: string;
    plan: string;
    status: OrganizationStatus;
};

const initialOrganizations: Organization[] = [
    {
        id: "ORG-001",
        name: "3DH Group",
        owner: "Shamal Rodrigo",
        email: "admin@3dhgroup.com",
        phone: "+94 77 000 0000",
        companies: 5,
        employees: 86,
        plan: "Business",
        status: "Active",
    },
    {
        id: "ORG-002",
        name: "ABC Holdings",
        owner: "Nimal Perera",
        email: "admin@abcholdings.com",
        phone: "+94 77 111 1111",
        companies: 3,
        employees: 64,
        plan: "Starter",
        status: "Active",
    },
    {
        id: "ORG-003",
        name: "Nova Technologies",
        owner: "Kasun Silva",
        email: "admin@novatech.com",
        phone: "+94 77 222 2222",
        companies: 2,
        employees: 42,
        plan: "Business",
        status: "Active",
    },
    {
        id: "ORG-004",
        name: "Metro Logistics",
        owner: "Dilshan Fernando",
        email: "admin@metrologistics.com",
        phone: "+94 77 333 3333",
        companies: 1,
        employees: 28,
        plan: "Trial",
        status: "Trial",
    },
];

const initialFormState: OrganizationForm = {
    name: "",
    owner: "",
    email: "",
    phone: "",
    plan: "Starter",
    status: "Active",
};

function OrganizationsPage() {
    const [organizations, setOrganizations] =
        useState<Organization[]>(initialOrganizations);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState<OrganizationForm>(initialFormState);

    const filteredOrganizations = organizations.filter((organization) => {
        const searchValue = searchTerm.toLowerCase();

        return (
            organization.name.toLowerCase().includes(searchValue) ||
            organization.owner.toLowerCase().includes(searchValue) ||
            organization.email.toLowerCase().includes(searchValue) ||
            organization.plan.toLowerCase().includes(searchValue) ||
            organization.status.toLowerCase().includes(searchValue)
        );
    });

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name.trim() || !formData.owner.trim() || !formData.email.trim()) {
            return;
        }

        setOrganizations((currentOrganizations) => {
            const nextNumber = currentOrganizations.length + 1;

            const newOrganization: Organization = {
                id: `ORG-${String(nextNumber).padStart(3, "0")}`,
                name: formData.name,
                owner: formData.owner,
                email: formData.email,
                phone: formData.phone,
                companies: 0,
                employees: 0,
                plan: formData.plan,
                status: formData.status,
            };

            return [newOrganization, ...currentOrganizations];
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
                            Super Admin / Organizations
                        </p>
                        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                            Organizations
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                        <HiOutlinePlus size={20} />
                        Add Organization
                    </button>
                </div>
            </header>

            <div className="p-6 lg:p-8">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <HiOutlineBuildingOffice2 size={26} />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-950">
                                    Registered Organizations
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    View and manage all client organizations in the platform.
                                </p>
                            </div>
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
                                placeholder="Search organization..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left">
                            <thead className="bg-slate-50 text-sm text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Organization</th>
                                    <th className="px-6 py-4 font-semibold">Owner</th>
                                    <th className="px-6 py-4 font-semibold">Companies</th>
                                    <th className="px-6 py-4 font-semibold">Employees</th>
                                    <th className="px-6 py-4 font-semibold">Plan</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredOrganizations.map((organization) => (
                                    <tr
                                        key={organization.id}
                                        className="text-sm transition hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-5">
                                            <p className="font-semibold text-slate-950">
                                                {organization.name}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {organization.email}
                                            </p>
                                        </td>

                                        <td className="px-6 py-5 text-slate-600">
                                            {organization.owner}
                                        </td>

                                        <td className="px-6 py-5 text-slate-600">
                                            {organization.companies}
                                        </td>

                                        <td className="px-6 py-5 text-slate-600">
                                            {organization.employees}
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                                {organization.plan}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${organization.status === "Active"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : organization.status === "Trial"
                                                            ? "bg-amber-50 text-amber-700"
                                                            : organization.status === "Suspended"
                                                                ? "bg-red-50 text-red-700"
                                                                : "bg-slate-100 text-slate-700"
                                                    }`}
                                            >
                                                {organization.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <Link
                                                to={`/organizations/${organization.id}`}
                                                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white hover:text-blue-600"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {filteredOrganizations.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-10 text-center text-sm text-slate-500"
                                        >
                                            No organizations found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                            <div>
                                <h3 className="text-xl font-bold text-slate-950">
                                    Add Organization
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Create a new client organization in the HR platform.
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

                        <form className="space-y-5 p-6" onSubmit={handleSubmit}>
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Organization Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Example: 3DH Group"
                                        required
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Owner Name
                                    </label>
                                    <input
                                        type="text"
                                        name="owner"
                                        value={formData.owner}
                                        onChange={handleInputChange}
                                        placeholder="Example: Shamal Rodrigo"
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
                                        placeholder="admin@company.com"
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
                                        Subscription Plan
                                    </label>
                                    <select
                                        name="plan"
                                        value={formData.plan}
                                        onChange={handleInputChange}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    >
                                        <option>Starter</option>
                                        <option>Business</option>
                                        <option>Enterprise</option>
                                        <option>Trial</option>
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
                                        <option>Trial</option>
                                        <option>Suspended</option>
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
                                    Save Organization
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default OrganizationsPage;