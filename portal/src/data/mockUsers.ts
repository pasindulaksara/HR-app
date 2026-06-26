export type PortalRole =
  | "OWNER_DIRECTOR"
  | "COMPANY_HEAD"
  | "GROUP_HR"
  | "COMPANY_HR"
  | "EMPLOYEE";

export type PortalUser = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: PortalRole;
  organizationName: string;
  companyName: string | null;
};

export const mockUsers: PortalUser[] = [
  {
    id: "U-001",
    fullName: "Owner User",
    username: "owner.user",
    email: "owner@example.com",
    password: "User@123",
    role: "OWNER_DIRECTOR",
    organizationName: "Demo Group",
    companyName: null,
  },
  {
    id: "U-002",
    fullName: "Company Head User",
    username: "company.head",
    email: "head@example.com",
    password: "User@123",
    role: "COMPANY_HEAD",
    organizationName: "Demo Group",
    companyName: "Demo Company",
  },
  {
    id: "U-003",
    fullName: "Group HR User",
    username: "group.hr",
    email: "group.hr@example.com",
    password: "User@123",
    role: "GROUP_HR",
    organizationName: "Demo Group",
    companyName: null,
  },
  {
    id: "U-004",
    fullName: "Company HR User",
    username: "company.hr",
    email: "company.hr@example.com",
    password: "User@123",
    role: "COMPANY_HR",
    organizationName: "Demo Group",
    companyName: "Demo Company",
  },
  {
    id: "U-005",
    fullName: "Employee User",
    username: "employee.user",
    email: "employee@example.com",
    password: "User@123",
    role: "EMPLOYEE",
    organizationName: "Demo Group",
    companyName: "Demo Company",
  },
];