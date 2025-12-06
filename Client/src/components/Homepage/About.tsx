import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Users, Building2, Lock, Eye, BadgeCheck } from "lucide-react";
import VerificationIcon from "./VerificationIcon";

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="relative bg-gray-50 overflow-hidden">
      {/* Medicine-themed background pattern */}
      <div
        className="absolute inset-0 opacity-10 "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580281658629-44a62f67c4f1?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Curved Hero Section */}
      <div className="relative bg-blue-600 text-white pb-24 pt-32 rounded-b-[70px] shadow-lg">
        <div className="max-w-5xl mx-auto text-center px-4">
          {/* Floating Shield Icon */}
          <div className="w-full flex justify-center">
            <div className="animate-bounce-slow animate-pulse-ring">
              <VerificationIcon />
            </div>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4 mt-8"
            data-aos="fade-up"
          >
            About MediSure
          </h1>
          <p
            className="text-white/90 max-w-2xl mx-auto text-lg"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Protecting patients worldwide with blockchain-powered medicine
            verification and total transparency in the pharmaceutical supply
            chain.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative">
        {/* Card: Mission */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            We are committed to eliminating counterfeit medicines globally by
            empowering patients, pharmacies, manufacturers, and regulators with
            a secure and transparent verification system.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2
            className="text-3xl font-semibold text-center text-gray-800 mb-10"
            data-aos="fade-up"
          >
            Why It Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="bg-red-50 rounded-xl p-6 text-center shadow-sm"
              data-aos="fade-up"
            >
              <h3 className="text-4xl font-bold text-red-600">10%</h3>
              <p className="text-gray-700 mt-2">
                of medicines in LMIC countries are substandard or fake
              </p>
            </div>

            <div
              className="bg-orange-50 rounded-xl p-6 text-center shadow-sm"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-4xl font-bold text-orange-600">1M+</h3>
              <p className="text-gray-700 mt-2">
                deaths annually due to fake medications
              </p>
            </div>

            <div
              className="bg-blue-50 rounded-xl p-6 text-center shadow-sm"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3 className="text-4xl font-bold text-blue-600">$200B</h3>
              <p className="text-gray-700 mt-2">
                yearly counterfeit drug market worldwide
              </p>
            </div>
          </div>
        </div>

        {/* How We Help */}
        <div className="mb-16">
          <h2
            className="text-3xl font-semibold text-gray-800 text-center mb-8"
            data-aos="fade-up"
          >
            How We Help
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Patients */}
            <div
              className="bg-white p-8 rounded-xl shadow-md"
              data-aos="fade-up"
            >
              <div className="flex items-center mb-4">
                <Users className="text-green-600 w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">For Patients</h3>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li>✓ Instant medicine verification via QR scan</li>
                <li>✓ Full medication history & authenticity check</li>
                <li>✓ Report suspicious drugs instantly</li>
              </ul>
            </div>

            {/* Manufacturers */}
            <div
              className="bg-white p-8 rounded-xl shadow-md"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center mb-4">
                <Building2 className="text-blue-600 w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">
                  Manufacturers & Distributors
                </h3>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li>✓ Full supply-chain tracking</li>
                <li>✓ Real-time logistics updates</li>
                <li>✓ Seamless regulatory compliance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Blockchain Section */}
        <div
          className="bg-linear-to-br from-purple-50 to-blue-50 p-10 rounded-2xl shadow-xl mb-20"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Powered by Blockchain
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-center mb-12">
            Every medication entry is recorded on an immutable ledger, ensuring
            trust, transparency, and ultimate safety.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up">
              <div className="bg-purple-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                <Lock className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Immutable Records</h3>
              <p className="text-sm text-gray-600 mt-2">
                Data cannot be modified once stored.
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-blue-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                <Eye className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">
                Transparent Tracking
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Every stakeholder sees the medicine journey.
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="bg-green-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
                <BadgeCheck className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">
                Secure Verification
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Cryptographic signatures protect data integrity.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="bg-blue-600 text-white text-center p-10 rounded-2xl shadow-xl mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Verify Your Medicine?
          </h2>
          <p className="max-w-xl mx-auto mb-6 text-white/90">
            Join thousands of users who trust MediSure for safe and authentic
            medications.
          </p>

          <button className="bg-white text-blue-600 px-10 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
