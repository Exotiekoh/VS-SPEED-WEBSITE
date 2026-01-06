import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import EmailPopup from './components/EmailPopup';
import SalePopup from './components/SalePopup';
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
import AIAssistant from './pages/AIAssistant';
import PartHunter from './pages/PartHunter';
import PaymentSettings from './pages/PaymentSettings';
import Login from './pages/Login'; // New Login Component

// Auth & Security
import { AuthProvider } from './contexts/AuthContext';
import SecurityGateway from './components/SecurityGateway';

// Placeholder components
const Contact = () => <TextPage title="Contact Us" content="Support: vsspeedsupport@gmail.com | General Inquiries: vsspeedhq@gmail.com | Mississauga, ON, Canada" />;

import ShippingInfo from './pages/ShippingInfo';
import Disclaimer from './pages/Disclaimer';
import CustomFabrication from './pages/CustomFabrication';

function App() {
  return (
    <AuthProvider>
      <SecurityGateway>
        <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', background: 'var(--color-bg-deep)' }}>
          <EmailPopup />
          <SalePopup />
          <Header />
          <div style={{ flex: '1', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/custom-fabrication" element={<CustomFabrication />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Login />} />
              <Route path="/account/payments" element={<PaymentSettings />} />
              <Route path="/garage" element={<Garage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forums" element={<Forums />} />
              <Route path="/forums/new" element={<NewPost />} />
              <Route path="/forums/:forumId" element={<Forum />} />
              <Route path="/forums/thread/:threadId" element={<Thread />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
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
    </AuthProvider>
  );
}

export default App;
