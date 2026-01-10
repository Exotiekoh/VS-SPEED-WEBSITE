/**
 * VS SPEED - Cryptocurrency Payment Integration
 * Supports Bitcoin, Ethereum, USDC, and more
 * NO REFUNDS - Crypto payments are final
 */

import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

class CryptoPaymentService {
  constructor() {
    this.coinbaseApiKey = import.meta.env.VITE_COINBASE_API_KEY;
    this.cryptoProcessingFee = 0.05; // 5% processing fee for crypto
    this.supportedCurrencies = ['BTC', 'ETH', 'USDC', 'USDT', 'LTC'];
  }

  /**
   * Get crypto processing fee
   */
  getProcessingFee(amount) {
    return amount * this.cryptoProcessingFee;
  }

  /**
   * Calculate total with crypto fee
   */
  calculateTotalWithFee(amount) {
    const fee = this.getProcessingFee(amount);
    return {
      subtotal: amount,
      processingFee: fee,
      total: amount + fee,
      disclaimer: 'Cryptocurrency payments are FINAL and NON-REFUNDABLE'
    };
  }

  /**
   * Create crypto payment charge
   */
  async createCharge(orderData) {
    const { total } = orderData;
    const calculation = this.calculateTotalWithFee(total);

    // Create charge via Coinbase Commerce API
    const charge = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': this.coinbaseApiKey,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name: 'VS SPEED Order',
        description: `Order ${orderData.orderId}`,
        local_price: {
          amount: calculation.total.toString(),
          currency: 'USD'
        },
        pricing_type: 'fixed_price',
        metadata: {
          orderId: orderData.orderId,
          customerEmail: orderData.email,
          processingFee: calculation.processingFee.toString()
        },
        redirect_url: `${window.location.origin}/order-confirmation`,
        cancel_url: `${window.location.origin}/cart`
      })
    });

    const chargeData = await charge.json();

    // Store in Firebase
    await addDoc(collection(db, 'crypto_payments'), {
      orderId: orderData.orderId,
      chargeCode: chargeData.data.code,
      chargeId: chargeData.data.id,
      amount: calculation.total,
      processingFee: calculation.processingFee,
      currency: 'USD',
      status: 'pending',
      refundable: false, // CRITICAL: Never refundable
      createdAt: new Date().toISOString(),
      hostedUrl: chargeData.data.hosted_url,
      expiresAt: chargeData.data.expires_at
    });

    return {
      success: true,
      chargeCode: chargeData.data.code,
      hostedUrl: chargeData.data.hosted_url,
      totalAmount: calculation.total,
      processingFee: calculation.processingFee,
      disclaimer: calculation.disclaimer
    };
  }

  /**
   * Verify payment status
   */
  async verifyPayment(chargeCode) {
    const response = await fetch(`https://api.commerce.coinbase.com/charges/${chargeCode}`, {
      headers: {
        'X-CC-Api-Key': this.coinbaseApiKey,
        'X-CC-Version': '2018-03-22'
      }
    });

    const data = await response.json();
    const status = data.data.timeline[data.data.timeline.length - 1].status;

    return {
      confirmed: status === 'COMPLETED',
      status: status,
      payments: data.data.payments,
      amountPaid: data.data.payments[0]?.value?.crypto?.amount || 0,
      currency: data.data.payments[0]?.value?.crypto?.currency || 'N/A'
    };
  }

  /**
   * Handle crypto webhook (payment confirmation)
   */
  async handleWebhook(webhookData) {
    const { event } = webhookData;

    if (event.type === 'charge:confirmed') {
      // Update order status
      const chargeId = event.data.id;
      
      // Mark as paid (NON-REFUNDABLE)
      await updateDoc(doc(db, 'crypto_payments', chargeId), {
        status: 'completed',
        confirmedAt: new Date().toISOString(),
        refundable: false,
        finalAmount: event.data.pricing.local.amount
      });

      return { success: true, orderId: event.data.metadata.orderId };
    }

    return { success: false };
  }

  /**
   * Get supported currencies
   */
  getSupportedCurrencies() {
    return this.supportedCurrencies.map(currency => ({
      code: currency,
      name: this.getCurrencyName(currency),
      processingFee: `${this.cryptoProcessingFee * 100}%`,
      refundable: false
    }));
  }

  /**
   * Get currency full name
   */
  getCurrencyName(code) {
    const names = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'USDC': 'USD Coin',
      'USDT': 'Tether',
      'LTC': 'Litecoin'
    };
    return names[code] || code;
  }

  /**
   * Attempt refund (ALWAYS FAILS for crypto)
   */
  async requestRefund(orderId) {
    // Check payment method
    const paymentDoc = await getDocs(
      query(collection(db, 'crypto_payments'), where('orderId', '==', orderId))
    );

    if (!paymentDoc.empty) {
      throw new Error(
        'CRYPTO PAYMENTS ARE NON-REFUNDABLE. All cryptocurrency transactions are final per VS SPEED policy.'
      );
    }

    return { success: false, reason: 'Crypto payments cannot be refunded' };
  }
}

export default new CryptoPaymentService();
