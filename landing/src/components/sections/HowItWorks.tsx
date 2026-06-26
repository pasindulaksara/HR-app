const steps = [
    {
      number: "01",
      title: "Create your organization",
      description:
        "Set up the main organization and add the companies operating under it.",
    },
    {
      number: "02",
      title: "Add HR teams and employees",
      description:
        "Create group HR, company HR and employee accounts with correct access.",
    },
    {
      number: "03",
      title: "Manage HR operations",
      description:
        "Handle employee information, leave and attendance from one platform.",
    },
  ];
  
  function HowItWorks() {
    return (
      <section id="how-it-works" className="bg-slate-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              How it works
            </span>
  
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Start managing your team in three simple steps
            </h2>
          </div>
  
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <span className="text-5xl font-bold text-blue-100">
                  {step.number}
                </span>
  
                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {step.title}
                </h3>
  
                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default HowItWorks;