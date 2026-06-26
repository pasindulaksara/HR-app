import { useState } from "react";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <HiOutlineBuildingOffice2 size={24} />
          </div>

          <div>
            <span className="block text-lg font-bold leading-none text-slate-950">
              HR Platform
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              Smarter people management
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#"
            className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Client Login
          </a>

          <a
            href="#contact"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Request a Demo
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <HiOutlineXMark size={25} />
          ) : (
            <HiOutlineBars3 size={25} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#"
              className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold text-slate-700"
            >
              Client Login
            </a>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white"
            >
              Request a Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;