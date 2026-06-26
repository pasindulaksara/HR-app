import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import {
  HiOutlineBuildingOffice2,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";
import { mockUsers } from "../data/mockUsers";

function LoginPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedIdentifier = identifier.trim().toLowerCase();

    const user = mockUsers.find(
      (mockUser) =>
        mockUser.username.toLowerCase() === normalizedIdentifier ||
        mockUser.email.toLowerCase() === normalizedIdentifier,
    );

    if (!user || user.password !== password) {
      setErrorMessage("Invalid username or password.");
      return;
    }

    localStorage.setItem(
      "portalAuth",
      JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        organizationName: user.organizationName,
        companyName: user.companyName,
      }),
    );

    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-3xl bg-blue-600 text-white">
            <HiOutlineBuildingOffice2 size={34} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-950">
            HR Portal Login
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Login as owner, company head, HR or employee.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
        >
          {errorMessage && (
            <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
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
                placeholder="owner.user"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="User@123"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Sign In
          </button>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
            <p>owner.user / User@123</p>
            <p>company.head / User@123</p>
            <p>group.hr / User@123</p>
            <p>company.hr / User@123</p>
            <p>employee.user / User@123</p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;