import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <HiOutlineBuildingOffice2 size={22} />
          </div>

          <div>
            <p className="font-bold text-slate-950">HR Platform</p>
            <p className="text-sm text-slate-500">
              Smarter people management
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} HR Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;