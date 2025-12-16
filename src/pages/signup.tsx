import VerificationIcon from "@/shared/VerificationIcon";
import bg from "../../public/signup-bg.jpg";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [role, setRole] = useState<"manufacturer" | "distributor" | "pharmacy">(
    "manufacturer"
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const roles = [
    {
      id: "manufacturer",
      title: "Manufacturer",
      desc: "Create and manage product batches",
      icon: "🏭",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "distributor",
      title: "Distributor",
      desc: "Transfer and track shipments",
      icon: "🚚",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      desc: "Process and verify batches",
      icon: "🏥",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup/`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role,
        }
      );

      toast.success("Account created successfully! You can now sign in.");
      router.push("/signin");

      // Reset form
      setFormData({ username: "", email: "", password: "" });
      setRole("manufacturer");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <Image
        src={bg}
        alt="Signup background"
        fill
        className="object-cover"
        priority
        quality={90}
        style={{ zIndex: -2 }}
      />
      {/* Gradient overlay - fixed position */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-white/90 backdrop-blur-[2px]"></div>

      {/* Main container - fixed height */}
      <div className="relative z-10 w-full max-w-6xl mx-4 h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - Role selection and form - Scrollable */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative h-24 w-24 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 flex items-center justify-center bg-white rounded-full shadow-lg">
                    <div className="animate-bounce-slow">
                      <VerificationIcon />
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Join MediSure Network
                </h2>
                <p className="text-gray-600 mt-2 text-center">
                  Secure pharmaceutical supply chain management
                </p>
              </div>

              {/* Role Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Select your role
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roles.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setRole(r.id as any)}
                      className={`cursor-pointer rounded-xl p-4 transition-all duration-300 border-2 ${
                        role === r.id
                          ? `${r.borderColor} ${r.bgColor} transform -translate-y-1 shadow-lg`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {r.title}
                          </h4>
                        </div>
                      </div>
                      {role === r.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center text-sm text-gray-600">
                            Selected
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        required
                        className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
                      className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Must be at least 8 characters with letters and numbers
                  </p>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      Privacy Policy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="text-center mb-8">
                <Link href="/signin">
                  <button className="inline-flex items-center px-6 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:border-blue-500 hover:text-blue-600 transition font-medium">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In to Existing Account
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Role benefits and info - Fixed height with scroll */}
          <div className="lg:w-96 bg-gradient-to-b from-blue-50 to-gray-50 p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 overflow-y-auto">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Benefits for{" "}
                <span className="capitalize bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {role}
                </span>
              </h3>

              <div className="space-y-4 mb-8">
                {role === "manufacturer" && (
                  <>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Batch Creation
                          </p>
                          <p className="text-sm text-gray-600">
                            Create and manage product batches
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Quality Control
                          </p>
                          <p className="text-sm text-gray-600">
                            Track quality metrics and compliance
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {role === "distributor" && (
                  <>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Shipment Tracking
                          </p>
                          <p className="text-sm text-gray-600">
                            Real-time shipment monitoring
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Inventory Management
                          </p>
                          <p className="text-sm text-gray-600">
                            Optimize stock levels and distribution
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {role === "pharmacy" && (
                  <>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Batch Verification
                          </p>
                          <p className="text-sm text-gray-600">
                            Verify authenticity and quality
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Fast Processing
                          </p>
                          <p className="text-sm text-gray-600">
                            Quick batch processing and dispensing
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
                <h4 className="font-bold text-lg mb-3">Secure Supply Chain</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Blockchain-verified transactions
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    Real-time audit trails
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <Link href="/">
                  <button className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
