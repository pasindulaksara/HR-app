import { HiArrowRight } from "react-icons/hi2";

function FinalCTA() {
  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-blue-600 px-6 py-16 text-center text-white shadow-2xl shadow-blue-600/20 sm:px-12">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to simplify your HR operations?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Request a demonstration and discover how one platform can manage
            your companies, employees, leave and attendance.
          </p>

          <a
            href="mailto:hello@example.com"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-blue-700 transition hover:-translate-y-0.5"
          >
            Request a Demo
            <HiArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;