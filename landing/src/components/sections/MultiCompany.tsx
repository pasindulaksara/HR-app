import {
    HiCheckCircle,
    HiOutlineBuildingOffice,
    HiOutlineUserGroup,
  } from "react-icons/hi2";
  
  function MultiCompany() {
    return (
      <section id="solutions" className="bg-slate-950 py-24 text-white lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Built for business groups
            </span>
  
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              One HR platform for every company in your group
            </h2>
  
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Central HR teams can manage the entire organization, while
              company-specific HR users only access the companies assigned to
              them.
            </p>
  
            <div className="mt-8 space-y-4">
              {[
                "Group HR access across all companies",
                "Separate company HR access",
                "Centralized employee information",
                "Secure company-level data separation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <HiCheckCircle className="text-blue-400" size={22} />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-6">
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600">
                  <HiOutlineUserGroup size={24} />
                </div>
  
                <div>
                  <p className="font-semibold">Organization / Group</p>
                  <p className="text-sm text-slate-400">Central HR management</p>
                </div>
              </div>
            </div>
  
            <div className="mx-6 h-8 border-l-2 border-dashed border-slate-700" />
  
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Company One",
                "Company Two",
                "Company Three",
                "Company Four",
              ].map((company) => (
                <div
                  key={company}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <HiOutlineBuildingOffice
                    className="text-blue-400"
                    size={24}
                  />
                  <p className="mt-4 font-semibold">{company}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Employees and company HR
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default MultiCompany;