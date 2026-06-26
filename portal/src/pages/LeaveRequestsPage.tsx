import { useState, type ChangeEvent } from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineXCircle,
} from "react-icons/hi2";
import type { PortalRole } from "../data/mockUsers";
import {
  getLeaveRequests,
  type LeaveRequest,
  type LeaveStatus,
} from "../data/leaveRequestsStore";

type AuthUser = {
  fullName: string;
  username: string;
  email: string;
  role: PortalRole;
  organizationName: string;
  companyName: string | null;
};

type StatusFilter = "All" | LeaveStatus;

function LeaveRequestsPage() {
  const authData = localStorage.getItem("portalAuth");
  const user = authData ? (JSON.parse(authData) as AuthUser) : null;

  const [leaveRequests] = useState<LeaveRequest[]>(getLeaveRequests());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  if (!user) {
    return null;
  }

  const canViewLeaveRequests =
    user.role === "GROUP_HR" || user.role === "COMPANY_HR";

  if (!canViewLeaveRequests) {
    return (
      <section className="p-6 lg:p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-700">Access denied</h1>
          <p className="mt-2 text-sm text-red-600">
            Only Group HR and Company HR users can view leave request records.
          </p>
        </div>
      </section>
    );
  }

  const visibleRequests =
    user.role === "COMPANY_HR"
      ? leaveRequests.filter((request) => request.companyName === user.companyName)
      : leaveRequests;

  const filteredRequests = visibleRequests.filter((request) => {
    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchValue) ||
      request.employeeEmail.toLowerCase().includes(searchValue) ||
      request.companyName.toLowerCase().includes(searchValue) ||
      request.leaveType.toLowerCase().includes(searchValue) ||
      request.reason.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = visibleRequests.filter(
    (request) => request.status === "Pending",
  ).length;

  const approvedCount = visibleRequests.filter(
    (request) => request.status === "Approved",
  ).length;

  const rejectedCount = visibleRequests.filter(
    (request) => request.status === "Rejected",
  ).length;

  const totalDays = visibleRequests.reduce(
    (total, request) => total + request.days,
    0,
  );

  const handleStatusFilterChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setStatusFilter(event.target.value as StatusFilter);
  };

  return (
    <section className="space-y-6 p-6 lg:p-8">
      <div>
        <p className="text-sm font-semibold text-blue-600">
          HR Portal / Leave Requests
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          Leave Requests
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {user.role === "COMPANY_HR"
            ? `Viewing leave records for ${user.companyName}.`
            : "Viewing leave records across all companies."}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <HiOutlineDocumentText size={25} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Requests
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(visibleRequests.length).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <HiOutlineClock size={25} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Pending
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(pendingCount).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <HiOutlineCheckCircle size={25} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Approved
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(approvedCount).padStart(2, "0")}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <HiOutlineXCircle size={25} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Rejected
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-950">
            {String(rejectedCount).padStart(2, "0")}
          </h3>
        </div>
      </div>

      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <HiOutlineCalendarDays size={24} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-blue-950">
              HR monitoring view
            </h3>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
              Company Head handles approval. HR can monitor leave records,
              check status, and review leave activity. Total requested leave
              days in this view: <span className="font-bold">{totalDays}</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-950">
              Leave Request Records
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Search and filter employee leave requests.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
            <div className="relative w-full lg:w-80">
              <HiOutlineMagnifyingGlass
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search leave request..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Leave Type</th>
                <th className="px-6 py-4 font-semibold">Date Range</th>
                <th className="px-6 py-4 font-semibold">Days</th>
                <th className="px-6 py-4 font-semibold">Reason</th>
                <th className="px-6 py-4 font-semibold">Reviewed By</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="text-sm transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-950">
                      {request.employeeName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {request.employeeEmail}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {request.companyName}
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-700">
                      {request.leaveType}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {request.id}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {request.startDate} to {request.endDate}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {request.days}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {request.reason}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {request.reviewedBy || "Not reviewed yet"}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        request.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : request.status === "Rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default LeaveRequestsPage;