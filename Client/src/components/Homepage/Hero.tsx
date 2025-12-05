import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/hero-banner.jpg";
import VerificationIcon from "./VerificationIcon";

const Hero = () => {
  const navigate = useNavigate();

  const [showScanner, setShowScanner] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Fake QR scanning simulation
  const startScan = () => {
    setShowScanner(true);
    setTimeout(() => {
      navigate("/verified");
    }, 3000); // 3 seconds scan animation
  };

  // Fake code verification loading
  const handleVerifyCode = () => {
    setVerifying(true);
    setTimeout(() => {
      navigate("/verified");
    }, 2000); // 2 seconds loading
  };

  return (
    <div
      className="relative h-screen flex items-center justify-center px-4 mt-8"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* ICON */}
        <div className="w-full flex justify-center">
          <div className="animate-bounce-slow animate-pulse-ring">
            <VerificationIcon />
          </div>
        </div>
        {/* Title */}
        <h2 className="text-white text-3xl md:text-4xl font-semibold mt-6">
          Verify Your Medicine
        </h2>
        <p className="text-gray-200 mt-2 text-sm md:text-base">
          Ensure your medication is genuine and safe with a quick scan.
        </p>

        {/* QR Scan Button */}
        <button
          onClick={startScan}
          className="w-full bg-primary-faint text-white py-4 px-6 mt-6 rounded-lg hover:bg-primary-deep transition"
        >
          Scan QR Code to Verify
        </button>

        {/* Divider */}
        <div className="flex items-center w-full my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-300 px-4">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Manual Input */}
        <div className="w-full bg-white p-5 rounded-xl shadow-md">
          <h1 className="text-[#314158] text-lg md:text-xl font-medium">
            Enter Batch Code Manually
          </h1>

          <input
            type="text"
            placeholder="e.g. BATCH-2024-001"
            className="mt-4 bg-[#F3F3F5] border border-transparent rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-faint"
          />

          <button
            onClick={handleVerifyCode}
            className="w-full bg-primary-faint text-white py-3 px-6 mt-4 rounded-lg hover:bg-primary-deep transition flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Verifying…
              </>
            ) : (
              "Verify Code"
            )}
          </button>
        </div>
      </div>

      {/* QR Scan Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center relative">
            <h2 className="text-lg font-semibold mb-4 text-[#101828]">
              Scanning QR Code...
            </h2>

            {/* Fake scanning animation */}
            <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary-faint/40 to-transparent animate-scan"></div>
            </div>

            <p className="mt-4 text-gray-600 text-sm">Please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
