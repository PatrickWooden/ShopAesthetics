import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarSeller from "./components/navigation/navigationSeller.js";
import NavBarBuyer from "./components/navigation/navigationBuyer.js";
import Footer from "./components/footer/footer.js";
import DashBoardSeller from "./components/seller-portal/dashboard-seller/dashboard_seller";
import Preview from "./components/seller-portal/postadd/preview";
import CreateNewAd from "./components/seller-portal/postadd/createnewads";
import DashBoardBuyer from "./components/buyers-portal/dashboard/dashboard-buyer";
import AboutUs from "./components/about_us";

import Analytical_dashboard from "./components/seller-portal/analytics-seller/Analytic_dashboard";
import ActiveAdsPage from "./components/seller-portal/analytics-seller/ActiveAdsPage";
import DeletePage from "./components/seller-portal/analytics-seller/DeletePage";
import DraftsPage from "./components/seller-portal/analytics-seller/DraftsPage";
import ChatPage from "./components/seller-portal/analytics-seller/ChatPage";
import SellerRatingPage from "./components/seller-portal/analytics-seller/SellerRatingPage";
import RenewPage from "./components/seller-portal/analytics-seller/RenewPage";
import SoldPage from "./components/seller-portal/analytics-seller/SoldPage";
import Login from "./components/login-register/Login";
import Signup from "./components/login-register/Signup";
import ForgotPassword from "./components/login-register/ForgotPassword";

function App() {
  // this array contains only seller portal
  const array = ["/dashboard", "/analytics", "/business_orders", "/postAd"];

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        {array.includes(window.location.pathname) ? (
          <NavBarSeller />
        ) : (
          <NavBarBuyer />
        )}

        <Routes>
          {/* For Login and Register Pages */}
          <Route path='/login' element={<Login/>}/> 
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>

          {/* For Buyer's Portal */}
          <Route path="/" element={<DashBoardBuyer />} />

          {/* For Seller's Portal */}
          <Route path="/dashboard" element={<DashBoardSeller />} />
          <Route path="/postAd" element={<CreateNewAd />} />
          <Route path="/preview" element={<Preview />} />

          {/* For seller portal analytics */}
          <Route path="/analytics" element={<Analytical_dashboard />} />
          <Route path="/analytics/active-ads" element={<ActiveAdsPage />} />
          <Route path="/analytics/delete-ads" element={<DeletePage />} />
          <Route path="/analytics/draft-ads" element={<DraftsPage />} />
          <Route path="/analytics/chat" element={<ChatPage />} />
          <Route
            path="/analytics/seller-rating"
            element={<SellerRatingPage />}
          />
          <Route path="/analytics/renew" element={<RenewPage />} />
          <Route path="/analytics/sold" element={<SoldPage />} />

          {/* <Route path='/business_orders' element={}/> */}

          {/* commons page for the both portal */}
          {/* <Route path='/account' element={}/> */}
          <Route path='/about_us' element={<AboutUs />}/>
        </Routes>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
