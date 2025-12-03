import { Calendar, Download, Eye, Package } from "lucide-react";

const BatchDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            //   onClick={() => setCurrentPage("success")}
            className="text-blue-600 hover:text-blue-700 text-sm mb-2 flex items-center"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Batch Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                BATCH-2024-001
              </h1>
              <p className="text-sm text-gray-600">Paracetamol 500mg</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Batch Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Batch Information Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Batch Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Package className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Batch ID</p>
                    <p className="text-sm font-medium text-gray-900">
                      BATCH-2024-001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Manufacture Date
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        2024-01-15
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        2026-01-15
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center text-gray-400 mr-3 mt-0.5">
                    <span className="text-sm">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Quantity</p>
                    <p className="text-sm font-medium text-gray-900">
                      10,000 Units
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Information Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Blockchain Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">NFT Token ID</p>
                  <p className="text-sm font-medium text-gray-900">
                    Token_abc123
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Transaction Hash</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      0x1a2b3c...567d
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View on Explorer
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Minting Time</p>
                  <p className="text-sm font-medium text-gray-900">
                    2024-01-20, 14:30 UTC
                  </p>
                </div>
              </div>

              <button className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Verify on Blockchain
              </button>
            </div>

            {/* Supply Chain Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Supply Chain Timeline
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Manufacturing Lab
                    </p>
                    <p className="text-xs text-gray-600">
                      2024-01-15, 09:00 AM UTC
                    </p>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-gray-200 pl-7 py-2">
                  <div className="flex items-start -ml-7">
                    <div className="shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">
                        QR code - Verify
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready to Transfer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Ready to Transfer
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Transfer this batch to the next verified party in the supply
                chain
              </p>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Initiate Transfer
              </button>
            </div>
          </div>

          {/* Right Column - QR Code & Verification */}
          <div className="space-y-6">
            {/* Verification QR Code */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Verification QR Code
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="w-full aspect-square bg-white p-3 rounded-lg border-2 border-gray-200">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white" />
                    {/* QR Code Pattern */}
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

              <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </button>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">
                  Print and attach this QR Code to product packaging for
                  customer verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetail;
