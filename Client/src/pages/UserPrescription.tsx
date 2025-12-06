import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

const UsersPresciptions = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [patientName, setPatientName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPG, PNG)");
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 5MB");
        return;
      }

      setUploadedFile(file);
      setError("");
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!patientName.trim()) {
        setError("Please enter patient name before uploading");
        return;
      }
      if (!uploadedFile) {
        setError("Please upload a prescription file");
        return;
      }
      setError("");
      setCurrentStep(2);
      // Simulate verification delay
      setTimeout(() => {
        setCurrentStep(3);
      }, 3000);
    }
  };

  // Step 1: Upload
  const UploadStep = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-lg font-semibold text-gray-800">
                Prescription Upload
              </span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mb-2">
                1
              </div>
              <span className="text-sm font-medium text-blue-600">Upload</span>
            </div>

            {/* Connector */}
            <div className="w-24 h-0.5 bg-gray-300 mx-4 mt-6"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold mb-2">
                2
              </div>
              <span className="text-sm text-gray-500">Verify</span>
            </div>

            {/* Connector */}
            <div className="w-24 h-0.5 bg-gray-300 mx-4 mt-6"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold mb-2">
                3
              </div>
              <span className="text-sm text-gray-500">Shop</span>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Upload Your Prescription
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Upload a valid prescription from your doctor to view available
            verified medicines
          </p>

          {/* Patient Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="fileUpload"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>

                {uploadedFile ? (
                  <div className="mb-4">
                    <p className="text-green-600 font-medium mb-1">
                      File uploaded successfully!
                    </p>
                    <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                  </div>
                ) : (
                  <p className="text-gray-600 mb-4">
                    Drag and drop your prescription here
                  </p>
                )}

                <label
                  htmlFor="fileUpload"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Browse Files
                </label>

                <p className="text-xs text-gray-500 mt-4">
                  Supports: PDF, JPG, PNG (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Important Information
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    • Prescription must be from a licensed medical practitioner
                  </li>
                  <li>• Prescription should be valid and not expired</li>
                  <li>• Image should be clear and readable</li>
                  <li>
                    • All medicine can be verified on blockchain before purchase
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleNext}
            disabled={!patientName.trim() || !uploadedFile}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  // Step 2: Verify
  const VerifyStep = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full text-center">
        {/* Header */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-900 mb-8 inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            {/* Step 1 - Completed */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-500">Upload</span>
            </div>

            <div className="w-16 h-0.5 bg-blue-600 mx-3 mt-6"></div>

            {/* Step 2 - Active */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2 animate-pulse">
                2
              </div>
              <span className="text-xs font-medium text-blue-600">Verify</span>
            </div>

            <div className="w-16 h-0.5 bg-gray-300 mx-3 mt-6"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white mb-2">
                3
              </div>
              <span className="text-xs text-gray-500">Shop</span>
            </div>
          </div>
        </div>

        {/* Analyzing Icon */}
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Analyzing Prescription
        </h2>
        <p className="text-gray-600 mb-8">
          We're extracting medicine information and verifying with our
          blockchain database...
        </p>

        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2"></div>
          <span className="text-sm text-gray-700">Processing...</span>
        </div>
      </div>
    </div>
  );

  // Step 3: Verified
  const VerifiedStep = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full">
        {/* Header */}
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-900 mb-8 inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            {/* Step 1 - Completed */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-500">Upload</span>
            </div>

            <div className="w-16 h-0.5 bg-green-500 mx-3 mt-6"></div>

            {/* Step 2 - Completed */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-500">Verify</span>
            </div>

            <div className="w-16 h-0.5 bg-blue-600 mx-3 mt-6"></div>

            {/* Step 3 - Active */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2">
                3
              </div>
              <span className="text-xs font-medium text-blue-600">Shop</span>
            </div>
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Prescription Verified
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Your prescription has been analyzed and verified successfully
        </p>

        {/* Prescription Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs text-gray-500 mb-2">Patient Name</h4>
              <p className="font-semibold text-gray-900">
                {patientName || "John Doe"}
              </p>
            </div>
            <div>
              <h4 className="text-xs text-gray-500 mb-2">Date Uploaded</h4>
              <p className="font-semibold text-gray-900">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-xs text-gray-500 mb-3">Medicines Prescribed</h4>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Dr. David Johnson
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Amoxicillin 500mg
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Ibuprofen 400mg
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  Cetirizine 10mg
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link to="/shop">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Continue to Available Medicines
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      {currentStep === 1 && <UploadStep />}
      {currentStep === 2 && <VerifyStep />}
      {currentStep === 3 && <VerifiedStep />}

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default UsersPresciptions;
