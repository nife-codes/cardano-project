import { CheckCircle, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-24">
    <div className="bg-white rounded-xl shadow-lg  w-full p-8">
      {/* Success Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-8">
          Batch Created Successfully
        </h2>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Your batch has been registered on the{" "}
          <span className="text-blue-600">Cardano Blockchain</span>
        </p>
      </div>

      {/* Batch Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Batch ID</span>
          <span className="text-sm font-semibold text-gray-900">
            NFT Token ID
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">
            BATCH-2024-001
          </span>
          <span className="text-sm text-gray-600">Token_abc123</span>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Transaction Hash</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">
              0x1a2b3c...567d
            </span>
            <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              View on Explorer
            </button>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex justify-center mb-3">
          <div className="w-40 h-40 bg-white p-3 rounded-lg border-2 border-gray-200">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" fill="white" />
              {/* Simple QR Code Pattern */}
              <rect x="10" y="10" width="15" height="15" fill="black" />
              <rect x="30" y="10" width="5" height="5" fill="black" />
              <rect x="40" y="10" width="10" height="10" fill="black" />
              <rect x="55" y="10" width="5" height="5" fill="black" />
              <rect x="75" y="10" width="15" height="15" fill="black" />

              <rect x="10" y="30" width="5" height="5" fill="black" />
              <rect x="20" y="30" width="5" height="5" fill="black" />
              <rect x="35" y="30" width="10" height="10" fill="black" />
              <rect x="50" y="30" width="5" height="5" fill="black" />
              <rect x="75" y="30" width="5" height="5" fill="black" />
              <rect x="85" y="30" width="5" height="5" fill="black" />

              <rect x="10" y="45" width="10" height="10" fill="black" />
              <rect x="30" y="45" width="5" height="5" fill="black" />
              <rect x="45" y="45" width="15" height="15" fill="black" />
              <rect x="65" y="45" width="5" height="5" fill="black" />
              <rect x="80" y="45" width="10" height="10" fill="black" />

              <rect x="10" y="65" width="5" height="5" fill="black" />
              <rect x="20" y="65" width="10" height="10" fill="black" />
              <rect x="40" y="65" width="5" height="5" fill="black" />
              <rect x="55" y="65" width="10" height="10" fill="black" />
              <rect x="75" y="65" width="5" height="5" fill="black" />

              <rect x="10" y="75" width="15" height="15" fill="black" />
              <rect x="35" y="75" width="5" height="5" fill="black" />
              <rect x="50" y="75" width="10" height="10" fill="black" />
              <rect x="75" y="75" width="15" height="15" fill="black" />
            </svg>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500">
          <Download className="w-3 h-3 inline mr-1" />
          Download QR Code
        </p>
      </div>

      {/* Action Buttons */}
      <div className=" flex  items-center gap-6">
        <Link to="/batch-detail" className=" w-full">
          <button
            //   onClick={() => setCurrentPage("details")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Batch Details
          </button>
        </Link>
        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
);

export default SuccessPage;
