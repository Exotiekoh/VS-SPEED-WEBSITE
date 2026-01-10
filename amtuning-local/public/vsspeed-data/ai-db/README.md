# VS SPEED Shared AI Database

## Overview

Centralized database system for communication between MCP server and website AI systems (AI Tuner, AI Mechanic, AI Consultant).

## Database Files

- **customers.json** - Customer profiles, vehicle configurations, chat history
- **products.json** - Product catalog, pricing, inventory
- **orders.json** - Order history, tracking, fulfillment status
- **suppliers.json** - Supplier info, pricing, communication logs
- **ai-sessions.json** - AI conversation context, recommendations, diagnoses
- **config.json** - Shared configuration, API keys, feature flags

## Usage

```javascript
const sharedDB = require('./shared-db.js');

// Read data
const customers = await sharedDB.read('customers');

// Write data
await sharedDB.write('customers', updatedCustomers);

// Append item
await sharedDB.append('orders', newOrder);

// Query with filter
const openOrders = await sharedDB.query('orders', order => order.status === 'open');

// Update config
await sharedDB.updateConfig({ ai_tuner_enabled: true });
```

## Schema Version

1.0.0

## Last Updated

2026-01-06T21:02:44-05:00
