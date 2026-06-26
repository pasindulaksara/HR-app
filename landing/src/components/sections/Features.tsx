import {
    HiOutlineBuildingOffice2,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
    HiOutlineClock,
    HiOutlineShieldCheck,
    HiOutlineUsers,
  } from "react-icons/hi2";
  
  const features = [
    {
      title: "Multi-Company Management",
      description:
        "Manage multiple organizations and companies from one centralized platform.",
      icon: HiOutlineBuildingOffice2,
    },
    {
      title: "Employee Management",
      description:
        "Keep employee profiles, employment details and company records organized.",
      icon: HiOutlineUsers,
    },
    {
      title: "Leave Management",
      description:
        "Allow employees to request leave and HR teams to review requests easily.",
      icon: HiOutlineCalendarDays,
    },
    {
      title: "Attendance Tracking",
      description:
        "Record employee check-in, check-out and daily working hours.",
      icon: HiOutlineClock,
    },
    {
      title: "Role-Based Access",
      description:
        "Control what group HR, company HR, managers and employees can access.",
      icon: HiOutlineShieldCheck,
    },
    {
      title: "Simple Dashboards",
      description:
        "View workforce statistics, pending requests and attendance summaries.",
      icon: HiOutlineChartBar,
    },
  ];
  
  function Features() {
    return (
      <section id="features" className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Core features
            </span>
  
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Everything needed to manage your workforce
            </h2>
  
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A practical HR platform created for organizations that need simple,
              reliable and centralized people management.
            </p>
          </div>
  
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
  
              return (
                <article
                  key={feature.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={26} />
                  </div>
  
                  <h3 className="mt-6 text-xl font-bold text-slate-950">
                    {feature.title}
                  </h3>
  
                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  
  export default Features;