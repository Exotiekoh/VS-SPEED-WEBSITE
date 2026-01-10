/**
 * Shop.app Order Tracking Integration
 * Enables global order tracking for all VS SPEED products
 */

const SHOP_APP_API_KEY = process.env.VITE_SHOP_APP_API_KEY || '';
const SHOP_APP_API_URL = 'https://api.shop.app/v1';

/**
 * Create a tracking event in Shop.app
 */
export const createShopTracking = async (orderData) => {
  try {
    const trackingPayload = {
      order_number: orderData.orderId,
      email: orderData.customerEmail,
      tracking_number: orderData.trackingNumber,
      carrier: orderData.carrier || 'DHL Express',
      line_items: orderData.items.map(item => ({
        product_id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      shipping_address: {
        first_name: orderData.shipping.firstName,
        last_name: orderData.shipping.lastName,
        address1: orderData.shipping.address1,
        city: orderData.shipping.city,
        province: orderData.shipping.state,
        country: orderData.shipping.country,
        zip: orderData.shipping.zip
      },
      total_price: orderData.total,
      currency: 'USD'
    };

    const response = await fetch(`${SHOP_APP_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHOP_APP_API_KEY}`,
        'X-Shop-Domain': 'vsspeed.org'
      },
      body: JSON.stringify(trackingPayload)
    });

    if (!response.ok) {
      throw new Error(`Shop.app API error: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      trackingUrl: `https://shop.app/track/${orderData.trackingNumber}`,
      shopOrderId: result.id
    };
  } catch (error) {
    console.error('Shop.app tracking error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update tracking status in Shop.app
 */
export const updateShopTracking = async (trackingNumber, status, location) => {
  try {
    const updatePayload = {
      status: status, // 'in_transit', 'out_for_delivery', 'delivered'
      location: location,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${SHOP_APP_API_URL}/tracking/${trackingNumber}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHOP_APP_API_KEY}`
      },
      body: JSON.stringify(updatePayload)
    });

    if (!response.ok) {
      throw new Error(`Shop.app update error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Shop.app update error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get tracking info from Shop.app
 */
export const getShopTracking = async (trackingNumber) => {
  try {
    const response = await fetch(`${SHOP_APP_API_URL}/tracking/${trackingNumber}`, {
      headers: {
        'Authorization': `Bearer ${SHOP_APP_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Shop.app tracking not found: ${response.status}`);
    }

    const tracking = await response.json();
    return {
      success: true,
      tracking: {
        trackingNumber: tracking.tracking_number,
        carrier: tracking.carrier,
        status: tracking.status,
        estimatedDelivery: tracking.estimated_delivery,
        currentLocation: tracking.current_location,
        trackingUrl: `https://shop.app/track/${trackingNumber}`,
        events: tracking.tracking_events
      }
    };
  } catch (error) {
    console.error('Shop.app get tracking error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send tracking notification email via Shop.app
 */
export const sendShopTrackingNotification = async (email, trackingNumber) => {
  try {
    const response = await fetch(`${SHOP_APP_API_URL}/notifications/tracking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHOP_APP_API_KEY}`
      },
      body: JSON.stringify({
        email,
        tracking_number: trackingNumber,
        template: 'shipping_confirmation'
      })
    });

    if (!response.ok) {
      throw new Error(`Shop.app notification error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Shop.app notification error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Enable Shop.app tracking for all products globally
 */
export const enableGlobalShopTracking = () => {
  return {
    enabled: true,
    features: {
      realTimeTracking: true,
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      globalShipping: true,
      carriers: ['DHL Express', 'FedEx', 'UPS', 'USPS', 'Canada Post']
    },
    trackingUrl: 'https://shop.app/track',
    supportedCountries: 'Worldwide'
  };
};

export default {
  createShopTracking,
  updateShopTracking,
  getShopTracking,
  sendShopTrackingNotification,
  enableGlobalShopTracking
};
