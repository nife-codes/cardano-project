import bg from "../assets/signup-bg.jpg";
import { useState } from "react";
import VerificationIcon from "../components/Homepage/VerificationIcon";

const SignUp = () => {
  const [role, setRole] = useState<"manufacturer" | "distributor" | "pharmacy">(
    "manufacturer"
  );

  const roles = [
    {
      id: "manufacturer",
      title: "Manufacturer",
      desc: "Create and track medicine batches",
      icon: "🏭",
    },
    {
      id: "distributor",
      title: "Distributor",
      desc: "Receive and transfer batches",
      icon: "🚚",
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      desc: "Process batches for product distribution",
      icon: "🏥",
    },
  ];

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center pt-32"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Top Icon */}
        <div className=" flex justify-center h-32 w-32">
          <div className="animate-bounce-slow animate-pulse-ring">
            <VerificationIcon />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-600 mt-1 mb-6">
          Join the MediSure network to secure your supply chain
        </p>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
          {/* Role Label */}
          <p className="text-sm font-medium text-gray-600 mb-2">I am a</p>

          {/* MOBILE — SCROLLABLE ROW */}
          <div className="flex sm:hidden gap-3 overflow-x-auto pb-1 no-scrollbar mb-6">
            {roles.map((r) => (
              <div
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={`
                  min-w-[130px] cursor-pointer border rounded-lg p-3 transition
                  ${
                    role === r.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }
                `}
              >
                <div className="text-xl mb-1">{r.icon}</div>
                <p className="font-medium text-gray-800 text-sm">{r.title}</p>
                <p className="text-[11px] text-gray-500">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* DESKTOP / TABLET — GRID */}
          <div className="hidden sm:grid grid-cols-3 gap-3 mb-6">
            {roles.map((r) => (
              <div
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={`
                  cursor-pointer border rounded-xl p-4 transition shadow-sm
                  ${
                    role === r.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                <div className="text-2xl mb-2">{r.icon}</div>
                <p className="font-medium text-gray-800">{r.title}</p>
                <p className="text-xs text-gray-500 mt-1">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Organization */}
            <input
              type="text"
              placeholder="Your company or organization name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="you@organization.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
            />

            {/* Phone */}
            <input
              type="text"
              placeholder="+1 (555) 000-0000 (Optional)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
            />

            {/* Address */}
            <input
              type="text"
              placeholder="Your organization’s address (Optional)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200"
            />

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <p className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
            >
              Create Account
            </button>
          </form>

          {/* Sign In */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <span className="text-blue-600 ml-1 cursor-pointer hover:underline">
              Sign In
            </span>
          </p>
        </div>

        {/* Back */}
        <p className="text-center text-sm text-gray-700 mt-6 cursor-pointer hover:text-gray-900">
          ← Back to Home
        </p>
      </div>
    </div>
  );
};

export default SignUp;
