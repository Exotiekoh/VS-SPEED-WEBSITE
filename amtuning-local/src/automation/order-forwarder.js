// VSSPEED GLOBAL - Order Forwarding System
// This module handles automatic order forwarding to suppliers for dropshipping

import { supplierConfig } from './automation-config.js';

/**
 * Forwards customer order to supplier for dropshipping
 * @param {Object} order - Customer order details
 * @returns {Promise<Object>} Order confirmation from supplier
 */
export const forwardOrderToSupplier = async (order) => {
    try {
        console.log(`📦 Forwarding order #${order.id} to supplier...`);
        
        const supplier = findSupplierForProduct(order.items[0].productId);
        
        if (!supplier) {
            throw new Error('Supplier not found for product');
        }

        // Prepare supplier order
        const supplierOrder = {
            customerId: 'VSSPEED-' + order.id,
            items: order.items.map(item => ({
                productId: item.supplierId || item.productId,
                quantity: item.quantity,
                price: item.supplierPrice
            })),
            shipping: {
                name: order.customer.name,
                address: order.customer.address,
                city: order.customer.city,
                state: order.customer.state,
                zip: order.customer.zip,
                country: order.customer.country || 'USA',
                phone: order.customer.phone,
                email: order.customer.email
            },
            billing: {
                // Use your business address for billing
                name: 'VS SPEED GLOBAL',
                address: 'Your Business Address',
                email: 'vsspeedhq@gmail.com'
            },
            notes: `Dropship order from VSSPEED. Order ID: ${order.id}`
        };

        // Submit order to supplier (mock for now)
        const confirmation = await submitSupplierOrder(supplier, supplierOrder);
        
        console.log(`✅ Order forwarded successfully! Supplier Order #${confirmation.orderId}`);
        
        // Send confirmation email to customer
        await sendCustomerConfirmation(order, confirmation);
        
        return {
            success: true,
            supplierOrderId: confirmation.orderId,
            trackingNumber: confirmation.trackingNumber,
            estimatedDelivery: confirmation.estimatedDelivery
        };
        
    } catch (error) {
        console.error(`❌ Error forwarding order:`, error.message);
        
        // Alert admin
        await alertAdmin({
            type: 'ORDER_FORWARD_FAILED',
            orderId: order.id,
            error: error.message
        });
        
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Find supplier for a product
 */
const findSupplierForProduct = (productId) => {
    // Extract supplier from product ID
    const supplierId = productId.split('-')[0];
    return supplierConfig.suppliers[supplierId] || null;
};

/**
 * Submit order to supplier (mock - replace with real API calls)
 */
const submitSupplierOrder = async (supplier, order) => {
    // Simulate API call
    console.log(`🔌 API: Submitting ${order.items.length} items to ${supplier.name}...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response
    return {
        orderId: `${supplier.name.toUpperCase()}-${Date.now()}`,
        trackingNumber: `1Z999AA1${Math.floor(Math.random() * 10000000000)}`,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'PROCESSING'
    };
};

/**
 * Send order confirmation to customer
 */
const sendCustomerConfirmation = async (order, confirmation) => {
    const emailContent = `
Dear ${order.customer.name},

Thank you for your order from VS SPEED GLOBAL!

Order #: ${order.id}
Tracking #: ${confirmation.trackingNumber}
Estimated Delivery: ${new Date(confirmation.estimatedDelivery).toLocaleDateString()}

Your order has been forwarded to our supplier and will ship within 2-3 business days.

Items:
${order.items.map(item => `- ${item.title} (Qty: ${item.quantity}) - $${item.price}`).join('\n')}

Total: $${order.total}

You can track your order at: https://vsspeed.org/track/${confirmation.trackingNumber}

Best regards,
VS SPEED GLOBAL Team
vsspeedhq@gmail.com
    `;

    console.log(`📧 Sending confirmation email to ${order.customer.email}`);
    console.log('--- Email Start ---');
    console.log(emailContent);
    console.log('--- Email End ---');
    // In production, use SendGrid/Mailgun API
    
    return true;
};

/**
 * Alert admin of issues
 */
const alertAdmin = async (alert) => {
    console.log(`🚨 ADMIN ALERT: ${alert.type}`);
    console.log(`   Order ID: ${alert.orderId}`);
    console.log(`   Error: ${alert.error}`);
    
    // In production, send email/SMS to admin
    return true;
};

/**
 * Track order status from supplier
 */
export const trackSupplierOrder = async (supplierOrderId) => {
    // Mock tracking
    return {
        orderId: supplierOrderId,
        status: 'SHIPPED',
        trackingNumber: '1Z999AA10123456789',
        location: 'In Transit',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    };
};

/**
 * Sync tracking numbers from supplier
 */
export const syncTrackingNumbers = async (orderIds) => {
    console.log(`🔄 Syncing tracking numbers for ${orderIds.length} orders...`);
    
    const updates = [];
    
    for (const orderId of orderIds) {
        const tracking = await trackSupplierOrder(orderId);
        updates.push({
            orderId,
            trackingNumber: tracking.trackingNumber,
            status: tracking.status
        });
    }
    
    return updates;
};

/**
 * Handle order cancellation
 */
export const cancelSupplierOrder = async (orderId) => {
    console.log(`❌ Cancelling supplier order ${orderId}...`);
    
    // In production, call supplier API to cancel
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, refundAmount: 0 };
};

export default {
    forwardOrderToSupplier,
    trackSupplierOrder,
    syncTrackingNumbers,
    cancelSupplierOrder
};
