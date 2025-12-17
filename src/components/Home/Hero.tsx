"use client";

import { useState, useEffect } from "react"; // 👈 Import useEffect
import { useRouter } from "next/navigation";
import Image from "next/image";
import VerificationIcon from "@/shared/VerificationIcon";
import bg from "../../../public/hero-banner.jpg";
import QrScanner from "./QrScanner";
import { useSearchParams } from "next/navigation"; // 👈 Import useSearchParams

const Hero = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // 👈 Initialize searchParams

  const [input, setInput] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [verifying, setVerifying] = useState(false);
  // State to prevent re-running verification on subsequent renders
  const [initialVerifyDone, setInitialVerifyDone] = useState(false);

  // --- Core Verification Handler ---
  const handleVerifyCode = async (codeToVerify: string) => {
    if (!codeToVerify) return;

    // Use a temporary variable to hold the original state if needed later,
    // but for now, just set the verification state
    setVerifying(true);
    setInput(codeToVerify);

    try {
      // 1. CALL THE API
      const response = await fetch(`/api/verify_drug?assetId=${codeToVerify}`);
      const data = await response.json();

      // 2. NAVIGATE TO RESULT PAGE
      if (data.isValid) {
        // Success
        router.push(`/verified?batchId=${codeToVerify}`);
      } else {
        // Not valid or not found on the blockchain
        router.push(`/verified?error=not-found&batchId=${codeToVerify}`);
      }
    } catch (error) {
      // Network or API route error
      console.error("Verification Error:", error);
      router.push(`/verified?error=network&batchId=${codeToVerify}`);
    } finally {
      setVerifying(false);
      setShowScanner(false);
    }
  };

  // --- AUTOMATIC URL VERIFICATION CHECK ---
  useEffect(() => {
    // Read the query parameter 'assetId' from the URL
    const assetIdFromUrl = searchParams.get("assetId");

    // Check if we have an assetId and haven't run the initial verification yet
    if (assetIdFromUrl && !initialVerifyDone) {
      setInitialVerifyDone(true); // Mark as done immediately
      // 3. Trigger verification with the code found in the URL
      handleVerifyCode(assetIdFromUrl);

      // OPTIONAL: Clean the URL after verification starts (nice UX)
      // Note: This won't reload the page.
      router.replace(window.location.pathname, undefined);
    }
  }, [searchParams, initialVerifyDone, router]); // Dependency array includes necessary values

  // --- Manual Input Handler ---
  const handleManualVerify = () => {
    // Pass the current input state to the core handler
    handleVerifyCode(input);
  };

  // --- Scanner Callbacks ---
  const handleScanSuccess = (decodedText: string) => {
    // Pass the decoded QR code text to the core handler
    handleVerifyCode(decodedText);
  };

  const startScan = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  return (
    <div className="relative h-screen flex items-center justify-center px-4 mt-8">
      {/* Background Image and Overlay (unchanged) */}
      <Image
        src={bg}
        alt="Hero background"
        fill
        className="object-cover"
        priority
        quality={90}
        style={{ zIndex: -2 }}
      />
      <div
        className="absolute inset-0 bg-black opacity-40"
        style={{ zIndex: -1 }}
      ></div>

      {/* Content */}
      <div
        className="relative max-w-lg w-full text-center flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        {/* ICON, Title, Description (unchanged) */}
        <div className="w-full flex justify-center">
          <div className="animate-bounce">
            <VerificationIcon />
          </div>
        </div>
        <h2 className="text-white text-3xl md:text-4xl font-semibold mt-6">
          Verify Your Medicine
        </h2>
        <p className="text-gray-200 mt-2 text-sm md:text-base">
          Ensure your medication is genuine and safe with a quick scan.
        </p>

        {/* QR Scan Button - Triggers the real scanner */}
        <button
          onClick={startScan}
          // Disabled while verifying from QR scan or manual input
          disabled={verifying}
          className="w-full text-white py-4 px-6 mt-6 rounded-lg transition hover:opacity-90 disabled:opacity-50"
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
            placeholder="e.g. BATCH-2024-001 or Policy ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleManualVerify()}
            // The input field is disabled if verification is ongoing (e.g., from URL)
            disabled={verifying}
            className="mt-4 border border-transparent rounded-lg p-3 w-full focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#F3F3F5" }}
          />

          <button
            onClick={handleManualVerify}
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

      {/* Real QR Scan Component */}
      {showScanner && (
        <QrScanner onScanSuccess={handleScanSuccess} onClose={closeScanner} />
      )}
    </div>
  );
};

export default Hero;
