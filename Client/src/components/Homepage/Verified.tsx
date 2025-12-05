import {
  CheckCircle,
  Package,
  Calendar,
  Building2,
  Eye,
  ExternalLink,
  MapPin,
} from "lucide-react";

const VerifiedProductPage = () => {
  const productData = {
    batchId: "BATCH-2024-001",
    composition: "Paracetamol 500mg",
    manufactureDate: "2024-01-15",
    expiryDate: "2026-01-15",
    manufacturer: "PharmaCorp Ltd",
    quantity: "10,000 Units",
    nftTokenId: "token_abc123",
    transactionHash: "0x1a3b...3ef9",
  };

  const timeline = [
    {
      stage: "Manufacturer",
      name: "PharmaCorp Ltd",
      date: "Jan 15, 2024, 02:30 AM",
      hash: "nPxu123a...5e76",
      color: "blue",
      icon: "M",
    },
    {
      stage: "Distributor",
      name: "MedDistribute Inc",
      date: "Jan 20, 2024, 10:20 AM",
      hash: "pRvudu3r...ef3g",
      color: "purple",
      icon: "D",
    },
    {
      stage: "Pharmacy",
      name: "City Pharmacy",
      date: "Jan 25, 2024, 01:15 AM",
      hash: "pRrma78y...5a32",
      color: "green",
      icon: "P",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Verified Badge */}
        <div className="bg-linear-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 md:p-8 mb-6 text-center">
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
            Verified Genuine
          </h1>
          <p className="text-sm md:text-base text-green-700 mb-4">
            This product is genuine and issued by PharmaCorp Ltd.
          </p>
          <button className="px-4 md:px-6 py-2 bg-green-600 text-white rounded-full text-xs md:text-sm font-medium hover:bg-green-700 transition-colors">
            Blockchain Verified
          </button>
        </div>

        {/* Product Information */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
            Product Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Package className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Batch ID</p>
                <p className="text-sm font-semibold text-gray-900">
                  {productData.batchId}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-5 h-5 flex items-center justify-center text-blue-500 mr-3 mt-0.5 shrink-0">
                <span className="text-sm">💊</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Composition</p>
                <p className="text-sm font-semibold text-gray-900">
                  {productData.composition}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Manufacture Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  {productData.manufactureDate}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-red-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  {productData.expiryDate}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Building2 className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Manufacturer</p>
                <p className="text-sm font-semibold text-gray-900">
                  {productData.manufacturer}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Package className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Quantity</p>
                <p className="text-sm font-semibold text-gray-900">
                  {productData.quantity}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Information */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
            Blockchain Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">NFT Token ID</p>
              <p className="text-sm font-semibold text-gray-900">
                {productData.nftTokenId}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2">Transaction Hash</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 px-3 md:px-4 py-3 rounded-lg gap-2">
                <p className="text-xs md:text-sm font-mono text-gray-900 break-all">
                  {productData.transactionHash}
                </p>
                <button className="text-blue-600 hover:text-blue-700 flex items-center text-xs md:text-sm font-medium whitespace-nowrap">
                  <Eye className="w-4 h-4 mr-1" />
                  View in Explorer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Provenance Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-6">
            Provenance Timeline
          </h2>

          <div className="space-y-6">
            {timeline.map((item, index) => {
              const isLast = index === timeline.length - 1;
              let bgColor = "bg-blue-100";
              let textColor = "text-blue-700";
              let lineColor = "border-blue-200";

              if (item.color === "purple") {
                bgColor = "bg-purple-100";
                textColor = "text-purple-700";
                lineColor = "border-purple-200";
              } else if (item.color === "green") {
                bgColor = "bg-green-100";
                textColor = "text-green-700";
                lineColor = "border-green-200";
              }

              return (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    {/* Icon */}
                    <div className="shrink-0 relative">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 ${bgColor} rounded-full flex items-center justify-center ${textColor} font-bold text-sm md:text-lg`}
                      >
                        {item.icon}
                      </div>
                      {!isLast && (
                        <div
                          className={`absolute left-4 md:left-5 top-8 md:top-10 bottom-0 w-0.5 border-l-2 ${lineColor} -mb-6`}
                        ></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="ml-3 md:ml-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {item.stage}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.date}
                          </p>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-xs font-mono text-gray-600 break-all">
                            {item.hash}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-800">
            This product has been verified at each stage of the supply chain
            using blockchain technology
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center text-sm md:text-base">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Report
          </button>
          <button className="px-4 md:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center text-sm md:text-base">
            <MapPin className="w-4 h-4 mr-2" />
            Track Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedProductPage;
