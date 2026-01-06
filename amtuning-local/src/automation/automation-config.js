// VSSPEED GLOBAL - Supplier Automation Configuration
// This file configures all supplier integrations, pricing rules, and sync settings

export const supplierConfig = {
    // Supplier endpoints and credentials
    suppliers: {
        ecstuning: {
            name: 'ECS Tuning',
            baseUrl: 'https://www.ecstuning.com',
            enabled: true,
            apiKey: process.env.ECS_API_KEY || '', // Set in .env file
            scrapeConfig: {
                productSelector: '.product-item',
                titleSelector: '.product-name',
                priceSelector: '.product-price',
                imageSelector: '.product-image img',
                descriptionSelector: '.product-description',
                stockSelector: '.stock-status'
            }
        },
        turner: {
            name: 'Turner Motorsport',
            baseUrl: 'https://www.turnermotorsport.com',
            enabled: true,
            apiKey: process.env.TURNER_API_KEY || '',
            scrapeConfig: {
                productSelector: '.product-card',
                titleSelector: '.product-title',
                priceSelector: '.price',
                imageSelector: '.product-img',
                descriptionSelector: '.description',
                stockSelector: '.availability'
            }
        },
        fcpeuro: {
            name: 'FCP Euro',
            baseUrl: 'https://www.fcpeuro.com',
            enabled: true,
            apiKey: process.env.FCP_API_KEY || '',
            scrapeConfig: {
                productSelector: '.product',
                titleSelector: '.title',
                priceSelector: '.product-price',
                imageSelector: '.product-image',
                descriptionSelector: '.details',
                stockSelector: '.stock'
            }
        },
        modbargains: {
            name: 'ModBargains',
            baseUrl: 'https://www.modbargains.com',
            enabled: true,
            apiKey: process.env.MODBARGAINS_API_KEY || '',
            scrapeConfig: {
                productSelector: '.item',
                titleSelector: '.product-name',
                priceSelector: '.price-box',
                imageSelector: '.product-image img',
                descriptionSelector: '.product-desc',
                stockSelector: '.in-stock'
            }
        }
    },

    // Pricing rules - Your profit margins
    pricing: {
        defaultMarkup: 0.25, // 25% markup on all products
        minimumProfit: 10, // Minimum $10 profit per item
        categoryMarkups: {
            'Performance Tuning': 0.30, // 30% on high-demand items
            'Engine Components': 0.28,
            'Suspension': 0.25,
            'Exterior': 0.22,
            'Interior': 0.20,
            'Custom Fabrication': 0.35 // Higher margin on custom work
        },
        shippingMarkup: 0.15 // Add 15% to supplier shipping cost
    },

    // Automation settings
    automation: {
        syncInterval: 21600000, // 6 hours in milliseconds
        priceUpdateInterval: 86400000, // Daily price updates
        inventoryCheckInterval: 3600000, // Hourly inventory check
        maxConcurrentRequests: 5, // Avoid rate limiting
        retryAttempts: 3,
        retryDelay: 5000, // 5 seconds between retries
        enableAutoSync: true,
        enableAutoOrdering: true,
        enableInventoryTracking: true
    },

    // Category mapping - Map supplier categories to your categories
    categoryMapping: {
        'turbochargers': 'Performance Tuning',
        'intercoolers': 'Performance Tuning',
        'exhaust': 'Performance Tuning',
        'intakes': 'Performance Tuning',
        'engine parts': 'Engine Components',
        'fuel system': 'Engine Components',
        'ignition': 'Engine Components',
        'suspension': 'Suspension',
        'coilovers': 'Suspension',
        'sway bars': 'Suspension',
        'body kits': 'Exterior',
        'spoilers': 'Exterior',
        'carbon fiber': 'Exterior',
        'seats': 'Interior',
        'steering wheels': 'Interior',
        'shift knobs': 'Interior'
    },

    // Security & Rate Limiting
    security: {
        enableRateLimiting: true,
        requestsPerMinute: 60,
        enableProxyRotation: false, // Set to true if you get IP banned
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        respectRobotsTxt: true,
        maxRetries: 3,
        timeout: 30000 // 30 seconds
    },

    // Email notifications
    notifications: {
        enableOrderNotifications: true,
        enableInventoryAlerts: true,
        enableErrorAlerts: true,
        adminEmail: 'vsspeedhq@gmail.com',
        customerEmailTemplate: 'order-confirmation'
    }
};

// Helper function to calculate price with markup
export const calculatePrice = (supplierPrice, category = null) => {
    const basePrice = parseFloat(supplierPrice);
    
    // Get category-specific markup or use default
    const markupRate = category && supplierConfig.pricing.categoryMarkups[category]
        ? supplierConfig.pricing.categoryMarkups[category]
        : supplierConfig.pricing.defaultMarkup;
    
    const markedUpPrice = basePrice * (1 + markupRate);
    const profit = markedUpPrice - basePrice;
    
    // Ensure minimum profit
    if (profit < supplierConfig.pricing.minimumProfit) {
        return basePrice + supplierConfig.pricing.minimumProfit;
    }
    
    return Math.round(markedUpPrice * 100) / 100; // Round to 2 decimals
};

// Helper function to get active suppliers
export const getActiveSuppliers = () => {
    return Object.entries(supplierConfig.suppliers)
        .filter(([_, config]) => config.enabled)
        .map(([key, config]) => ({ id: key, ...config }));
};

// Helper function to validate supplier config
export const validateSupplierConfig = (supplierId) => {
    const supplier = supplierConfig.suppliers[supplierId];
    if (!supplier) {
        throw new Error(`Supplier ${supplierId} not found in configuration`);
    }
    if (!supplier.enabled) {
        throw new Error(`Supplier ${supplierId} is currently disabled`);
    }
    return supplier;
};

export default supplierConfig;
