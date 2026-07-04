import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineDocumentText,
    HiOutlineEnvelope,
    HiOutlineIdentification,
    HiOutlineMapPin,
    HiOutlinePhone,
    HiOutlineShieldCheck,
    HiOutlineUser,
    HiOutlineUserGroup,
  } from "react-icons/hi2";
  import type { PortalRole } from "../data/mockUsers";
  import { getLeaveRequests } from "../data/leaveRequestsStore";
  
  type AuthUser = {
    fullName: string;
    username: string;
    email: string;
    role: PortalRole;
    organizationName: string;
    companyName: string | null;
  };
  
  type ProfileRecord = {
    employeeNo: string;
    displayName: string;
    nic: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    personalPhone: string;
    personalEmail: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    workEmail: string;
    company: string;
    department: string;
    designation: string;
    employeeType: string;
    joinedDate: string;
    reportingManager: string;
    workLocation: string;
    probationStatus: string;
    employmentStatus: string;
    yearsOfService: string;
    attendanceRate: string;
    leaveBalance: number;
    lastPromotionDate: string;
    lastSalaryReviewDate: string;
    disciplinaryRecords: string;
    achievements: string;
    bankName: string;
    bankAccountStatus: string;
    documents: {
      name: string;
      status: "Uploaded" | "Pending" | "Not Required";
    }[];
  };
  
  const roleLabels: Record<PortalRole, string> = {
    OWNER_DIRECTOR: "Owner / Director",
    COMPANY_HEAD: "Company Head",
    GROUP_HR: "Group HR",
    COMPANY_HR: "Company HR",
    EMPLOYEE: "Employee",
  };
  
  function getProfileRecord(user: AuthUser): ProfileRecord {
    const baseCompany = user.companyName ?? "All Companies";
  
    if (user.role === "OWNER_DIRECTOR") {
      return {
        employeeNo: "OWN-001",
        displayName: user.fullName,
        nic: "Not added",
        dateOfBirth: "Not added",
        gender: "Not added",
        maritalStatus: "Not added",
        personalPhone: "Not added",
        personalEmail: user.email,
        address: "Not added",
        emergencyContactName: "Not added",
        emergencyContactPhone: "Not added",
        workEmail: user.email,
        company: baseCompany,
        department: "Board / Management",
        designation: "Owner / Director",
        employeeType: "Management",
        joinedDate: "01 Jan 2026",
        reportingManager: "Not applicable",
        workLocation: "Head Office",
        probationStatus: "Not applicable",
        employmentStatus: "Active",
        yearsOfService: "0 years 6 months",
        attendanceRate: "Not tracked",
        leaveBalance: 0,
        lastPromotionDate: "Not applicable",
        lastSalaryReviewDate: "Not applicable",
        disciplinaryRecords: "No records",
        achievements: "Organization owner account created",
        bankName: "Not added",
        bankAccountStatus: "Not required",
        documents: [
          { name: "NIC / ID Copy", status: "Pending" },
          { name: "Director Authorization", status: "Uploaded" },
          { name: "Company Registration Proof", status: "Uploaded" },
          { name: "Bank Details", status: "Not Required" },
        ],
      };
    }
  
    if (user.role === "GROUP_HR") {
      return {
        employeeNo: "GHR-001",
        displayName: user.fullName,
        nic: "Not added",
        dateOfBirth: "Not added",
        gender: "Not added",
        maritalStatus: "Not added",
        personalPhone: "Not added",
        personalEmail: user.email,
        address: "Not added",
        emergencyContactName: "Not added",
        emergencyContactPhone: "Not added",
        workEmail: user.email,
        company: "All Companies",
        department: "Human Resources",
        designation: "Group HR Manager",
        employeeType: "Full-time",
        joinedDate: "01 Jan 2026",
        reportingManager: "Owner / Director",
        workLocation: "Head Office",
        probationStatus: "Completed",
        employmentStatus: "Active",
        yearsOfService: "0 years 6 months",
        attendanceRate: "96%",
        leaveBalance: 14,
        lastPromotionDate: "Not added",
        lastSalaryReviewDate: "Not added",
        disciplinaryRecords: "No records",
        achievements: "Handles group-level HR operations",
        bankName: "Not added",
        bankAccountStatus: "Pending",
        documents: [
          { name: "NIC / ID Copy", status: "Pending" },
          { name: "Appointment Letter", status: "Uploaded" },
          { name: "Certificates", status: "Pending" },
          { name: "Bank Details", status: "Pending" },
        ],
      };
    }
  
    if (user.role === "COMPANY_HR") {
      return {
        employeeNo: "CHR-001",
        displayName: user.fullName,
        nic: "Not added",
        dateOfBirth: "Not added",
        gender: "Not added",
        maritalStatus: "Not added",
        personalPhone: "Not added",
        personalEmail: user.email,
        address: "Not added",
        emergencyContactName: "Not added",
        emergencyContactPhone: "Not added",
        workEmail: user.email,
        company: baseCompany,
        department: "Human Resources",
        designation: "Company HR Officer",
        employeeType: "Full-time",
        joinedDate: "01 Feb 2026",
        reportingManager: "Group HR Manager",
        workLocation: "Assigned Branch",
        probationStatus: "Completed",
        employmentStatus: "Active",
        yearsOfService: "0 years 5 months",
        attendanceRate: "94%",
        leaveBalance: 12,
        lastPromotionDate: "Not added",
        lastSalaryReviewDate: "Not added",
        disciplinaryRecords: "No records",
        achievements: "Manages company-level HR records",
        bankName: "Not added",
        bankAccountStatus: "Pending",
        documents: [
          { name: "NIC / ID Copy", status: "Pending" },
          { name: "Appointment Letter", status: "Uploaded" },
          { name: "Certificates", status: "Pending" },
          { name: "Bank Details", status: "Pending" },
        ],
      };
    }
  
    if (user.role === "COMPANY_HEAD") {
      return {
        employeeNo: "CHD-001",
        displayName: user.fullName,
        nic: "Not added",
        dateOfBirth: "Not added",
        gender: "Not added",
        maritalStatus: "Not added",
        personalPhone: "Not added",
        personalEmail: user.email,
        address: "Not added",
        emergencyContactName: "Not added",
        emergencyContactPhone: "Not added",
        workEmail: user.email,
        company: baseCompany,
        department: "Operations",
        designation: "Company Head",
        employeeType: "Full-time",
        joinedDate: "01 Jan 2026",
        reportingManager: "Owner / Director",
        workLocation: "Assigned Branch",
        probationStatus: "Completed",
        employmentStatus: "Active",
        yearsOfService: "0 years 6 months",
        attendanceRate: "95%",
        leaveBalance: 10,
        lastPromotionDate: "Not added",
        lastSalaryReviewDate: "Not added",
        disciplinaryRecords: "No records",
        achievements: "Responsible for leave approvals",
        bankName: "Not added",
        bankAccountStatus: "Pending",
        documents: [
          { name: "NIC / ID Copy", status: "Pending" },
          { name: "Appointment Letter", status: "Uploaded" },
          { name: "Certificates", status: "Pending" },
          { name: "Bank Details", status: "Pending" },
        ],
      };
    }
  
    return {
      employeeNo: "EMP-001",
      displayName: user.fullName,
      nic: "Not added",
      dateOfBirth: "Not added",
      gender: "Not added",
      maritalStatus: "Not added",
      personalPhone: "Not added",
      personalEmail: user.email,
      address: "Not added",
      emergencyContactName: "Not added",
      emergencyContactPhone: "Not added",
      workEmail: user.email,
      company: baseCompany,
      department: "Operations",
      designation: "Employee",
      employeeType: "Full-time",
      joinedDate: "01 Mar 2026",
      reportingManager: "Company Head",
      workLocation: "Assigned Branch",
      probationStatus: "On probation",
      employmentStatus: "Active",
      yearsOfService: "0 years 4 months",
      attendanceRate: "92%",
      leaveBalance: 14,
      lastPromotionDate: "Not added",
      lastSalaryReviewDate: "Not added",
      disciplinaryRecords: "No records",
      achievements: "No records added",
      bankName: "Not added",
      bankAccountStatus: "Pending",
      documents: [
        { name: "NIC / ID Copy", status: "Pending" },
        { name: "Appointment Letter", status: "Uploaded" },
        { name: "Certificates", status: "Pending" },
        { name: "Bank Details", status: "Pending" },
      ],
    };
  }
  
  function InfoItem({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: string;
    icon: typeof HiOutlineUser;
  }) {
    return (
      <div className="rounded-2xl bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <Icon size={20} />
          </div>
  
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
          </div>
        </div>
      </div>
    );
  }
  
  function ProfilePage() {
    const authData = localStorage.getItem("portalAuth");
    const user = authData ? (JSON.parse(authData) as AuthUser) : null;
  
    if (!user) {
      return null;
    }
  
    const profile = getProfileRecord(user);
    const leaveRequests = getLeaveRequests();
  
    const userLeaveRequests = leaveRequests.filter(
      (request) => request.employeeEmail === user.email,
    );
  
    const approvedLeaves = userLeaveRequests.filter(
      (request) => request.status === "Approved",
    ).length;
  
    const pendingLeaves = userLeaveRequests.filter(
      (request) => request.status === "Pending",
    ).length;
  
    const documentUploadedCount = profile.documents.filter(
      (document) => document.status === "Uploaded",
    ).length;
  
    return (
      <section className="space-y-6 p-6 lg:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            HR Portal / My Profile
          </p>
  
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            My Profile
          </h1>
  
          <p className="mt-2 text-sm text-slate-500">
            Personal details, official employment information and HR track record.
          </p>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex size-20 items-center justify-center rounded-3xl bg-blue-600 text-2xl font-bold text-white">
                {profile.displayName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
  
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  {profile.displayName}
                </h2>
  
                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {profile.designation}
                </p>
  
                <p className="mt-2 text-sm text-slate-500">
                  {profile.employeeNo} · {profile.department} · {profile.company}
                </p>
              </div>
            </div>
  
            <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              {profile.employmentStatus}
            </div>
          </div>
        </div>
  
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <HiOutlineCalendarDays size={24} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Years of Service
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-950">
              {profile.yearsOfService}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <HiOutlineCheckCircle size={24} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Attendance Rate
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-950">
              {profile.attendanceRate}
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <HiOutlineClock size={24} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Leave Balance
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-950">
              {profile.leaveBalance} Days
            </h3>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <HiOutlineDocumentText size={24} />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              Documents Uploaded
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-950">
              {documentUploadedCount}/{profile.documents.length}
            </h3>
          </div>
        </div>
  
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">
                Personal Details
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Employee personal and emergency contact information.
              </p>
            </div>
  
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <InfoItem
                label="NIC / ID Number"
                value={profile.nic}
                icon={HiOutlineIdentification}
              />
              <InfoItem
                label="Date of Birth"
                value={profile.dateOfBirth}
                icon={HiOutlineCalendarDays}
              />
              <InfoItem label="Gender" value={profile.gender} icon={HiOutlineUser} />
              <InfoItem
                label="Marital Status"
                value={profile.maritalStatus}
                icon={HiOutlineUserGroup}
              />
              <InfoItem
                label="Personal Phone"
                value={profile.personalPhone}
                icon={HiOutlinePhone}
              />
              <InfoItem
                label="Personal Email"
                value={profile.personalEmail}
                icon={HiOutlineEnvelope}
              />
              <InfoItem
                label="Address"
                value={profile.address}
                icon={HiOutlineMapPin}
              />
              <InfoItem
                label="Emergency Contact"
                value={`${profile.emergencyContactName} / ${profile.emergencyContactPhone}`}
                icon={HiOutlinePhone}
              />
            </div>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">
                Official Details
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Company, department and employment details.
              </p>
            </div>
  
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <InfoItem
                label="Work Email"
                value={profile.workEmail}
                icon={HiOutlineEnvelope}
              />
              <InfoItem
                label="Company"
                value={profile.company}
                icon={HiOutlineBuildingOffice2}
              />
              <InfoItem
                label="Department"
                value={profile.department}
                icon={HiOutlineUserGroup}
              />
              <InfoItem
                label="Designation"
                value={profile.designation}
                icon={HiOutlineBriefcase}
              />
              <InfoItem
                label="Employee Type"
                value={profile.employeeType}
                icon={HiOutlineIdentification}
              />
              <InfoItem
                label="Joined Date"
                value={profile.joinedDate}
                icon={HiOutlineCalendarDays}
              />
              <InfoItem
                label="Reporting Manager"
                value={profile.reportingManager}
                icon={HiOutlineUser}
              />
              <InfoItem
                label="Work Location"
                value={profile.workLocation}
                icon={HiOutlineMapPin}
              />
              <InfoItem
                label="Probation Status"
                value={profile.probationStatus}
                icon={HiOutlineShieldCheck}
              />
              <InfoItem
                label="Employment Status"
                value={profile.employmentStatus}
                icon={HiOutlineCheckCircle}
              />
            </div>
          </div>
        </div>
  
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">
                Track Record
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Employment history, leave activity and HR record summary.
              </p>
            </div>
  
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <InfoItem
                label="Approved Leaves"
                value={String(approvedLeaves)}
                icon={HiOutlineCheckCircle}
              />
              <InfoItem
                label="Pending Leaves"
                value={String(pendingLeaves)}
                icon={HiOutlineClock}
              />
              <InfoItem
                label="Last Promotion Date"
                value={profile.lastPromotionDate}
                icon={HiOutlineCalendarDays}
              />
              <InfoItem
                label="Last Salary Review"
                value={profile.lastSalaryReviewDate}
                icon={HiOutlineBanknotes}
              />
              <InfoItem
                label="Disciplinary Records"
                value={profile.disciplinaryRecords}
                icon={HiOutlineShieldCheck}
              />
              <InfoItem
                label="Achievements"
                value={profile.achievements}
                icon={HiOutlineCheckCircle}
              />
            </div>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-950">
                Documents
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                HR document completion status.
              </p>
            </div>
  
            <div className="space-y-3 p-6">
              {profile.documents.map((document) => (
                <div
                  key={document.name}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <HiOutlineDocumentText size={20} />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {document.name}
                    </p>
                  </div>
  
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      document.status === "Uploaded"
                        ? "bg-emerald-50 text-emerald-700"
                        : document.status === "Pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {document.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Account Access
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Login and system account information.
            </p>
          </div>
  
          <div className="grid gap-4 p-6 md:grid-cols-4">
            <InfoItem
              label="Login Username"
              value={user.username}
              icon={HiOutlineIdentification}
            />
            <InfoItem label="Login Email" value={user.email} icon={HiOutlineEnvelope} />
            <InfoItem label="System Role" value={roleLabels[user.role]} icon={HiOutlineShieldCheck} />
            <InfoItem label="Last Login" value="Today" icon={HiOutlineClock} />
          </div>
        </div>
      </section>
    );
  }
  
  export default ProfilePage;