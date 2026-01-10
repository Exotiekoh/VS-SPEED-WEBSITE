/**
 * VS SPEED - Apple Pay Integration
 * Supports Apple Pay for fast, secure checkout
 */

/* global ApplePaySession */

class ApplePayService {
  constructor() {
    this.merchantId = import.meta.env.VITE_APPLE_PAY_MERCHANT_ID || 'merchant.com.vsspeed';
    this.isApplePayAvailable = this.checkAvailability();
  }

  /**
   * Check if Apple Pay is available
   */
  checkAvailability() {
    if (typeof window !== 'undefined' && window.ApplePaySession) {
      return window.ApplePaySession.canMakePayments();
    }
    return false;
  }

  /**
   * Start Apple Pay session
   */
  async startPayment(amount, currency = 'USD', items = []) {
    if (!this.isApplePayAvailable) {
      throw new Error('Apple Pay is not available on this device');
    }

    const request = {
      countryCode: 'US',
      currencyCode: currency,
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      total: {
        label: 'VS SPEED Global',
        amount: amount.toString(),
        type: 'final'
      },
      lineItems: items.map(item => ({
        label: item.title,
        amount: item.price.toString(),
        type: 'final'
      }))
    };

    const session = new window.ApplePaySession(3, request);

    return new Promise((resolve, reject) => {
      session.onvalidatemerchant = async (event) => {
        try {
          // Validate merchant with your backend
          const response = await fetch('/api/apple-pay/validate-merchant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              validationURL: event.validationURL
            })
          });

          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          reject(error);
          session.abort();
        }
      };

      session.onpaymentauthorized = async (event) => {
        try {
          // Process payment with your backend
          const response = await fetch('/api/apple-pay/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              payment: event.payment
            })
          });

          const result = await response.json();

          if (result.success) {
            session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
            resolve(result);
          } else {
            session.completePayment(window.ApplePaySession.STATUS_FAILURE);
            reject(new Error('Payment failed'));
          }
        } catch (error) {
          session.completePayment(window.ApplePaySession.STATUS_FAILURE);
          reject(error);
        }
      };

      session.oncancel = () => {
        reject(new Error('Payment cancelled by user'));
      };

      session.begin();
    });
  }

  /**
   * Create Apple Pay button
   */
  createButton(onClick) {
    const button = document.createElement('apple-pay-button');
    button.buttonstyle = 'black';
    button.type = 'buy';
    button.locale = 'en-US';
    button.addEventListener('click', onClick);
    return button;
  }
}

export default new ApplePayService();
