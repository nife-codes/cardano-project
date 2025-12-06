//@ts-ignore
//@ts-nocheck

import React, { useState } from "react";
import {
  Plus,
  Eye,
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
  LucideLogOut,
} from "lucide-react";
import CreateBatchModal from "./CreateBatchModal";
import { useNavigate } from "react-router-dom";

interface Batch {
  id: string;
  composition: string;
  expiryDate: string;
  status: "Active" | "Pending" | "Expired";
  views: number;
}

interface FormData {
  batchId: string;
  medicineName: string;
  entryDate: string;
  physicalLocation: string;
  status: string;
}

const Overview = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    batchId: "",
    medicineName: "",
    entryDate: "",
    physicalLocation: "",
    status: "",
  });

  const [batches] = useState<Batch[]>([
    {
      id: "BATCH-001",
      composition: "Paracetamol 500mg",
      expiryDate: "2025-12-15",
      status: "Minted",
      views: 1,
    },
    {
      id: "BATCH-002",
      composition: "Amoxicillin 250mg",
      expiryDate: "2026-03-20",
      status: "Pending",
      views: 0,
    },
    {
      id: "BATCH-003",
      composition: "Ibuprofen 400mg",
      expiryDate: "2025-08-10",
      status: "In Transit",
      views: 0,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
      setFormData({
        batchId: "",
        medicineName: "",
        entryDate: "",
        physicalLocation: "",
        status: "",
      });
    }, 2000);
    navigate("/success");
  };

  // Calculate statistics
  const totalBatches = batches.length;
  const activeBatches = batches.filter((b) => b.status === "Active").length;
  const pendingBatches = batches.filter((b) => b.status === "Pending").length;
  const totalViews = batches.reduce((sum, b) => sum + b.views, 0);

  const cards = [
    {
      id: 1,
      title: "Total Batches",
      value: totalBatches,
      icon: Package,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Active Batches",
      value: activeBatches,
      icon: CheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      title: "Minted",
      value: pendingBatches,
      icon: Clock,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      id: 4,
      title: "In Transit",
      value: totalViews.toLocaleString(),
      icon: TrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">PharmaCorp Ltd.</p>
            </div>
            <button
              //   onClick={() => setShowModal(true)}
              className="flex items-center px-6 py-3 bg-[#F3F4F6] text-black rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <LucideLogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.bgColor} p-3 rounded-lg`}>
                    <IconComponent
                      className={`w-6 h-6 ${card.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-6 py-3 bg-[#2563EB] text-white mb-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Batch
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100">
          {/* Table Header */}
          {/* <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Batches
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              View and manage all your medicine batches
            </p>
          </div> */}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 p-6 border-b border-gray-200 ">
                <tr>
                  <th className="px-6 py-4 text-left text-[#314158] text-sm font-semibold  uppercase tracking-wider">
                    Batch ID
                  </th>
                  <th className="px-6 py-4 text-left text-[#314158] text-sm font-semibold  uppercase tracking-wider">
                    Composition
                  </th>
                  <th className="px-6 py-4 text-left text-[#314158] text-sm font-semibold  uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-4 text-left text-[#314158] text-sm font-semibold  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-[#314158] text-sm font-semibold  uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {batches.map((batch) => (
                  <tr
                    key={batch.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {batch.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {batch.composition}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {batch.expiryDate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(
                          batch.status
                        )}`}
                      >
                        {batch.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-[#0A0A0A]">
                      <button className="flex items-center  font-medium transition-colors">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default Overview;
