/**
 * AI Context Builder Service
 * Builds rich context from product database and user data for LLM calls
 */

import { products } from '../data/productDatabase';

/**
 * Engine-specific knowledge base
 * Common issues, upgrade paths, and power targets by engine code
 */
const ENGINE_KNOWLEDGE = {
  // BMW Engines
  'N54': {
    knownIssues: ['Wastegate rattle', 'HPFP failure', 'Water pump failure', 'Injector issues', 'Valve cover gasket'],
    recommendedUpgrades: ['LPFP upgrade', 'Charge pipe upgrade', 'Intercooler upgrade', 'Spark plugs', 'Ignition coils'],
    powerTargets: '400-500whp on stock turbos, 600-700whp on upgraded turbos',
    fuelRequirements: 'E85 recommended for 450+whp',
    commonMods: ['JB4', 'MHD Flash', 'Bootmod3']
  },
  'N55': {
    knownIssues: ['Charge pipe failure', 'Valve cover gasket', 'Oil filter housing gasket', 'Water pump'],
    recommendedUpgrades: ['Charge pipe', 'Downpipe', 'Intercooler', 'Intake'],
    powerTargets: '350-400whp Stage 2, 500+whp with turbo upgrade',
    fuelRequirements: '93 octane minimum, E30-E50 for max power',
    commonMods: ['MHD', 'Bootmod3', 'BMS JB4']
  },
  'B58': {
    knownIssues: ['Charge pipe crack', 'Carbon buildup'],
    recommendedUpgrades: ['Catless downpipe', 'Charge pipe', 'Intake', 'FMIC'],
    powerTargets: '400whp Stage 1, 450-500whp Stage 2, 600+whp with turbo',
    fuelRequirements: '93 octane, E30 for max power',
    commonMods: ['MHD', 'Bootmod3', 'xHP Transmission flash']
  },
  'S55': {
    knownIssues: ['Crank hub issue (early cars)', 'Charge pipe', 'Intercooler heat soak'],
    recommendedUpgrades: ['Downpipes', 'Midpipe', 'Intercooler', 'Intakes', 'Charge pipes'],
    powerTargets: '550whp Stage 2, 650+whp with supporting mods',
    fuelRequirements: '93 octane, E50 for 600+whp',
    commonMods: ['MHD', 'Bootmod3']
  },
  'S58': {
    knownIssues: ['Very reliable platform'],
    recommendedUpgrades: ['Downpipes', 'Intakes', 'Intercooler', 'Flex fuel kit'],
    powerTargets: '600whp Stage 1, 700+whp Stage 2',
    fuelRequirements: '93 octane, E85 for max power',
    commonMods: ['MHD', 'Bootmod3']
  },
  // VW/Audi Engines
  'EA888': {
    knownIssues: ['Carbon buildup (Gen1-2)', 'Water pump', 'Thermostat', 'PCV valve'],
    recommendedUpgrades: ['Intake', 'Downpipe', 'Intercooler', 'DSG tune'],
    powerTargets: '300whp Stage 1, 350whp Stage 2, 400+whp IS38/hybrid turbo',
    fuelRequirements: '93 octane, E85 for big turbo',
    commonMods: ['APR', 'Unitronic', 'IE', 'EQT']
  },
  'EA113': {
    knownIssues: ['Timing chain tensioner', 'PCV system', 'Cam follower wear'],
    recommendedUpgrades: ['K04 turbo upgrade', 'Fueling', 'Intercooler'],
    powerTargets: '280whp Stage 2 K03, 350+whp K04',
    fuelRequirements: '93 octane minimum',
    commonMods: ['APR', 'Unitronic', 'Revo']
  },
  // JDM Engines
  '2JZ': {
    knownIssues: ['Head gasket at high boost', 'Fuel system limitations stock'],
    recommendedUpgrades: ['Single turbo kit', 'Fuel system', 'Head studs', 'Built head'],
    powerTargets: '500whp stock bottom end, 800+whp built',
    fuelRequirements: 'E85 preferred for high power',
    commonMods: ['Haltech', 'AEM', 'Link ECU']
  },
  'VR38': {
    knownIssues: ['Stock fuel pump limits around 600whp', 'Transmission at high power'],
    recommendedUpgrades: ['Fuel pumps', 'Injectors', 'Downpipes', 'Intercooler'],
    powerTargets: '600whp stock turbos, 1000+whp with upgrades',
    fuelRequirements: 'E85 essential for 700+whp',
    commonMods: ['ECUTEK', 'Cobb']
  },
  'FA20': {
    knownIssues: ['Ringland failure from lean conditions', 'Oil consumption'],
    recommendedUpgrades: ['Header', 'Tune', 'Intake', 'Flex fuel'],
    powerTargets: '220whp NA, 350+whp turbo',
    fuelRequirements: '93 octane, E85 for turbo builds',
    commonMods: ['ECUTEK', 'OFT']
  }
};

/**
 * Get compatible products for a specific vehicle
 * @param {Object} vehicle - Vehicle object with make, model, engine
 * @returns {Array} - Array of compatible products
 */
export function getCompatibleProducts(vehicle) {
  if (!vehicle || !vehicle.make) return [];
  
  const makeSearch = vehicle.make.toLowerCase();
  const engineSearch = vehicle.engine?.toLowerCase() || '';
  const modelSearch = vehicle.model?.toLowerCase() || '';
  
  return products.filter(product => {
    if (!product.fitment) return false;
    
    return product.fitment.some(fit => {
      const fitLower = fit.toLowerCase();
      return fitLower.includes(makeSearch) || 
             (engineSearch && fitLower.includes(engineSearch)) ||
             (modelSearch && fitLower.includes(modelSearch));
    });
  });
}

/**
 * Get engine-specific knowledge
 * @param {string} engine - Engine code (e.g., 'N54', 'EA888')
 * @returns {Object|null} - Engine knowledge object
 */
export function getEngineKnowledge(engine) {
  if (!engine) return null;
  
  const engineUpper = engine.toUpperCase();
  
  // Direct match
  if (ENGINE_KNOWLEDGE[engineUpper]) {
    return ENGINE_KNOWLEDGE[engineUpper];
  }
  
  // Partial match (e.g., "N54B30" matches "N54")
  for (const [key, value] of Object.entries(ENGINE_KNOWLEDGE)) {
    if (engineUpper.includes(key) || key.includes(engineUpper)) {
      return value;
    }
  }
  
  return null;
}

/**
 * Build complete AI context for LLM calls
 * @param {Object} vehicle - User's vehicle configuration
 * @param {Array} installedParts - User's installed modifications
 * @returns {Object} - Complete context object for AI
 */
export function buildAIContext(vehicle, installedParts = []) {
  const context = {
    vehicle: vehicle || null,
    installedParts: installedParts,
    compatibleProducts: [],
    tuningKnowledge: null
  };
  
  if (vehicle) {
    // Get compatible products
    context.compatibleProducts = getCompatibleProducts(vehicle);
    
    // Get engine-specific knowledge
    if (vehicle.engine) {
      context.tuningKnowledge = getEngineKnowledge(vehicle.engine);
    }
  }
  
  return context;
}

/**
 * Get recommended upgrade path based on current mods
 * @param {Object} vehicle - Vehicle object
 * @param {Array} installedParts - Currently installed parts
 * @returns {Array} - Recommended next upgrades
 */
export function getRecommendedUpgrades(vehicle, installedParts = []) {
  const recommendations = [];
  const installedCategories = new Set(installedParts.map(p => p.category?.toLowerCase()));
  
  // Priority order for upgrades
  const upgradePriority = [
    { category: 'fuel pumps', reason: 'Fuel system should be upgraded before adding power' },
    { category: 'intercoolers', reason: 'Better cooling = more consistent power' },
    { category: 'charge pipes', reason: 'Prevent boost leaks and failures' },
    { category: 'downpipes', reason: 'Biggest single bolt-on power gain' },
    { category: 'intakes', reason: 'Feed the beast more air' },
    { category: 'ignition', reason: 'Stronger spark for higher boost' }
  ];
  
  const compatible = getCompatibleProducts(vehicle);
  
  for (const priority of upgradePriority) {
    if (!installedCategories.has(priority.category)) {
      const products = compatible.filter(p => 
        p.category?.toLowerCase().includes(priority.category.split(' ')[0])
      );
      
      if (products.length > 0) {
        recommendations.push({
          category: priority.category,
          reason: priority.reason,
          products: products.slice(0, 3)
        });
      }
    }
  }
  
  return recommendations.slice(0, 5);
}

/**
 * Get products by category
 * @param {string} category - Category name
 * @returns {Array} - Products in that category
 */
export function getProductsByCategory(category) {
  return products.filter(p => 
    p.category?.toLowerCase().includes(category.toLowerCase())
  );
}

/**
 * Search products by query
 * @param {string} query - Search query
 * @returns {Array} - Matching products
 */
export function searchProducts(query) {
  const queryLower = query.toLowerCase();
  
  return products.filter(product => {
    return product.title?.toLowerCase().includes(queryLower) ||
           product.description?.toLowerCase().includes(queryLower) ||
           product.mfgPart?.toLowerCase().includes(queryLower) ||
           product.category?.toLowerCase().includes(queryLower) ||
           product.fitment?.some(f => f.toLowerCase().includes(queryLower));
  });
}

export default {
  buildAIContext,
  getCompatibleProducts,
  getEngineKnowledge,
  getRecommendedUpgrades,
  getProductsByCategory,
  searchProducts,
  ENGINE_KNOWLEDGE
};
