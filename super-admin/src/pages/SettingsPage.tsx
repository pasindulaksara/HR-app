import { useState } from "react";
import {
  HiOutlineBellAlert,
  HiOutlineBuildingOffice2,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineUserPlus,
} from "react-icons/hi2";

type PlatformSettings = {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  websiteUrl: string;
  defaultTrialDays: number;
  defaultPlan: "Trial" | "Starter" | "Business" | "Enterprise";
  publicRegistration: boolean;
  requireSignupApproval: boolean;
  allowCompanyRequest: boolean;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  systemStatus: "Active" | "Maintenance" | "Disabled";
};

const STORAGE_KEY = "superAdminSettings";

const defaultSettings: PlatformSettings = {
  platformName: "HR Admin",
  supportEmail: "support@example.com",
  supportPhone: "+94 77 000 0000",
  websiteUrl: "https://example.com",
  defaultTrialDays: 14,
  defaultPlan: "Trial",
  publicRegistration: false,
  requireSignupApproval: true,
  allowCompanyRequest: true,
  maintenanceMode: false,
  emailNotifications: true,
  systemStatus: "Active",
};

function getStoredSettings() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    return defaultSettings;
  }

  try {
    return JSON.parse(storedData) as PlatformSettings;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
}

function SettingsPage() {
  const [settings, setSettings] =
    useState<PlatformSettings>(getStoredSettings);
  const [message, setMessage] = useState("");

  const updateSetting = <K extends keyof PlatformSettings>(
    key: K,
    value: PlatformSettings[K],
  ) => {
    setSettings({
      ...settings,
      [key]: value,
    });
    setMessage("");
  };

  const handleSaveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setMessage("Settings saved successfully.");
  };

  const handleResetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    setMessage("Settings reset to default values.");
  };

  return (
    <section className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            Super Admin / Settings
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage platform configuration, public registration, approval rules
            and system status.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleResetSettings}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>

      {message && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          {message}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <HiOutlineCog6Tooth size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            System Status
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            {settings.systemStatus}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <HiOutlineUserPlus size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Public Signup
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            {settings.publicRegistration ? "Enabled" : "Disabled"}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <HiOutlineShieldCheck size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Signup Approval
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            {settings.requireSignupApproval ? "Required" : "Auto"}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <HiOutlineClock size={24} />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Trial Days
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            {settings.defaultTrialDays} Days
          </h3>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Platform Details
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Basic platform name and support contact information.
            </p>
          </div>

          <div className="grid gap-5 p-6">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Platform Name
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <HiOutlineBuildingOffice2 className="text-slate-400" size={22} />
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(event) =>
                    updateSetting("platformName", event.target.value)
                  }
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Support Email
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <HiOutlineEnvelope className="text-slate-400" size={22} />
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(event) =>
                    updateSetting("supportEmail", event.target.value)
                  }
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Support Phone
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <HiOutlinePhone className="text-slate-400" size={22} />
                <input
                  type="text"
                  value={settings.supportPhone}
                  onChange={(event) =>
                    updateSetting("supportPhone", event.target.value)
                  }
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Website URL
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <HiOutlineGlobeAlt className="text-slate-400" size={22} />
                <input
                  type="text"
                  value={settings.websiteUrl}
                  onChange={(event) =>
                    updateSetting("websiteUrl", event.target.value)
                  }
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-950">
              Registration Settings
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Future landing page signup and company request settings.
            </p>
          </div>

          <div className="grid gap-5 p-6">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Default Plan
              </label>

              <select
                value={settings.defaultPlan}
                onChange={(event) =>
                  updateSetting(
                    "defaultPlan",
                    event.target.value as PlatformSettings["defaultPlan"],
                  )
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Trial">Trial</option>
                <option value="Starter">Starter</option>
                <option value="Business">Business</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Default Trial Days
              </label>

              <input
                type="number"
                min={0}
                value={settings.defaultTrialDays}
                onChange={(event) =>
                  updateSetting("defaultTrialDays", Number(event.target.value))
                }
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <HiOutlineUserPlus className="text-blue-600" size={22} />
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    Allow public registration
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Later, users can register from landing page.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.publicRegistration}
                onChange={(event) =>
                  updateSetting("publicRegistration", event.target.checked)
                }
                className="size-5 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <HiOutlineShieldCheck className="text-purple-600" size={22} />
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    Require approval for new signup
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Super Admin must approve new registered organizations.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.requireSignupApproval}
                onChange={(event) =>
                  updateSetting("requireSignupApproval", event.target.checked)
                }
                className="size-5 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <HiOutlineBuildingOffice2 className="text-emerald-600" size={22} />
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    Allow company requests
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Owner / Group HR can request additional companies later.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.allowCompanyRequest}
                onChange={(event) =>
                  updateSetting("allowCompanyRequest", event.target.checked)
                }
                className="size-5 accent-blue-600"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-950">
            System Controls
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Control platform status, notifications and maintenance mode.
          </p>
        </div>

        <div className="grid gap-5 p-6 xl:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              System Status
            </label>

            <select
              value={settings.systemStatus}
              onChange={(event) =>
                updateSetting(
                  "systemStatus",
                  event.target.value as PlatformSettings["systemStatus"],
                )
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <HiOutlineLockClosed className="text-amber-600" size={22} />
              <div>
                <p className="text-sm font-bold text-slate-950">
                  Maintenance Mode
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Temporarily restrict system access.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(event) =>
                updateSetting("maintenanceMode", event.target.checked)
              }
              className="size-5 accent-blue-600"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <HiOutlineBellAlert className="text-blue-600" size={22} />
              <div>
                <p className="text-sm font-bold text-slate-950">
                  Email Notifications
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Send system alerts and signup notifications.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(event) =>
                updateSetting("emailNotifications", event.target.checked)
              }
              className="size-5 accent-blue-600"
            />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
        <h3 className="text-lg font-bold text-blue-950">
          Future signup logic
        </h3>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-blue-800">
          These settings prepare the platform for future landing page
          registration. During MVP testing, Super Admin still creates
          organizations and companies manually. Later, public registration can
          create a pending organization and first company for Super Admin
          approval.
        </p>
      </div>
    </section>
  );
}

export default SettingsPage;