"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import VerificationIcon from "@/shared/VerificationIcon";
import bg from "../../../public/hero-banner.jpg";

const Hero = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Handle code verification
  const handleVerifyCode = async () => {
    if (!input) return;

    setVerifying(true);

    try {
      // Call backend API
      const response = await fetch(`/api/verify_drug?assetId=${input}`);
      const data = await response.json();

      // Navigate to result page with data
      if (data.isValid) {
        router.push(`/verified?batchId=${input}`);
      } else {
        router.push(`/verified?error=not-found&batchId=${input}`);
      }
    } catch (error) {
      router.push(`/verified?error=network&batchId=${input}`);
    } finally {
      setVerifying(false);
    }
  };

  // Fake QR scanning simulation
  const startScan = () => {
    setShowScanner(true);
    setTimeout(() => {
      setShowScanner(false);
      // Simulate scanning a code
      setInput("BATCH-2024-001");
    }, 3000);
  };

  return (
    <div className="relative h-screen flex items-center justify-center px-4 mt-8">
      {/* Background Image */}
      <Image
        src={bg}
        alt="Hero background"
        fill
        className="object-cover"
        priority
        quality={90}
        style={{ zIndex: -2 }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        style={{ zIndex: -1 }}
      ></div>

      {/* Content */}
      <div
        className="relative max-w-lg w-full text-center flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        {/* ICON */}
        <div className="w-full flex justify-center">
          <div className="animate-bounce">
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
          className="w-full text-white py-4 px-6 mt-6 rounded-lg transition hover:opacity-90"
          style={{ backgroundColor: "#2563eb" }}
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
          <h1
            className="text-lg md:text-xl font-medium"
            style={{ color: "#314158" }}
          >
            Enter Batch Code Manually
          </h1>

          <input
            type="text"
            placeholder="e.g. BATCH-2024-001"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleVerifyCode()}
            className="mt-4 border border-transparent rounded-lg p-3 w-full focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#F3F3F5" }}
          />

          <button
            onClick={handleVerifyCode}
            disabled={verifying || !input}
            className="w-full text-white py-3 px-6 mt-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#2563eb" }}
          >
            {verifying ? (
              <>
                <span
                  className="animate-spin h-4 w-4 border-2 border-white rounded-full"
                  style={{ borderTopColor: "transparent" }}
                ></span>
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
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl w-80 text-center relative">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#101828" }}
            >
              Scanning QR Code...
            </h2>

            {/* Fake scanning animation */}
            <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden relative">
              <div
                className="absolute inset-0 animate-pulse"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(37, 99, 235, 0.4), transparent)",
                }}
              ></div>
            </div>

            <p className="mt-4 text-gray-600 text-sm">Please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
