import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineBuildingOffice2,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";

function LoginPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const authData = localStorage.getItem("superAdminAuth");

    if (authData) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedIdentifier = identifier.trim().toLowerCase();

    const isValidUser =
      normalizedIdentifier === "owner.admin" ||
      normalizedIdentifier === "owner@example.com";

    const isValidPassword = password === "Admin@123";

    if (!isValidUser || !isValidPassword) {
      setErrorMessage("Invalid username or password.");
      return;
    }

    localStorage.setItem(
      "superAdminAuth",
      JSON.stringify({
        fullName: "Platform Owner",
        username: "owner.admin",
        email: "owner@example.com",
        role: "Owner",
      }),
    );

    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-[radial-gradient(circle_at_top_left,_#2563eb,_transparent_32%),linear-gradient(135deg,_#020617,_#0f172a_55%,_#1e3a8a)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
            <div className="flex size-11 items-center justify-center rounded-xl bg-white text-blue-600">
              <HiOutlineBuildingOffice2 size={25} />
            </div>

            <div>
              <p className="text-sm font-semibold">HR System</p>
              <p className="text-xs text-blue-100">Super Admin Portal</p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">
              Platform Management
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Manage organizations, companies and HR access from one secure
              dashboard.
            </h1>

            <p className="mt-6 text-base leading-7 text-slate-300">
              This portal is only for your internal platform team. Client HR
              users will use the separate HR dashboard later.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © 2026 HR System. All rights reserved.
          </p>
        </section>

        <section className="flex items-center justify-center bg-slate-50 px-5 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <HiOutlineBuildingOffice2 size={30} />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Super Admin Login
              </p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to manage your HR system platform.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
            >
              {errorMessage && (
                <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Username or Email
                </label>

                <div className="relative mt-2">
                  <HiOutlineUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    type="text"
                    value={identifier}
                    onChange={(event) => {
                      setIdentifier(event.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="owner.admin"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative mt-2">
                  <HiOutlineLockClosed
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Admin@123"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash size={20} />
                    ) : (
                      <HiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Sign In
              </button>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
                <p>
                  <span className="font-semibold text-slate-700">
                    Demo username:
                  </span>{" "}
                  owner.admin
                </p>
                <p>
                  <span className="font-semibold text-slate-700">
                    Demo password:
                  </span>{" "}
                  Admin@123
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;