import { useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineXCircle,
} from "react-icons/hi2";
import type { PortalRole } from "../data/mockUsers";
import {
  getLeaveRequests,
  updateLeaveRequestStatus,
  type LeaveRequest,
} from "../data/leaveRequestsStore";

type AuthUser = {
  fullName: string;
  username: string;
  email: string;
  role: PortalRole;
  organizationName: string;
  companyName: string | null;
};

function LeaveApprovalsPage() {
  const authData = localStorage.getItem("portalAuth");
  const user = authData ? (JSON.parse(authData) as AuthUser) : null;

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
    getLeaveRequests(),
  );

  if (!user) {
    return null;
  }

  if (user.role !== "COMPANY_HEAD") {
    return (
      <section className="p-6 lg:p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-700">Access denied</h1>
          <p className="mt-2 text-sm text-red-600">
            Only Company Head users can approve or reject leave requests.
          </p>
        </div>
      </section>
    );
  }

  const companyLeaveRequests = leaveRequests.filter(
    (request) => request.companyName === user.companyName,
  );

  const pendingRequests = companyLeaveRequests.filter(
    (request) => request.status === "Pending",
  );

  const approvedRequests = companyLeaveRequests.filter(
    (request) => request.status === "Approved",
  );

  const rejectedRequests = companyLeaveRequests.filter(
    (request) => request.status === "Rejected",
  );

  const handleReview = (requestId: string, status: "Approved" | "Rejected") => {
    const updatedRequests = updateLeaveRequestStatus(
      requestId,
      status,
      user.fullName,
    );

    setLeaveRequests(updatedRequests);
  };

  return (
    <section className="space-y-6 p-6 lg:p-8">
      <div>
        <p className="text-sm font-semibold text-blue-600">
          HR Portal / Leave Approvals
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          Leave Approvals
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Approve or reject employee leave requests for {user.companyName}.
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
            {String(companyLeaveRequests.length).padStart(2, "0")}
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
            {String(pendingRequests.length).padStart(2, "0")}
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
            {String(approvedRequests.length).padStart(2, "0")}
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
            {String(rejectedRequests.length).padStart(2, "0")}
          </h3>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-950">
            Pending Leave Requests
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Review employee leave requests awaiting approval.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Leave Type</th>
                <th className="px-6 py-4 font-semibold">Date Range</th>
                <th className="px-6 py-4 font-semibold">Days</th>
                <th className="px-6 py-4 font-semibold">Reason</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {pendingRequests.map((request) => (
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
                    {request.leaveType}
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

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleReview(request.id, "Approved")}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReview(request.id, "Rejected")}
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pendingRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No pending leave requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-950">
            Reviewed Leave Requests
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Previously approved or rejected requests.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Leave</th>
                <th className="px-6 py-4 font-semibold">Reviewed By</th>
                <th className="px-6 py-4 font-semibold">Reviewed Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {companyLeaveRequests
                .filter((request) => request.status !== "Pending")
                .map((request) => (
                  <tr
                    key={request.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
                        {request.employeeName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {request.id}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {request.leaveType} · {request.days} day(s)
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {request.reviewedBy || "-"}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {request.reviewedDate || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          request.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default LeaveApprovalsPage;