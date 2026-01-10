import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VehicleSelectorBar from './components/vehicle/VehicleSelectorBar';
import EmailPopup from './components/marketing/EmailPopup';
import SalePopup from './components/marketing/SalePopup';
import FloatingAd from './components/marketing/FloatingAd';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import TextPage from './pages/TextPage';
import Garage from './pages/Garage';
import Forums from './pages/Forums';
import Forum from './pages/Forum';
import Thread from './pages/Thread';
import NewPost from './pages/NewPost';
import AiTuner from './pages/AiTuner';
import PartHunter from './pages/PartHunter';
import PaymentSettings from './pages/PaymentSettings';
import Login from './pages/Login'; 
import AdminDashboard from './pages/AdminDashboard'; 
import AdminLogin from './pages/AdminLogin'; 
import UserProfile from './pages/UserProfile'; 
import ScrollToTop from './components/ui/ScrollToTop';
import Background3D from './components/ui/Background3D';

// Auth & Security
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { VIPProvider } from './contexts/VIPContext';
import SecurityGateway from './components/ui/SecurityGateway';

// Placeholder components
const Contact = () => <TextPage title="Contact Us" content="Support: vsspeedsupport@exotiekoh.github.io | General Inquiries: vsspeedhq@gmail.com | Mississauga, ON, Canada" />;

import ShippingInfo from './pages/ShippingInfo';
import Disclaimer from './pages/Disclaimer';
import CustomFabrication from './pages/CustomFabrication';
import AIMechanic from './pages/AIMechanic';
import AIAssistant from './pages/AIAssistant';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <VIPProvider>
      <SecurityGateway>
        <ScrollToTop />
        <Background3D />
        <div className="app" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
          width: '100%', 
          background: 'transparent', // Changed from var(--color-bg-deep) to show 3D ocean
          position: 'relative',
          zIndex: 1
        }}>
          <EmailPopup />
          <SalePopup />
          <FloatingAd />
          <CookieConsent />
          <Header />
          <VehicleSelectorBar />
          <div style={{ flex: '1', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/custom-fabrication" element={<CustomFabrication />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Login />} />
              <Route path="/account/payments" element={<PaymentSettings />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/garage" element={<Garage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forums" element={<Forums />} />
              <Route path="/forums/new" element={<NewPost />} />
              <Route path="/forums/:forumId" element={<Forum />} />
              <Route path="/forums/thread/:threadId" element={<Thread />} />
              <Route path="/ai-tuner" element={<AiTuner />} />
              <Route path="/ai-mechanic" element={<AIMechanic />} />
              <Route path="/ai-consultant" element={<AIAssistant />} />
              <Route path="/part-hunter" element={<PartHunter />} />
              <Route path="/shipping" element={<ShippingInfo />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/returns-refunds-policy" element={<TextPage title="Returns & Refunds" />} />
              <Route path="/privacy-policy" element={<TextPage title="Privacy Policy" />} />
              <Route path="/about" element={<TextPage title="About Us" content="VSSPEED Global is your premier source for European automotive performance parts. Worldwide shipping, no compromises." />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </SecurityGateway>
    </VIPProvider>
    </AuthProvider>
    </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
