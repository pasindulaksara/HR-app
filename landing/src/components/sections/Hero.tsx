import {
    HiArrowRight,
    HiCheckCircle,
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlineUsers,
  } from "react-icons/hi2";
  
  const statistics = [
    {
      label: "Total Employees",
      value: "248",
      icon: HiOutlineUsers,
    },
    {
      label: "Companies",
      value: "08",
      icon: HiOutlineBuildingOffice2,
    },
    {
      label: "Present Today",
      value: "226",
      icon: HiOutlineClock,
    },
    {
      label: "Pending Leave",
      value: "12",
      icon: HiOutlineCalendarDays,
    },
  ];
  
  function Hero() {
    return (
      <section
        id="home"
        className="relative overflow-hidden bg-slate-50 pb-24 pt-36 lg:pb-32 lg:pt-44"
      >
        <div className="absolute -left-40 top-20 size-[500px] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-40 bottom-0 size-[500px] rounded-full bg-indigo-200/40 blur-3xl" />
  
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <HiCheckCircle size={18} />
              Simple HR management for growing businesses
            </div>
  
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Manage your people.
              <span className="block text-blue-600">Simplify your HR.</span>
            </h1>
  
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Manage multiple companies, employees, leave, attendance and HR
              access through one secure and easy-to-use platform.
            </p>
  
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Request a Demo
                <HiArrowRight size={20} />
              </a>
  
              <a
                href="#features"
                className="rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                Explore Features
              </a>
            </div>
  
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              {[
                "Multi-company support",
                "Role-based access",
                "Quick setup",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <HiCheckCircle className="text-emerald-500" size={18} />
                  {item}
                </span>
              ))}
            </div>
          </div>
  
          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-blue-600/20 to-indigo-600/10 blur-2xl" />
  
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <p className="text-sm text-slate-500">Organization overview</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    HR Dashboard
                  </h2>
                </div>
  
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  System Active
                </span>
              </div>
  
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                {statistics.map((stat) => {
                  const Icon = stat.icon;
  
                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                          <Icon size={22} />
                        </div>
  
                        <span className="text-xs font-medium text-emerald-600">
                          Updated
                        </span>
                      </div>
  
                      <p className="mt-5 text-3xl font-bold text-slate-950">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
  
              <div className="border-t border-slate-100 p-5">
                <div className="rounded-2xl bg-slate-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Employee attendance</p>
                      <p className="mt-1 text-lg font-semibold">
                        91% present today
                      </p>
                    </div>
  
                    <span className="text-sm font-semibold text-emerald-400">
                      +4.2%
                    </span>
                  </div>
  
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[91%] rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Hero;