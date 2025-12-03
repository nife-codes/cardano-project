import React from "react";
import { CheckCircle, X } from "lucide-react";

interface FormData {
  batchId: string;
  manufactureDate: string;
  expiryDate: string;
  chemicalComposition: string;
  quantity: string;
}

interface CreateBatchModalProps {
  setShowModal: (show: boolean) => void;
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  showSuccess: boolean;
}

const CreateBatchModal = ({
  setShowModal,
  formData,
  handleInputChange,
  handleSubmit,
  showSuccess,
}: CreateBatchModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center h-screen animate-fadeIn z-50"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full animate-slideUp mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Create New Batch
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Mint a new medicine batch on the blockchain
            </p>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Batch ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="batchId"
                value={formData.batchId}
                onChange={handleInputChange}
                placeholder="e.g., BATCH-2024-001"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-700 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Manufacture Date and Expiry Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacture Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="manufactureDate"
                  value={formData.manufactureDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Chemical Composition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chemical Composition <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="chemicalComposition"
                value={formData.chemicalComposition}
                onChange={handleInputChange}
                placeholder="e.g., Paracetamol 500mg, Caffeine 65mg"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-700 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Quantity (Units) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Units) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="e.g., 10000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-700 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 animate-slideDown">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <div>
                  <div className="font-semibold text-green-800">Success!</div>
                  <div className="text-sm text-green-700 mt-1">
                    Batch has been created successfully and minted on
                    blockchain.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-white rounded-b-xl">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3.5 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Mint Batch on Blockchain
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CreateBatchModal;
