import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlinePlus,
  HiOutlineXMark,
} from "react-icons/hi2";
import type { PortalRole } from "../data/mockUsers";
import {
  addLeaveRequest,
  calculateLeaveDays,
  getLeaveRequests,
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

type LeaveForm = {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
};

const initialFormState: LeaveForm = {
  leaveType: "Annual Leave",
  startDate: "",
  endDate: "",
  reason: "",
};

function MyLeavePage() {
  const authData = localStorage.getItem("portalAuth");
  const user = authData ? (JSON.parse(authData) as AuthUser) : null;

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
    getLeaveRequests(),
  );
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formData, setFormData] = useState<LeaveForm>(initialFormState);

  if (!user) {
    return null;
  }

  if (user.role !== "EMPLOYEE") {
    return (
      <section className="p-6 lg:p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-700">Access denied</h1>
          <p className="mt-2 text-sm text-red-600">
            Only employees can access the My Leave page.
          </p>
        </div>
      </section>
    );
  }

  const myLeaveRequests = leaveRequests.filter(
    (request) => request.employeeEmail === user.email,
  );

  const pendingCount = myLeaveRequests.filter(
    (request) => request.status === "Pending",
  ).length;

  const approvedCount = myLeaveRequests.filter(
    (request) => request.status === "Approved",
  ).length;

  const requestedDays = myLeaveRequests.reduce(
    (total, request) => total + request.days,
    0,
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleApplyLeave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const days = calculateLeaveDays(formData.startDate, formData.endDate);

    if (
      !formData.leaveType ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason.trim() ||
      days <= 0
    ) {
      return;
    }

    const updatedRequests = addLeaveRequest({
      employeeName: user.fullName,
      employeeEmail: user.email,
      companyName: user.companyName || "Demo Company",
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days,
      reason: formData.reason,
    });

    setLeaveRequests(updatedRequests);
    setFormData(initialFormState);
    setIsApplyModalOpen(false);
  };

  return (
    <>
      <section className="space-y-6 p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              HR Portal / My Leave
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              My Leave
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Apply for leave and track your leave request status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsApplyModalOpen(true)}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <HiOutlinePlus size={20} />
            Apply Leave
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineCalendarDays size={25} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Leave Balance
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">14</h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <HiOutlineClock size={25} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Pending Requests
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(pendingCount).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <HiOutlineDocumentText size={25} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Approved
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {String(approvedCount).padStart(2, "0")}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <HiOutlineCalendarDays size={25} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Requested Days
            </p>
            <h3 className="mt-2 text-4xl font-bold text-slate-950">
              {requestedDays}
            </h3>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Leave History
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Your submitted leave requests and approval status.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Leave Type</th>
                  <th className="px-6 py-4 font-semibold">Date Range</th>
                  <th className="px-6 py-4 font-semibold">Days</th>
                  <th className="px-6 py-4 font-semibold">Reason</th>
                  <th className="px-6 py-4 font-semibold">Reviewed By</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {myLeaveRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-950">
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

                {myLeaveRequests.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
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

      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Apply Leave
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Submit a new leave request for company head approval.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
              >
                <HiOutlineXMark size={22} />
              </button>
            </div>

            <form className="space-y-5 p-6" onSubmit={handleApplyLeave}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Leave Type
                  </label>
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option>Annual Leave</option>
                    <option>Casual Leave</option>
                    <option>Medical Leave</option>
                    <option>No Pay Leave</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Calculated Days
                  </label>
                  <input
                    type="text"
                    value={calculateLeaveDays(
                      formData.startDate,
                      formData.endDate,
                    )}
                    disabled
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Reason
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Enter leave reason..."
                    required
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Submit Leave Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MyLeavePage;