export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export type LeaveRequest = {
  id: string;
  employeeName: string;
  employeeEmail: string;
  companyName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
};

const STORAGE_KEY = "portalLeaveRequests";

const defaultLeaveRequests: LeaveRequest[] = [
  {
    id: "LR-001",
    employeeName: "Employee User",
    employeeEmail: "employee@example.com",
    companyName: "Demo Company",
    leaveType: "Annual Leave",
    startDate: "2026-06-24",
    endDate: "2026-06-25",
    days: 2,
    reason: "Personal work",
    status: "Pending",
    appliedDate: "2026-06-20",
  },
  {
    id: "LR-002",
    employeeName: "Employee User",
    employeeEmail: "employee@example.com",
    companyName: "Demo Company",
    leaveType: "Casual Leave",
    startDate: "2026-06-10",
    endDate: "2026-06-10",
    days: 1,
    reason: "Family matter",
    status: "Approved",
    appliedDate: "2026-06-08",
    reviewedBy: "Company Head User",
    reviewedDate: "2026-06-09",
  },
];

export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function calculateLeaveDays(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    return 0;
  }

  const difference = end.getTime() - start.getTime();

  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
}

export function getLeaveRequests() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLeaveRequests));
    return defaultLeaveRequests;
  }

  return JSON.parse(storedData) as LeaveRequest[];
}

export function saveLeaveRequests(requests: LeaveRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function addLeaveRequest(
  request: Omit<LeaveRequest, "id" | "status" | "appliedDate">,
) {
  const currentRequests = getLeaveRequests();
  const nextNumber = currentRequests.length + 1;

  const newRequest: LeaveRequest = {
    id: `LR-${String(nextNumber).padStart(3, "0")}`,
    ...request,
    status: "Pending",
    appliedDate: getTodayDate(),
  };

  const updatedRequests = [newRequest, ...currentRequests];
  saveLeaveRequests(updatedRequests);

  return updatedRequests;
}

export function updateLeaveRequestStatus(
  requestId: string,
  status: LeaveStatus,
  reviewedBy: string,
) {
  const currentRequests = getLeaveRequests();

  const updatedRequests = currentRequests.map((request) => {
    if (request.id !== requestId) {
      return request;
    }

    return {
      ...request,
      status,
      reviewedBy,
      reviewedDate: getTodayDate(),
    };
  });

  saveLeaveRequests(updatedRequests);

  return updatedRequests;
}