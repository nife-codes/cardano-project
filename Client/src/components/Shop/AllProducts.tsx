import { useState } from "react";
import { Search, Filter, Package } from "lucide-react";

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  manufacturer: string;
  batchId: string;
  expiryDate: string;
  price: number;
  inStock: boolean;
  verified: boolean;
  image?: string;
}

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const medicines: Medicine[] = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      manufacturer: "PharmaCorp Ltd",
      batchId: "BATCH-2024-001",
      expiryDate: "12/2026",
      price: 24.99,
      inStock: true,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "400mg",
      manufacturer: "HealthMed Inc",
      batchId: "BATCH-2024-002",
      expiryDate: "08/2026",
      price: 12.5,
      inStock: true,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Lisinopril",
      dosage: "10mg",
      manufacturer: "CardioCare Solutions",
      batchId: "BATCH-2024-003",
      expiryDate: "05/2027",
      price: 18.75,
      inStock: true,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Metformin",
      dosage: "850mg",
      manufacturer: "DiabetesCare Pharma",
      batchId: "BATCH-2024-004",
      expiryDate: "11/2026",
      price: 15.99,
      inStock: true,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1550572017-4fbd1d6c0c7d?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Omeprazole",
      dosage: "20mg",
      manufacturer: "GastroHealth Ltd",
      batchId: "BATCH-2024-005",
      expiryDate: "03/2027",
      price: 22,
      inStock: true,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Cetirizine",
      dosage: "10mg",
      manufacturer: "AllergyFree Pharma",
      batchId: "BATCH-2024-006",
      expiryDate: "07/2026",
      price: 9.99,
      inStock: true,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop",
    },
  ];

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.batchId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            All Products
          </h1>

          {/* Search and Filter Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medicines, manufacturers, or batch IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredMedicines.length} verified medicines
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
            >
              {/* Product Image */}
              <div className="bg-white h-48 flex items-center justify-center relative overflow-hidden">
                {medicine.image ? (
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-20 h-20 text-blue-300" />
                )}
                {medicine.verified && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-md">
                    ✓ Verified
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {medicine.name} {medicine.dosage}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {medicine.manufacturer}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-20">Batch:</span>
                    <span className="text-gray-900 font-medium">
                      {medicine.batchId}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-20">Expiry:</span>
                    <span className="text-gray-900">{medicine.expiryDate}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      ₦{medicine.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Per Unit</p>
                  </div>
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No medicines found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
