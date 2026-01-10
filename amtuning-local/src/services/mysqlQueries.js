/**
 * VS SPEED - MySQL Query Examples
 * Vehicle-specific product filtering and AI logging
 */

import mysqlService from './services/mysqlService';

// ==========================================
// PRODUCT QUERIES BY VEHICLE
// ==========================================

/**
 * Get all products compatible with BMW 335i 2011
 */
async function getBMW335iProducts() {
  try {
    const products = await mysqlService.getProductsByVehicle('BMW', '335i', 2011);
    console.log(`Found ${products.length} products for BMW 335i 2011`);
    return products;
  } catch (error) {
    console.error('Error fetching BMW products:', error);
    return [];
  }
}

/**
 * Get products for any vehicle
 */
async function getVehicleProducts(make, model, year) {
  try {
    const products = await mysqlService.getProductsByVehicle(make, model, year);
    console.log(`Found ${products.length} products for ${year} ${make} ${model}`);
    return products;
  } catch (error) {
    console.error(`Error fetching ${make} ${model} products:`, error);
    return [];
  }
}

// ==========================================
// AI INTERACTION LOGGING
// ==========================================

/**
 * Log AI Tuner interaction
 */
async function logTunerInteraction(userId, userQuery, aiResponse, vehicle) {
  try {
    const interactionId = await mysqlService.logAIInteraction(
      userId,
      'tuner',
      userQuery,
      aiResponse,
      {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        mods: vehicle.modifications || []
      }
    );
    console.log(`✅ AI Tuner interaction logged: ${interactionId}`);
    return interactionId;
  } catch (error) {
    console.error('Error logging AI interaction:', error);
    return null;
  }
}

/**
 * Log AI Mechanic interaction
 */
async function logMechanicInteraction(userId, userQuery, aiResponse, vehicle) {
  try {
    const interactionId = await mysqlService.logAIInteraction(
      userId,
      'mechanic',
      userQuery,
      aiResponse,
      {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        issue: vehicle.currentIssue || 'General diagnosis'
      }
    );
    console.log(`✅ AI Mechanic interaction logged: ${interactionId}`);
    return interactionId;
  } catch (error) {
    console.error('Error logging AI interaction:', error);
    return null;
  }
}

/**
 * Log AI Consultant interaction
 */
async function logConsultantInteraction(userId, userQuery, aiResponse, vehicle) {
  try {
    const interactionId = await mysqlService.logAIInteraction(
      userId,
      'consultant',
      userQuery,
      aiResponse,
      {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        budget: vehicle.budget || 'Not specified'
      }
    );
    console.log(`✅ AI Consultant interaction logged: ${interactionId}`);
    return interactionId;
  } catch (error) {
    console.error('Error logging AI interaction:', error);
    return null;
  }
}

// ==========================================
// USAGE EXAMPLES
// ==========================================

// Example 1: Get products for BMW 335i
const bmwProducts = await getBMW335iProducts();

// Example 2: Get products for any vehicle
const audiProducts = await getVehicleProducts('Audi', 'S4', 2015);
const vwProducts = await getVehicleProducts('Volkswagen', 'GTI', 2018);

// Example 3: Log AI Tuner conversation
await logTunerInteraction(
  'user123',
  'What mods should I do for 500hp on my N54?',
  'For 500hp on N54, I recommend: FMIC, downpipes, HPFP, and Stage 2+ tune...',
  { make: 'BMW', model: '335i', year: 2011, modifications: ['Stock'] }
);

// Example 4: Log AI Mechanic diagnosis
await logMechanicInteraction(
  'user123',
  'My car is misfiring on cylinder 3',
  'Cylinder 3 misfire could be: bad coil pack, spark plug, or injector...',
  { make: 'BMW', model: '335i', year: 2011, currentIssue: 'Misfire P0303' }
);

// Example 5: Log AI Consultant recommendation
await logConsultantInteraction(
  'user123',
  'Best bang for buck mods under $2000?',
  'For $2000, prioritize: JB4 tuner ($450), downpipes ($800), FMIC ($600)...',
  { make: 'BMW', model: '335i', year: 2011, budget: '$2000' }
);

export {
  getBMW335iProducts,
  getVehicleProducts,
  logTunerInteraction,
  logMechanicInteraction,
  logConsultantInteraction
};
