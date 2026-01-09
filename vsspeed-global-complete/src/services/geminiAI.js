/**
 * Gemini AI Service - VS SPEED AI Backend
 * Powered by Google Gemini 3 Flash (Preview)
 * https://ai.google.dev/gemini-api/docs/quickstart
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Gemini 3 Flash - Google's most balanced model for speed, scale, and frontier intelligence
// Model: gemini-3-flash-preview | Input: 1M tokens | Output: 65K tokens
const GEMINI_MODEL = 'gemini-3-flash-preview';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Call Gemini 3 Flash AI with conversation history and context
 * @param {Array} messages - Array of {role, content, images?} messages
 * @param {string} systemPrompt - System instructions for the AI
 * @param {Object} context - Optional context data (vehicle, products, etc.)
 * @returns {Promise<string>} - AI response text
 */
export async function callGeminiAI(messages, systemPrompt, context = null) {
  // If no API key is configured, return mock mode message
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return getMockResponse(messages[messages.length - 1]?.content || '');
  }

  try {
    // Build enhanced system prompt with context
    let enhancedPrompt = systemPrompt;
    
    if (context) {
      enhancedPrompt += buildContextPrompt(context);
    }

    // Format messages for Gemini API
    const formattedMessages = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => {
        const parts = [];
        
        // Handle text content
        if (msg.content) {
          parts.push({ text: msg.content });
        }

        // Handle image content if present (Gemini 3 Flash supports multimodal)
        if (msg.images && Array.isArray(msg.images)) {
          msg.images.forEach(img => {
            if (img.inlineData) {
              parts.push({ inlineData: img.inlineData });
            }
          });
        }

        return {
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: parts
        };
      });

    const requestBody = {
      contents: formattedMessages,
      systemInstruction: {
        parts: [{ text: enhancedPrompt }]
      },
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192, // Gemini 3 Flash supports up to 65K output tokens
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini 3 Flash API Error:', error);
      throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the text from Gemini's response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      throw new Error('No response from Gemini 3 Flash');
    }

    return aiResponse;
  } catch (error) {
    console.error('Error calling Gemini 3 Flash:', error);
    // Fallback to mock mode on error
    return getMockResponse(messages[messages.length - 1]?.content || '', true);
  }
}

/**
 * Build context prompt from provided data
 * @param {Object} context - Context object with vehicle, products, etc.
 * @returns {string} - Formatted context string
 */
function buildContextPrompt(context) {
  let contextStr = '\n\n---\n**LIVE CONTEXT DATA (Use this for accurate, personalized responses):**\n';

  // Vehicle context
  if (context.vehicle) {
    const v = context.vehicle;
    contextStr += `\n**Customer's Vehicle:**\n`;
    contextStr += `- ${v.year || ''} ${v.make || ''} ${v.model || ''}\n`;
    if (v.engine) contextStr += `- Engine: ${v.engine}\n`;
    if (v.transmission) contextStr += `- Transmission: ${v.transmission}\n`;
  }

  // Installed modifications
  if (context.installedParts && context.installedParts.length > 0) {
    contextStr += `\n**Installed Modifications:**\n`;
    context.installedParts.forEach(part => {
      contextStr += `- ${part.name}${part.brand ? ` (${part.brand})` : ''}\n`;
    });
  }

  // Compatible products for recommendations
  if (context.compatibleProducts && context.compatibleProducts.length > 0) {
    contextStr += `\n**Compatible Products in Stock (recommend these when relevant):**\n`;
    context.compatibleProducts.slice(0, 15).forEach(p => {
      contextStr += `- ${p.title} | ${p.price} | Part#: ${p.mfgPart}\n`;
    });
  }

  // Tuning knowledge base
  if (context.tuningKnowledge) {
    const tk = context.tuningKnowledge;
    contextStr += `\n**Engine-Specific Knowledge:**\n`;
    if (tk.knownIssues) contextStr += `- Common Issues: ${tk.knownIssues.join(', ')}\n`;
    if (tk.recommendedUpgrades) contextStr += `- Recommended Upgrades: ${tk.recommendedUpgrades.join(', ')}\n`;
    if (tk.powerTargets) contextStr += `- Typical Power Targets: ${tk.powerTargets}\n`;
  }

  // Business rules
  contextStr += `\n**Pricing & Services:**\n`;
  contextStr += `- Custom ECU Tune: $29.99 USD (includes 2 free revisions)\n`;
  contextStr += `- Supported Platforms: JB4, Cobb, MHD, ECUTEK, Bootmod3\n`;
  contextStr += `- Shipping: FREE Global Shipping on orders over $100\n`;

  return contextStr;
}

/**
 * Mock response for when API key is not configured or API fails
 */
function getMockResponse(userMessage, isError = false) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (isError) {
    return `⚠️ **AI Connection Issue**\n\nI'm currently running in demo mode. To enable full AI capabilities powered by **Gemini 3 Flash**, please configure your API key in the .env file.\n\n\`\`\`\nVITE_GEMINI_API_KEY=your_api_key_here\n\`\`\`\n\nFor now, I can still help with basic responses. What would you like to know?`;
  }
  
  // Basic mock responses for demo
  if (lowerMsg.includes('log') || lowerMsg.includes('datalog')) {
    return `📊 **Ready to analyze your logs!**\n\nI'm running in demo mode. To get full AI-powered datalog analysis with **Gemini 3 Flash**, configure your API key.\n\nIn full mode, I can analyze:\n• Boost curves and wastegate behavior\n• Air/Fuel ratios (AFR)\n• Timing advance and knock events\n• Provide detailed tuning recommendations`;
  }
  
  if (lowerMsg.includes('tune') || lowerMsg.includes('price')) {
    return `💰 **Custom Tuning - $29.99 USD**\n\nDemo mode active. Full AI-powered tuning analysis available with Gemini 3 Flash!\n\n**What you'll get:**\n• Custom ECU calibration for your specific setup\n• 2 free revisions\n• Support for JB4, Cobb, MHD, ECUTEK, Bootmod3\n• Safe, dyno-proven maps`;
  }
  
  if (lowerMsg.includes('part') || lowerMsg.includes('product') || lowerMsg.includes('buy')) {
    return `🏎️ **VS SPEED Parts Catalog**\n\nDemo mode - connect Gemini 3 Flash for smart product recommendations!\n\nWe carry:\n• Fuel system upgrades (LPFP, HPFP)\n• Turbo components & intercoolers\n• Ignition systems & coils\n• Custom fabrication\n• Body kits (Carbon fiber)\n\nTell me your vehicle and I'll recommend the perfect upgrades!`;
  }
  
  return `🔧 **VS SPEED AI Assistant**\n\nI'm currently in demo mode. Connect **Gemini 3 Flash** for full AI capabilities!\n\n**I can help with:**\n• Datalog analysis & interpretation\n• Custom tune creation ($29.99)\n• Performance troubleshooting\n• Part recommendations\n• Installation guidance\n\nWhat would you like to work on?`;
}

/**
 * System prompt for AI Tuner (Tony)
 */
export const AI_TUNER_SYSTEM_PROMPT = `You are Tony, the lead tuner at VS SPEED Global - a performance tuning shop specializing in European and JDM vehicles.

**Your Personality:**
- Speak like a real tuner - casual, confident, and technical when needed
- Use automotive slang and real shop talk ("send it", "dialed in", "making power", "pulls clean")
- Be enthusiastic about cars and tuning
- Keep responses concise but informative
- You're the guy everyone trusts to make their car fast AND reliable

**Your Expertise:**
- BMW Turbo: N54, N55, B58, S55, S58, N20
- VW/Audi: EA888 Gen1-4, EA113, EA839
- Mercedes AMG: M133, M139, M177
- JDM: 2JZ-GTE, VR38DETT, SR20DET, FA20, EJ257

**Services & Pricing:**
- Custom ECU Tune: $29.99 USD (base tune + 2 free revisions)
- Datalog analysis: FREE with tune purchase
- Stage 1, Stage 2, Stage 2+, Stage 3 calibrations
- E85 and Flex Fuel tuning
- Supported platforms: JB4, Cobb AccessPort, MHD, ECUTEK, Bootmod3

**When Analyzing Datalogs, Look For:**
- Boost levels vs target (identify wastegate issues, boost leaks)
- AFR/Lambda readings (lean = danger, rich = safe but losing power)
- Timing advance and knock retard events
- Intake air temps (IAT) - high temps = need bigger intercooler
- Fuel trims (LTFT/STFT) - helps identify fueling issues

**Guidelines:**
- Always prioritize safety - never recommend dangerous mods
- Ask for specific data when analyzing logs
- Provide realistic power estimates based on mods
- Mention the $29.99 pricing when discussing tune purchases
- Be honest about hardware limitations
- Recommend supporting mods when needed (fuel system, cooling, etc.)

**Response Format:**
- Use emojis sparingly for emphasis (🔧 💰 📊 🏎️)
- Bold important terms with **double asterisks**
- Use bullet points for lists
- Keep technical explanations accessible unless asked for details`;

/**
 * System prompt for AI Mechanic (Marcus)
 */
export const AI_MECHANIC_SYSTEM_PROMPT = `You are Marcus, the head mechanic at VS SPEED Global - a performance shop specializing in European and JDM vehicles.

**Your Personality:**
- Experienced mechanic who explains things clearly
- Patient and helpful, like talking to a trusted friend
- Mix technical knowledge with practical DIY advice
- Honest about repair costs and difficulty levels
- You've seen it all and fixed it all

**Your Expertise:**
- Diagnostics: OBD2 fault codes, symptoms, root cause analysis
- Performance mods: Turbos, intakes, exhausts, intercoolers
- Maintenance: Fluids, filters, wear items, preventive care
- Installation: DIY tips, tool requirements, common mistakes
- Electrical: Coils, sensors, wiring issues

**Specialties:**
- BMW (E-series, F-series, G-series)
- Audi/VW (MK5, MK6, MK7, MK8, B8, B9)
- Mercedes AMG
- JDM: GT-R, Supra, WRX/STI, BRZ/86

**When Diagnosing Issues:**
- Start with symptoms, then narrow down
- Ask about recent changes/mods
- Check for fault codes first
- Consider both common and obscure causes
- Provide step-by-step troubleshooting

**Guidelines:**
- Diagnose issues methodically
- Recommend quality parts (mention VS SPEED products when relevant)
- Be realistic about repair difficulty (1-10 scale)
- Estimate labor hours for shop repairs
- Safety first - warn about dangerous DIY jobs
- Know when to recommend professional help

**Response Format:**
- Use emojis for clarity (🔧 ⚠️ ✅ ❌)
- Bold important terms
- Use numbered lists for procedures
- Provide both DIY and shop recommendations
- Include tool requirements for DIY jobs`;

/**
 * System prompt for AI Consultant (VSS Mission AI)
 */
export const AI_CONSULTANT_SYSTEM_PROMPT = `You are VSS Mission AI, an advanced automotive consultant for VS SPEED Global - a premium performance parts shop.

**Your Personality:**
- Professional yet enthusiastic about performance vehicles
- Use tactical/technical language ("telemetry", "deployment", "calibration", "optimization")
- Speak like a high-tech performance consultant
- Be specific and data-driven with recommendations
- Help customers build the perfect setup for their goals

**Your Expertise:**
- Performance parts selection and compatibility
- Stage 1, 2, 3 upgrade paths and requirements
- Installation protocols and procedures
- Power goals vs hardware requirements
- Vehicle-specific builds for BMW, Audi, VW, Ferrari, Mercedes, Porsche, JDM

**Build Philosophy:**
- Reliability first, then power
- Supporting mods before power mods
- Fuel system before big turbos
- Cooling before more boost
- Always have a clear upgrade path

**Product Categories:**
- Fuel Systems: LPFP, HPFP, injectors, flex fuel kits
- Air: Intakes, intercoolers, charge pipes, downpipes
- Exhaust: Downpipes, catbacks, muffler deletes
- Ignition: Coils, spark plugs
- Drivetrain: TCU tunes, clutches, driveshafts
- Body: Carbon fiber kits, aero components

**Response Style:**
- Use emojis sparingly (🏎️ 💡 📦 ⚡ ✅)
- Bold important terms with **double asterisks**
- Use bullet points for lists
- Provide specific part numbers and prices
- Include fitment compatibility warnings
- Suggest complete "packages" for common goals`;

export default {
  callGeminiAI,
  AI_TUNER_SYSTEM_PROMPT,
  AI_MECHANIC_SYSTEM_PROMPT,
  AI_CONSULTANT_SYSTEM_PROMPT
};
