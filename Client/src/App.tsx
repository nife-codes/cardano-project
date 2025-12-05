import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import AboutPage from "./components/Homepage/About";
import Overview from "./components/Dashboard/Overview";
import SuccessPage from "./components/Dashboard/SuccessPage";
import BatchDetail from "./components/Dashboard/BatchDetail";
import Shop from "./pages/Shop";
import CartCheckoutPages from "./components/Shop/Cart";
import UsersPresciptions from "./pages/UserPrescription";
import VerifiedProductPage from "./components/Homepage/Verified";

const App = () => {
  const location = useLocation();

  // Hide navbar and footer if route includes "dashboard"
  const hideLayout = location.pathname.includes("dashboard");

  return (
    <div>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/verified" element={<VerifiedProductPage />} />

        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/batch-detail" element={<BatchDetail />} />
        {/* shop */}
        <Route path="/upload-prescriptions" element={<UsersPresciptions />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartCheckoutPages />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
