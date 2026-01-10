import React, { useState } from 'react';
import { Bitcoin, AlertTriangle, Shield, DollarSign } from 'lucide-react';
import cryptoPaymentService from '../services/cryptoPaymentService';

const CryptoPaymentModal = ({ amount, orderId, onClose, onSuccess }) => {
  const [accepted, setAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const calculation = cryptoPaymentService.calculateTotalWithFee(amount);
  const currencies = cryptoPaymentService.getSupportedCurrencies();

  const handlePayWithCrypto = async () => {
    if (!accepted) {
      alert('You must accept the no-refund policy to proceed');
      return;
    }

    setProcessing(true);

    try {
      const result = await cryptoPaymentService.createCharge({
        orderId,
        total: amount,
        email: 'customer@example.com' // Get from user context
      });

      if (result.success) {
        // Redirect to Coinbase Commerce hosted page
        window.location.href = result.hostedUrl;
      }
    } catch (error) {
      alert('Crypto payment error: ' + error.message);
      setProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--color-bg-deep)',
        border: '2px solid var(--color-gold)',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Bitcoin size={48} color="var(--color-gold)" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: 'var(--color-text-main)', fontSize: '28px', marginBottom: '8px' }}>
            Pay with Cryptocurrency
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            Secure, fast, and anonymous
          </p>
        </div>

        {/* Price Breakdown */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Subtotal:</span>
            <span style={{ color: 'var(--color-text-main)', fontWeight: '700' }}>
              ${calculation.subtotal.toFixed(2)} USD
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>
              <DollarSign size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Processing Fee (5%):
            </span>
            <span style={{ color: 'var(--color-primary-red)', fontWeight: '600' }}>
              +${calculation.processingFee.toFixed(2)} USD
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-gold)', fontSize: '18px', fontWeight: '700' }}>
              Total to Pay:
            </span>
            <span style={{ color: 'var(--color-gold)', fontSize: '24px', fontWeight: '900' }}>
              ${calculation.total.toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* Supported Currencies */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: 'var(--color-text-main)', fontSize: '14px', marginBottom: '12px', fontWeight: '700' }}>
            Accepted Cryptocurrencies:
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {currencies.map(currency => (
              <span key={currency.code} style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--color-gold)',
                fontWeight: '600'
              }}>
                {currency.code}
              </span>
            ))}
          </div>
        </div>

        {/* WARNING Box */}
        <div style={{
          backgroundColor: 'rgba(255, 60, 60, 0.1)',
          border: '2px solid var(--color-primary-red)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <AlertTriangle size={24} color="var(--color-primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: 'var(--color-primary-red)', fontSize: '16px', fontWeight: '900', marginBottom: '8px' }}>
                ⚠️ NO REFUNDS - READ CAREFULLY
              </h4>
              <ul style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', lineHeight: '1.8', marginLeft: '20px' }}>
                <li><strong>ALL CRYPTOCURRENCY PAYMENTS ARE FINAL</strong></li>
                <li>NO refunds will be issued for crypto transactions</li>
                <li>NO exchanges or cancellations after payment</li>
                <li>5% processing fee is non-recoverable</li>
                <li>By proceeding, you waive all refund rights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acceptance Checkbox */}
        <label style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '24px',
          cursor: 'pointer',
          backgroundColor: 'rgba(255,255,255,0.02)',
          padding: '16px',
          borderRadius: '8px',
          border: `2px solid ${accepted ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)'}`,
          transition: 'all 0.3s'
        }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            style={{
              width: '20px',
              height: '20px',
              marginTop: '2px',
              cursor: 'pointer',
              accentColor: 'var(--color-gold)'
            }}
          />
          <span style={{ color: 'var(--color-text-main)', fontSize: '14px', lineHeight: '1.6' }}>
            <strong>I understand and accept</strong> that cryptocurrency payments are <strong style={{ color: 'var(--color-primary-red)' }}>FINAL and NON-REFUNDABLE</strong>. I acknowledge the 5% processing fee and agree to all terms.
          </span>
        </label>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            disabled={processing}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: 'transparent',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handlePayWithCrypto}
            disabled={!accepted || processing}
            style={{
              flex: 2,
              padding: '14px',
              backgroundColor: accepted && !processing ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '8px',
              color: accepted && !processing ? '#000' : 'rgba(255,255,255,0.3)',
              fontSize: '16px',
              fontWeight: '900',
              cursor: accepted && !processing ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              boxShadow: accepted && !processing ? '0 4px 15px rgba(212, 175, 55, 0.4)' : 'none'
            }}
          >
            {processing ? 'Processing...' : 'Pay with Crypto →'}
          </button>
        </div>

        {/* Security Badge */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px'
        }}>
          <Shield size={14} />
          <span>Secured by Coinbase Commerce</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoPaymentModal;
