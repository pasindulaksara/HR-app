require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("../src/config/prisma");

async function main() {
  const email = "superadmin@hr.local";
  const password = "Admin@12345";

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      fullName: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
    create: {
      fullName: "Super Admin",
      email,
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  console.log("Super Admin created successfully:");
  console.log({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  });

  console.log("");
  console.log("Login email:", email);
  console.log("Login password:", password);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });