import bg from "../assets/signin-banner.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerificationIcon from "../components/Homepage/VerificationIcon";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log("Signing in with:", email, password);
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center pt-24"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* semi-transparent overlay + subtle blur */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Center column for icon + card + demo box */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* circular icon */}
        {/* <div className="flex items-center justify-center mb-4">
          <div className="rounded-full bg-white p-3 shadow-md">
            <div className="rounded-full bg-[#E6F0FF] p-2">
              <img src={heroIcon} alt="icon" className="w-10 h-10" />
            </div>
          </div>
        </div> */}
        <div className=" flex justify-center h-32 w-32">
          <div className="animate-bounce-slow animate-pulse-ring">
            <VerificationIcon />
          </div>
        </div>
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 mt-1 mb-6">
          Sign in to your MediSure account
        </p>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
          <div className="p-6">
            {/* Email */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.com"
              className="mb-4 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent shadow-sm"
            />

            {/* Password */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mb-4 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent shadow-sm"
            />

            {/* Remember / forgot */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <button className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Sign In button */}
            <button
              onClick={handleSignIn}
              className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              Sign In
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                <button className="text-blue-600 hover:underline font-medium">
                  Sign Up
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* Demo credentials box (slightly translucent, green) */}
        <div className="mt-6 w-full max-w-md p-4 bg-green-50/90 border border-green-200 rounded-lg shadow-sm text-left text-[#193CB8]">
          <p className="text-sm font-semibol  mb-2">Demo Credentials:</p>
          <p className="text-xs ">• Manufacturer: manufacturer@medisure.com</p>
          <p className="text-xs ">• Distributor: distributor@medisure.com</p>
          <p className="text-xs ">• Pharmacy: pharmacy@medisure.com</p>
          <p className="text-xs  mt-2">Password: any</p>
        </div>

        {/* Back to home */}
        <p className="text-center text-sm text-gray-700 mt-6">
          <button className="hover:text-gray-900">← Back to Home</button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
