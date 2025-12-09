"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
  LogOut,
  Activity,
  Calendar,
  Wallet,
  AlertCircle,
  X,
  Send,
} from "lucide-react";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { stringToHex } from "@meshsdk/core";
// @ts-ignore
import { mintDrugBatch } from "../utils/mint";
// @ts-ignore
import { transferDrugBatch } from "../utils/transfer";
import CreateBatchModal from "@/components/dashboard/CreateBatchModal";
// import CreateBatchModal from "./CreateBatchModal";

interface Batch {
  id: string;
  composition: string;
  expiryDate: string;
  status: "Active" | "Pending" | "Expired" | "Minted" | "In Transit";
  views: number;
}

interface FormData {
  batchId: string;
  drugName: string;
  manufactureDate: string;
  expiryDate: string;
  chemicalComposition: string;
  quantity: string;
  manufacturer: string;
}

const Overview = () => {
  const { connected, wallet } = useWallet();
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [walletError, setWalletError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transferring, setTransferring] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    batchId: "",
    drugName: "",
    manufactureDate: "",
    expiryDate: "",
    chemicalComposition: "",
    quantity: "",
    manufacturer: "PharmaCorp Ltd",
  });

  const MY_POLICY_ID =
    "dea909d9658e872bd9827cafda7a5d415c753a9ff3310a3f59dad227";

  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "BATCH-001",
      composition: "Paracetamol 500mg",
      expiryDate: "2025-12-15",
      status: "Minted",
      views: 234,
    },
    {
      id: "BATCH-002",
      composition: "Amoxicillin 250mg",
      expiryDate: "2026-03-20",
      status: "Pending",
      views: 156,
    },
    {
      id: "BATCH-003",
      composition: "Ibuprofen 400mg",
      expiryDate: "2025-08-10",
      status: "In Transit",
      views: 89,
    },
    {
      id: "BATCH-004",
      composition: "Aspirin 100mg",
      expiryDate: "2026-01-25",
      status: "Active",
      views: 312,
    },
  ]);

  useEffect(() => {
    setIsClient(true);

    // Handle wallet connection and account changes
    const initWallet = async () => {
      if (connected && wallet) {
        try {
          // Clear any previous errors
          setWalletError("");

          // Get wallet address
          const addresses = await wallet.getUsedAddresses();
          if (addresses && addresses.length > 0) {
            setWalletAddress(addresses[0]);
          }
        } catch (error: any) {
          console.warn("Wallet initialization:", error);
          // Don't show error to user - connection still works
        }
      } else {
        setWalletAddress("");
      }
    };

    initWallet();
  }, [connected, wallet]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Minted":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "In Transit":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Expired":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- MINT ACTION ---
  const handleSubmit = async () => {
    if (!connected) {
      setStatus("❌ Please connect your wallet first");
      return;
    }

    setStatus("⏳ Minting... Please sign the transaction.");
    setShowSuccess(false);

    try {
      // Generate batch ID if not provided
      const batchId =
        formData.batchId || "BATCH-" + Math.floor(Math.random() * 10000);

      const batchData = {
        drugName: formData.drugName || formData.chemicalComposition,
        batchId: batchId,
        expiryDate: formData.expiryDate,
        manufacturer: formData.manufacturer,
        quantity: formData.quantity,
      };

      const hash = await mintDrugBatch(wallet, batchData);

      // Add new batch to list
      const newBatch: Batch = {
        id: batchId,
        composition: formData.chemicalComposition,
        expiryDate: formData.expiryDate,
        status: "Minted",
        views: 0,
      };
      setBatches([newBatch, ...batches]);

      setStatus(`✅ Minted successfully! Batch ID: ${batchId}`);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setShowModal(false);
        setFormData({
          batchId: "",
          drugName: "",
          manufactureDate: "",
          expiryDate: "",
          chemicalComposition: "",
          quantity: "",
          manufacturer: "PharmaCorp Ltd",
        });
        setStatus("");
      }, 3000);
    } catch (error: any) {
      console.error(error);

      // Check if it's a "No ADA" error
      if (
        error.message?.includes("No ADA") ||
        error.message?.includes("Faucet")
      ) {
        setStatus(
          "❌ No test ADA found! Please visit the faucet to get test ADA."
        );
        setWalletError(
          "You need test ADA to mint batches. Visit: https://faucet.preprod.world.dev.cardano.org/"
        );
      } else {
        setStatus("❌ Mint Error: " + error.message);
      }
    }
  };

  // Calculate statistics
  const totalBatches = batches.length;
  const activeBatches = batches.filter((b) => b.status === "Active").length;
  const mintedBatches = batches.filter((b) => b.status === "Minted").length;
  const inTransit = batches.filter((b) => b.status === "In Transit").length;

  const cards = [
    {
      id: 1,
      title: "Total Batches",
      value: totalBatches,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      change: "+12%",
    },
    {
      id: 2,
      title: "Active Batches",
      value: activeBatches,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      change: "+8%",
    },
    {
      id: 3,
      title: "Minted",
      value: mintedBatches,
      icon: Activity,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
      change: "+5%",
    },
    {
      id: 4,
      title: "In Transit",
      value: inTransit,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      change: "+15%",
    },
  ];

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-0.5 flex items-center">
                  <span
                    className={`w-2 h-2 ${
                      connected ? "bg-green-500" : "bg-orange-500"
                    } rounded-full mr-2 animate-pulse`}
                  ></span>
                  {connected ? "PharmaCorp Ltd." : "Wallet Disconnected"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <Wallet className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {connected ? "Connected" : "Not Connected"}
                </span>
              </div>
              <div onClick={() => setWalletError("")}>
                <CardanoWallet />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Wallet Error Message */}
        {walletError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-8 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 mb-1">
                Wallet Connection Error
              </h4>
              <p className="text-sm text-red-700">{walletError}</p>
              <p className="text-xs text-red-600 mt-2">
                Try refreshing the page or reinstalling the wallet extension.
              </p>
            </div>
            <button
              onClick={() => setWalletError("")}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {!connected ? (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600">
              Please connect your Cardano wallet to start minting batches and
              managing your inventory.
            </p>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border ${card.borderColor} group cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`${card.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`w-6 h-6 ${card.color}`} />
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {card.change}
                      </span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-2">
                      {card.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`mb-8 p-4 rounded-xl border-2 ${
                  status.includes("✅")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : status.includes("❌")
                    ? "bg-red-50 border-red-200 text-red-800"
                    : "bg-blue-50 border-blue-200 text-blue-800"
                }`}
              >
                <p className="font-semibold">{status}</p>
              </div>
            )}

            {/* Create Batch Button */}
            <div className="mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Batch
              </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Recent Batches
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      View and manage all your medicine batches
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Last 30 days</span>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-700 text-xs font-bold uppercase tracking-wider">
                        Batch ID
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 text-xs font-bold uppercase tracking-wider">
                        Composition
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 text-xs font-bold uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 text-xs font-bold uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 text-xs font-bold uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 text-xs font-bold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {batches.map((batch, index) => (
                      <tr
                        key={batch.id}
                        className="hover:bg-blue-50/30 transition-colors duration-150 group"
                        style={{
                          animation: `slideIn 0.3s ease-out ${
                            index * 0.1
                          }s both`,
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:animate-pulse"></div>
                            <span className="text-sm font-bold text-gray-900">
                              {batch.id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {batch.composition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {batch.expiryDate}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-full border ${getStatusColor(
                              batch.status
                            )}`}
                          >
                            {batch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <Eye className="w-4 h-4 mr-1.5 text-gray-400" />
                            {batch.views}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group-hover:translate-x-1 duration-200">
                              <Eye className="w-4 h-4 mr-1.5" />
                              View
                            </button>
                            <button
                              //   onClick={() => openTransferModal(batch)}
                              className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                            >
                              <Send className="w-4 h-4 mr-1.5" />
                              Transfer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">{batches.length}</span> of{" "}
                  <span className="font-semibold">{batches.length}</span>{" "}
                  batches
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateBatchModal
          setShowModal={setShowModal}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          showSuccess={showSuccess}
        />
      )}

      {/* Transfer Modal */}
      {showTransferModal && selectedBatch && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slideUp overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Transfer Batch
                    </h3>
                    <p className="text-sm text-purple-100 mt-1">
                      Send to distributor or pharmacy
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowTransferModal(false);
                    setSelectedBatch(null);
                    setRecipientAddress("");
                  }}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Batch Info */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Batch Details
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="text-purple-700">
                    <strong>ID:</strong> {selectedBatch.id}
                  </p>
                  <p className="text-purple-700">
                    <strong>Composition:</strong> {selectedBatch.composition}
                  </p>
                  <p className="text-purple-700">
                    <strong>Status:</strong> {selectedBatch.status}
                  </p>
                </div>
              </div>

              {/* Recipient Address Input */}
              <div className="mb-6">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Wallet className="w-4 h-4 mr-2 text-purple-600" />
                  Recipient Wallet Address{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="addr_test1... or addr1..."
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all text-gray-900 placeholder:text-gray-400 font-mono text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter the Cardano wallet address of the recipient
                </p>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800">
                      Important
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This action will transfer the NFT to the recipient. Make
                      sure the address is correct before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowTransferModal(false);
                  setSelectedBatch(null);
                  setRecipientAddress("");
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                // onClick={handleTransfer}
                disabled={transferring || !recipientAddress}
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {transferring ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    Transferring...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Transfer Batch
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Overview;
