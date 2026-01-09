// VSSPEED GLOBAL - Multi-Supplier Configuration
// Automation system for dropshipping from multiple platforms

export const supplierConfig = {
    // Your business details
    business: {
        name: 'VS SPEED GLOBAL',
        email: 'vsspeedhq@gmail.com',
        automationEmail: 'exoticpourco@gmail.com',
        website: 'https://vsspeed.org'
    },

    // Default profit margins
    pricing: {
        defaultMarkup: 0.35, // 35% markup
        freeShippingThreshold: 150,
        currency: 'CAD'
    },

    // Supplier configurations
    suppliers: {
        aliexpress: {
            id: 'aliexpress',
            name: 'AliExpress',
            enabled: true,
            apiType: 'affiliate', // Uses affiliate links
            profitMargin: 0.40, // 40% markup
            chatEnabled: true,
            chatWidget: 'aliwangwang',
            shippingDays: { min: 15, max: 45 },
            priority: 3, // Lower = higher priority
            categories: ['Exterior', 'Interior', 'Electronics'],
            autoOrder: false, // Requires manual order placement
            affiliateLink: 'https://s.click.aliexpress.com/e/_YOUR_AFFILIATE_ID',
            searchQuery: 'bmw performance parts'
        },

        alibaba: {
            id: 'alibaba',
            name: 'Alibaba',
            enabled: true,
            apiType: 'b2b',
            profitMargin: 0.45, // 45% markup for wholesale
            chatEnabled: true,
            chatWidget: 'trademanager',
            shippingDays: { min: 20, max: 60 },
            priority: 4,
            categories: ['Bulk Orders', 'Custom Parts'],
            autoOrder: false,
            minOrderQty: 5,
            searchQuery: 'automotive performance parts'
        },

        amazon: {
            id: 'amazon',
            name: 'Amazon',
            enabled: true,
            apiType: 'pa-api', // Product Advertising API
            profitMargin: 0.15, // Lower margin due to competition
            chatEnabled: false,
            shippingDays: { min: 2, max: 7 },
            priority: 1, // Highest priority - fast shipping
            categories: ['All'],
            autoOrder: true, // Can auto-order via API
            affiliateTag: 'vsspeed-20',
            apiEndpoint: 'https://webservices.amazon.com/paapi5/searchitems'
        },

        ecstuning: {
            id: 'ecstuning',
            name: 'ECS Tuning',
            enabled: true,
            apiType: 'scrape',
            profitMargin: 0.25,
            chatEnabled: false,
            shippingDays: { min: 3, max: 10 },
            priority: 2,
            categories: ['Engine Components', 'Brake Systems', 'Suspension'],
            autoOrder: false,
            baseUrl: 'https://www.ecstuning.com',
            searchPath: '/Search/SiteSearch'
        },

        turnermotorsport: {
            id: 'turnermotorsport',
            name: 'Turner Motorsport',
            enabled: true,
            apiType: 'scrape',
            profitMargin: 0.25,
            chatEnabled: false,
            shippingDays: { min: 3, max: 10 },
            priority: 2,
            categories: ['Performance Tuning', 'Exhaust Systems'],
            autoOrder: false,
            baseUrl: 'https://www.turnermotorsport.com'
        },

        fcpeuro: {
            id: 'fcpeuro',
            name: 'FCP Euro',
            enabled: true,
            apiType: 'scrape',
            profitMargin: 0.20,
            chatEnabled: false,
            shippingDays: { min: 2, max: 7 },
            priority: 1,
            categories: ['OEM Parts', 'Maintenance'],
            autoOrder: false,
            baseUrl: 'https://www.fcpeuro.com',
            lifetimeWarranty: true
        },

        dhgate: {
            id: 'dhgate',
            name: 'DHgate',
            enabled: true,
            apiType: 'affiliate',
            profitMargin: 0.40,
            chatEnabled: true,
            chatWidget: 'dhgate-messenger',
            shippingDays: { min: 10, max: 30 },
            priority: 3,
            categories: ['Exterior', 'Interior', 'Accessories'],
            autoOrder: false
        }
    },

    // Automation settings
    automation: {
        syncInterval: 24, // hours
        priceCheckInterval: 6, // hours
        stockCheckInterval: 1, // hours
        autoUpdatePrices: true,
        autoRemoveOutOfStock: false,
        notifyOnPriceChange: true,
        notifyOnStockChange: true
    },

    // Email templates
    emails: {
        orderConfirmation: true,
        shippingNotification: true,
        deliveryConfirmation: true,
        reviewRequest: true,
        adminAlerts: true
    }
};

// Get best supplier for a product category
export const getBestSupplier = (category) => {
    const enabled = Object.values(supplierConfig.suppliers)
        .filter(s => s.enabled)
        .filter(s => s.categories.includes(category) || s.categories.includes('All'));
    
    return enabled.sort((a, b) => a.priority - b.priority)[0] || null;
};

// Calculate selling price from supplier price
export const calculateSellingPrice = (supplierPrice, supplierId) => {
    const supplier = supplierConfig.suppliers[supplierId];
    const margin = supplier?.profitMargin || supplierConfig.pricing.defaultMarkup;
    return Math.ceil(supplierPrice * (1 + margin) * 100) / 100;
};

// Check if supplier supports chat
export const getSupplierChatWidget = (supplierId) => {
    const supplier = supplierConfig.suppliers[supplierId];
    if (supplier?.chatEnabled) {
        return supplier.chatWidget;
    }
    return null;
};

export default supplierConfig;
