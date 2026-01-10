import React, { useState, useEffect } from 'react';
import { X, Shield, Cookie } from 'lucide-react';
import cookieManager from '../services/cookieManager';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('vsspeed_cookie_consent');
    if (!consent) {
      // Show banner after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    cookieManager.setConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    cookieManager.setConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(10, 10, 11, 0.98)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 60, 60, 0.3)',
      padding: '24px',
      zIndex: 10000,
      boxShadow: '0 -4px 20px rgba(255, 60, 60, 0.2)',
      animation: 'slideUp 0.4s ease-out'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
        gap: '20px',
        justifyContent: 'space-between'
      }}>
        
        {/* Icon & Message */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1 }}>
          <div style={{
            backgroundColor: 'rgba(255, 60, 60, 0.1)',
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 60, 60, 0.2)'
          }}>
            <Cookie size={24} color="var(--color-primary-red)" />
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{
              color: 'var(--color-text-main)',
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Shield size={16} color="var(--color-gold)" />
              Secure Your VS SPEED Experience
            </h3>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '12px'
            }}>
              We use cookies to enhance your browsing experience, save your garage, maintain your cart, and securely store your preferences. Your IP and session data are encrypted and protected.
            </p>

            {showDetails && (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '16px',
                borderRadius: '8px',
                marginTop: '12px',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6'
              }}>
                <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '8px' }}>
                  What we store:
                </strong>
                <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                  <li>Shopping cart items (temporary or permanent if logged in)</li>
                  <li>Garage vehicles and modifications</li>
                  <li>Browsing preferences and theme settings</li>
                  <li>Session ID for security (encrypted)</li>
                  <li>IP address for fraud prevention (hashed)</li>
                </ul>
                <strong style={{ color: 'var(--color-primary-red)', display: 'block', marginBottom: '8px' }}>
                  Your data protection:
                </strong>
                <ul style={{ marginLeft: '20px' }}>
                  <li>All data is encrypted with AES-256</li>
                  <li>Temporary users: data auto-deletes after 7 days</li>
                  <li>You can clear your data anytime</li>
                  <li>We never sell your information</li>
                </ul>
              </div>
            )}

            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-gold)',
                fontSize: '13px',
                cursor: 'pointer',
                marginTop: '8px',
                textDecoration: 'underline',
                padding: 0
              }}
            >
              {showDetails ? 'Hide Details' : 'Learn More'}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          width: window.innerWidth < 768 ? '100%' : 'auto'
        }}>
          <button
            onClick={handleDecline}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s',
              minWidth: '120px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Decline
          </button>

          <button
            onClick={handleAccept}
            style={{
              padding: '12px 32px',
              backgroundColor: 'var(--color-primary-red)',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(255, 60, 60, 0.3)',
              minWidth: '140px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 60, 60, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 60, 60, 0.3)';
            }}
          >
            Accept & Continue
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
