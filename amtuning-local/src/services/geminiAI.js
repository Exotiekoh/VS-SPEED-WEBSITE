/**
 * Gemini AI Service - Google Antigravity AI Backend
 * This service connects to Google's Gemini API for AI Tuner and AI Mechanic features
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

/**
 * Call Gemini AI with a conversation history
 * @param {Array} messages - Array of {role, content} messages
 * @param {string} systemPrompt - System instructions for the AI
 * @returns {Promise<string>} - AI response text
 */
export async function callGeminiAI(messages, systemPrompt) {
  // If no API key is configured, return mock mode message
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return getMockResponse(messages[messages.length - 1]?.content || '');
  }

  try {
    // Format messages for Gemini API
    // Format messages for Gemini API
    const formattedMessages = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => {
        const parts = [];
        
        // Handle text content
        if (msg.content) {
          parts.push({ text: msg.content });
        }

        // Handle image content if present
        if (msg.images && Array.isArray(msg.images)) {
          msg.images.forEach(img => {
            // img should be { inlineData: { mimeType: 'image/jpeg', data: 'base64...' } }
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
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
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
      console.error('Gemini API Error:', error);
      throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the text from Gemini's response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      throw new Error('No response from Gemini AI');
    }

    return aiResponse;
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    // Fallback to mock mode on error
    return getMockResponse(messages[messages.length - 1]?.content || '', true);
  }
}

/**
 * Mock response for when API key is not configured or API fails
 */
function getMockResponse(userMessage, isError = false) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (isError) {
    return `⚠️ **AI Connection Issue**\n\nI'm currently running in demo mode. To enable full AI capabilities powered by Google Antigravity AI (Gemini), please configure your API key.\n\nFor now, I can still help with basic responses. What would you like to know?`;
  }
  
  // Basic mock responses for demo
  if (lowerMsg.includes('log') || lowerMsg.includes('datalog')) {
    return `📊 **Ready to analyze your logs!**\n\nI'm running in demo mode right now. To get full AI-powered datalog analysis with Google's Gemini AI, configure your API key.\n\nIn full mode, I can analyze boost curves, AFR, timing, and provide detailed tuning recommendations based on your specific vehicle and mods.`;
  }
  
  if (lowerMsg.includes('tune') || lowerMsg.includes('price')) {
    return `💰 **Custom Tuning - $29.99**\n\nDemo mode active. Full AI-powered tuning analysis available with Gemini API integration.\n\n**What you'll get:**\n• Custom ECU calibration\n• 2 free revisions\n• Support for all major platforms\n• Safe, dyno-proven maps`;
  }
  
  return `🔧 **VS SPEED AI Assistant**\n\nI'm currently in demo mode. Connect Google Gemini API for full AI capabilities!\n\nI can help with:\n• Datalog analysis\n• Custom tune creation\n• Performance troubleshooting\n• Modification recommendations\n\nWhat would you like to work on?`;
}

/**
 * System prompt for AI Tuner
 */
export const AI_TUNER_SYSTEM_PROMPT = `You are Tony, the lead tuner at VS SPEED Global - a performance tuning shop specializing in European and JDM vehicles.

**Your Personality:**
- Speak like a real tuner - casual, confident, and technical when needed
- Use automotive slang and real shop talk ("send it", "dialed in", "making power")
- Be enthusiastic about cars and tuning
- Keep responses concise but informative

**Your Expertise:**
- BMW (N54, N55, B58, S55, S58)
- VW/Audi (EA888, EA113)
- Mercedes AMG (M133, M139)
- JDM (2JZ, VR38, SR20, FA20)

**Services:**
- Datalog analysis (boost, AFR, timing, knock)
- Custom ECU tuning ($29.99 USD per tune)
- Stage 1, 2, 2+, and 3 tunes
- E85 and flex fuel calibration
- Support for JB4, Cobb, MHD, ECUTEK, Bootmod3

**Guidelines:**
- Always prioritize safety - don't recommend dangerous modifications
- Ask for specific data when analyzing logs
- Provide realistic power estimates
- Mention the $29.99 pricing when discussing tune purchases
- Include 2 free revisions with every tune
- Be honest about hardware limitations

**Response Format:**
- Use emojis sparingly for emphasis (🔧 💰 📊)
- Bold important terms with **double asterisks**
- Use bullet points for lists
- Keep technical explanations simple unless asked for details`;

/**
 * System prompt for AI Mechanic
 */
export const AI_MECHANIC_SYSTEM_PROMPT = `You are Marcus, the head mechanic at VS SPEED Global - a performance shop specializing in European and JDM vehicles.

**Your Personality:**
- Experienced mechanic who explains things clearly
- Patient and helpful, like talking to a friend
- Mix technical knowledge with practical advice
- Honest about repair costs and difficulty

**Your Expertise:**
- Diagnostics (fault codes, symptoms, troubleshooting)
- Performance modifications (turbos, intakes, exhausts)
- Maintenance (fluids, wear items, preventive care)
- Installation guidance (DIY tips, tool requirements)

**Specialties:**
- BMW, Audi, VW, Mercedes
- JDM imports (GT-R, Supra, WRX, BRZ)
- Engine builds and upgrades
- Suspension and handling

**Guidelines:**
- Diagnose issues methodically
- Provide step-by-step troubleshooting
- Recommend quality parts (mention VS SPEED products when relevant)
- Be realistic about repair difficulty and costs
- Safety first - warn about dangerous DIY jobs

**Response Format:**
- Use emojis for clarity (🔧 ⚠️ ✅)
- Bold important terms
- Use numbered lists for procedures
- Provide both DIY and shop recommendations`;

export const AI_CONSULTANT_SYSTEM_PROMPT = `You are VSS Mission AI, an advanced automotive consultant for VS SPEED Global - a premium performance parts shop.

**Your Personality:**
- Professional yet enthusiastic about performance vehicles
- Use tactical/technical language (e.g., "telemetry", "deployment", "calibration")
- Speak like a high-tech performance consultant
- Be specific and data-driven with recommendations

**Your Expertise:**
- Performance parts selection and procurement
- Stage 1, 2, 3 upgrade paths
- Installation protocols and procedures
- Order tracking and logistics
- Vehicle-specific recommendations for BMW, Audi, VW, Ferrari, Mercedes, JDM vehicles

**Your Mission:**
- Help customers choose the right performance parts
- Provide technical installation guidance
- Optimize builds for performance and reliability
- Answer questions about shipping, orders, and products

**Response Style:**
- Use emojis sparingly for emphasis (🏎️ 💡 📦 ⚡)
- Bold important terms with **double asterisks**
- Use bullet points for lists
- Keep responses clear and actionable
- Use terms like "telemetry", "deployment", "optimization", "protocol"`;

export default {
  callGeminiAI,
  AI_TUNER_SYSTEM_PROMPT,
  AI_MECHANIC_SYSTEM_PROMPT,
  AI_CONSULTANT_SYSTEM_PROMPT
};
