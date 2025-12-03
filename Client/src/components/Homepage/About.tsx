import { Shield, Users, Building2, Lock, Eye, BadgeCheck } from "lucide-react";
// import bg from "../../assets/about-bg.jpg";

const AboutPage = () => {
  return (
    <div
      className="min-h-screen bg-gray-50 relative "
      //   style={{
      //     backgroundImage: `url(${bg})`,
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //     backgroundRepeat: "no-repeat",
      //   }}
    >
      {/* Decorative DNA/Medical Pattern - Top Left */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="text-blue-400">
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="40" cy="30" r="3" fill="currentColor" />
          <circle cx="30" cy="50" r="3" fill="currentColor" />
          <circle cx="50" cy="60" r="3" fill="currentColor" />
          <line
            x1="20"
            y1="20"
            x2="40"
            y2="30"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="30"
            x2="30"
            y2="50"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="30"
            y1="50"
            x2="50"
            y2="60"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Decorative DNA/Medical Pattern - Top Right */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="text-blue-400">
          <circle cx="80" cy="20" r="3" fill="currentColor" />
          <circle cx="60" cy="30" r="3" fill="currentColor" />
          <circle cx="70" cy="50" r="3" fill="currentColor" />
          <circle cx="50" cy="60" r="3" fill="currentColor" />
          <line
            x1="80"
            y1="20"
            x2="60"
            y2="30"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="30"
            x2="70"
            y2="50"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="70"
            y1="50"
            x2="50"
            y2="60"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About MediSure
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Protecting patients worldwide by ensuring medicine authenticity
            through blockchain technology and advanced verification systems
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            At MediSure, we are committed to safeguarding public health by
            providing a transparent and secure platform for medicine
            verification. We leverage blockchain technology and cutting-edge
            solutions to ensure that every medication reaches patients safely,
            eliminating counterfeit drugs and building trust across the
            pharmaceutical supply chain.
          </p>
        </div>

        {/* Why It Matters Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Why It Matters
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Counterfeit medicines are a global health crisis. MediSure provides
            transparency and trust.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="bg-red-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">10%</div>
              <p className="text-sm text-gray-700">
                of medicines in low- and middle-income countries are substandard
                or counterfeit
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">1M+</div>
              <p className="text-sm text-gray-700">
                deaths annually due to counterfeit medicines globally
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$200B</div>
              <p className="text-sm text-gray-700">
                annual market for counterfeit pharmaceutical products
              </p>
            </div>
          </div>
        </div>

        {/* How We Help Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            How We Help
          </h2>
          <p className="text-gray-600 text-center mb-8">
            MediSure provides a comprehensive platform for medication
            verification and traceability
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Patients */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  For Patients
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">
                    Quick medicine verification through QR scanning
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">
                    View detailed medication history and authenticity
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">
                    Report suspicious medications easily
                  </span>
                </li>
              </ul>
            </div>

            {/* For Manufacturers & Distributors */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Building2 className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  For Manufacturers & Distributors
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">
                    Track products throughout the supply chain
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">
                    Real-time updates on medication distribution
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600">
                    Streamline regulatory compliance
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Powered by Blockchain Section */}
        <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Powered by Blockchain
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            We use blockchain technology to create an immutable and transparent
            ledger for all medication records
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Immutable Records */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Immutable Records
              </h3>
              <p className="text-sm text-gray-600">
                Once data is recorded, it cannot be altered or deleted, ensuring
                complete integrity
              </p>
            </div>

            {/* Transparent Tracking */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Transparent Tracking
              </h3>
              <p className="text-sm text-gray-600">
                Every stakeholder can verify the authenticity and journey of
                medications in real-time
              </p>
            </div>

            {/* Secure Verification */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BadgeCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Secure Verification
              </h3>
              <p className="text-sm text-gray-600">
                Cryptographic security ensures that only authorized parties can
                update medication records
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Verify Your Medicine?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers who trust
            MediSure to ensure medication safety and authenticity
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <button className="hover:text-gray-800">About Us</button>
            <button className="hover:text-gray-800">Privacy Policy</button>
            <button className="hover:text-gray-800">Terms of Service</button>
            <button className="hover:text-gray-800">Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
