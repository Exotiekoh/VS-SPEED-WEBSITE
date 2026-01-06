import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ChatBox from '../components/ai/ChatBox';
import { Car, Cpu, CheckCircle, Shield, DollarSign, FileText } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';
import AIDisclaimerModal from '../components/AIDisclaimerModal';
import RotatingList from '../components/ui/RotatingList';

const AiTuner = () => {
  const { vehicle, installedParts, getVehicleSummary } = useVehicle();
  const navigate = useNavigate();
  const vehicleSummary = getVehicleSummary();
  
  const [messages, setMessages] = useState([]);
  
  // AI Disclaimer state
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
    return localStorage.getItem('ai_disclaimer_accepted') === 'true';
  });
  
  // Terms acceptance state (existing tuner terms)
  const [termsAccepted, setTermsAccepted] = useState(() => {
    return localStorage.getItem('aiTunerTermsAccepted') === 'true';
  });
  const [termsChecked, setTermsChecked] = useState(false);  

  // Garage prerequisite check
  useEffect(() => {
    if (!vehicle.make) {
      navigate('/garage');
      return;
    }
    
    // Set disclaimer state based on localStorage
    const shouldShowDisclaimer = !disclaimerAccepted;
    if (shouldShowDisclaimer !== showDisclaimer) {
      setShowDisclaimer(shouldShowDisclaimer);
    }
  }, [vehicle.make, disclaimerAccepted, navigate, showDisclaimer]);

  // Initialize greeting message
  useEffect(() => {
    const buildGreeting = () => {
      let greeting = `🔧 **Hey! Welcome to the VS SPEED garage!**

What's up, I'm Tony - lead tuner here. Think of this like you just pulled into the shop and we're gonna dial in your ride together.

**Here's how we do it:**
1. Tell us what you're driving and what you've done to it
2. Show us your logs (copy/paste or just describe what you're seeing)
3. We'll analyze everything and build you a custom tune
4. $29.99 gets you a dialed-in map that rips

**We tune everything:**
• BMW turbo motors (N54/N55/B58/S55/S58)
• VW/Audi (EA888/EA113 - these things love boost)
• Mercedes AMG stuff (M133/M139)
• JDM legends (2JZ, VR38, SR20, FA20)

So what're we working on today? 🏎️`;
      
      if (vehicleSummary) {
        greeting = `🔧 **Yo! Tony here - good to see you back!**

Nice, so we're tuning your **${vehicleSummary.vehicle}** today!`;
        
        if (installedParts.length > 0) {
          greeting += `\n\n**Parts list looking solid:**\n${installedParts.slice(0, 6).map(p => `• ${p.name}${p.brand ? ` (${p.brand})` : ''}`).join('\n')}`;
          greeting += `\n\nI see what you've done - let's make it all work together 💪`;
        }
        
        greeting += `\n\n**Let's get to work:**
1. Drop those logs in here (boost, AFR, timing - whatever you got)
2. What numbers are you chasing?
3. I'll cook you up a tune that's gonna send it

💰 **$29.99 gets you dialed** - Base tune + 2 tweaks if we need 'em
⚡ Works with JB4, Cobb, MHD, ECUTEK - all the good stuff!`;
      }
      return greeting;
    };
    
    // Only set messages if they're empty or different
    const newGreeting = buildGreeting();
    setMessages(prev => {
      if (prev.length === 0 || prev[0].content !== newGreeting) {
        return [{ role: 'assistant', content: newGreeting }];
      }
      return prev;
    });
  }, [vehicleSummary, installedParts]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (userMessage) => {
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Import Gemini AI service
      const { callGeminiAI, AI_TUNER_SYSTEM_PROMPT } = await import('../services/geminiAI.js');
      
      // Build context about the user's vehicle and setup
      let contextPrompt = AI_TUNER_SYSTEM_PROMPT;
      
      if (vehicleSummary) {
        contextPrompt += `\n\n**CURRENT VEHICLE CONTEXT:**\n`;
        contextPrompt += `- Vehicle: ${vehicleSummary.vehicle}\n`;
        
        if (installedParts.length > 0) {
          contextPrompt += `- Installed Parts:\n`;
          installedParts.forEach(part => {
            contextPrompt += `  • ${part.name}${part.brand ? ` (${part.brand})` : ''}\n`;
          });
        }
        
        contextPrompt += `\nUse this context to provide specific, personalized tuning advice.`;
      }

      // Call Gemini AI
      const aiResponse = await callGeminiAI(newMessages, contextPrompt);

      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);

    } catch (error) {
      console.error('AI Error:', error);
      setIsTyping(false);
      
      // Fallback error message
      const errorMessage = `⚠️ **Oops, something went wrong!**\n\nHad a connection issue there. Let me try to help anyway:\n\n${getBasicResponse(userMessage.toLowerCase(), vehicleSummary)}`;
      
      setMessages([...newMessages, { role: 'assistant', content: errorMessage }]);
    }
  };

  // Basic fallback responses for when AI fails
  const getBasicResponse = (lowerMsg, vehicleSummary) => {
    const vehiclePrefix = vehicleSummary ? `For your **${vehicleSummary.vehicle}**, ` : '';

    if (lowerMsg.includes('log') || lowerMsg.includes('datalog')) {
      return `${vehiclePrefix}📊 Drop your datalogs here and I'll analyze them! I need to see boost, AFR, and timing data from your pulls.`;
    }
    
    if (lowerMsg.includes('tune') || lowerMsg.includes('price')) {
      return `💰 **$29.99 USD per custom tune** - Includes base file + 2 revisions. Compatible with JB4, Cobb, MHD, ECUTEK, and Bootmod3!`;
    }
    
    if (lowerMsg.includes('boost') || lowerMsg.includes('psi')) {
      return `${vehiclePrefix}🌀 Tell me what boost you're seeing vs what you're targeting, and I'll help dial it in!`;
    }
    
    return `🔧 I can help with datalog analysis, custom tunes ($29.99), and performance optimization. What do you need?`;
  };

  // Handle terms acceptance
  const handleAcceptTerms = () => {
    if (termsChecked) {
      setTermsAccepted(true);
      localStorage.setItem('aiTunerTermsAccepted', 'true');
    }
  };

  // Handle disclaimer
  const handleDisclaimerAccept = () => {
    localStorage.setItem('ai_disclaimer_accepted', 'true');
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
  };

  const handleDisclaimerDecline = () => {
    navigate('/');
  };

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      
      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {!termsAccepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,60,60,0.1) 0%, rgba(10,10,12,1) 100%)',
                border: '2px solid var(--color-primary-red)',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '550px',
                width: '100%'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <Cpu size={50} color="var(--color-primary-red)" style={{ marginBottom: '15px' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '10px' }}>
                  VS SPEED AI TUNER
                </h2>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                  Read and accept before proceeding
                </p>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,60,60,0.2)',
                borderRadius: '12px',
                padding: '25px',
                marginBottom: '25px',
                maxHeight: '250px',
                overflowY: 'auto'
              }}>
                <h3 style={{ color: 'var(--color-primary-red)', fontSize: '1rem', fontWeight: '800', marginBottom: '15px' }}>
                  ⚠️ TUNING DISCLAIMER
                </h3>
                <p style={{ color: '#bbb', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '15px' }}>
                  By using AI Tuner, you acknowledge that all tune files are provided <strong style={{ color: 'white' }}>at your own risk</strong>.
                </p>
                <p style={{ color: '#bbb', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '15px' }}>
                  <strong style={{ color: 'var(--color-primary-red)' }}>$29.99 USD per tune</strong> - Includes base file and 2 revisions.
                </p>
                <ul style={{ color: '#999', fontSize: '0.85rem', marginLeft: '20px', marginBottom: '15px' }}>
                  <li style={{ marginBottom: '8px' }}>Improper installation or use</li>
                  <li style={{ marginBottom: '8px' }}>Engine or drivetrain damage</li>
                  <li style={{ marginBottom: '8px' }}>Voided manufacturer warranty</li>
                  <li style={{ marginBottom: '8px' }}>Emissions compliance issues</li>
                </ul>
                <p style={{ color: 'var(--color-primary-red)', fontSize: '0.85rem', fontWeight: '700' }}>
                  Always dyno tune after loading any map. Files are for off-road/competition use only.
                </p>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary-red)' }}
                />
                <span style={{ color: '#bbb', fontSize: '0.85rem' }}>
                  I understand and accept the risks of ECU tuning
                </span>
              </label>

              <motion.button
                whileHover={{ scale: termsChecked ? 1.02 : 1 }}
                whileTap={{ scale: termsChecked ? 0.98 : 1 }}
                onClick={handleAcceptTerms}
                disabled={!termsChecked}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: termsChecked 
                    ? 'linear-gradient(135deg, var(--color-primary-red) 0%, #8b0000 100%)'
                    : 'rgba(255,255,255,0.1)',
                  color: termsChecked ? 'white' : '#666',
                  fontSize: '1rem',
                  fontWeight: '900',
                  cursor: termsChecked ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <CheckCircle size={20} />
                ENTER AI TUNER
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,60,60,0.15) 0%, rgba(139,0,0,0.1) 100%)',
          borderBottom: '2px solid rgba(255,60,60,0.3)',
          padding: '1.5rem 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: '900', 
            background: 'linear-gradient(90deg, var(--color-primary-red), #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            letterSpacing: '-2px',
            textTransform: 'uppercase'
          }}>
            AI TUNER
          </h1>
          <p style={{ color: '#888', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Custom ECU tuning from your datalogs • $29.99 USD per tune
          </p>
        </div>
      </motion.div>

      {/* Main Layout */}
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '250px 1fr 250px', 
          gap: '1.5rem',
          minHeight: 'calc(100vh - 250px)'
        }}>
          
          {/* Left - Upload & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <RotatingList side="left" />

            <div style={{ 
              background: 'linear-gradient(135deg, rgba(255,60,60,0.1) 0%, rgba(0,0,0,0.3) 100%)',
              border: '1px solid rgba(255,60,60,0.3)',
              borderRadius: '12px',
              padding: '15px'
            }}>
              <h3 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-red)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign size={16} /> TUNE PRICING
              </h3>
              <p style={{ fontSize: '24px', fontWeight: '900', color: 'white', marginBottom: '5px' }}>$29.99 USD</p>
              <p style={{ fontSize: '11px', color: '#888' }}>Base tune + 2 revisions</p>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '15px'
            }}>
              <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={14} /> SUPPORTED FORMATS
              </h3>
              <ul style={{ fontSize: '10px', color: '#aaa', lineHeight: '1.8' }}>
                <li>• JB4 (.jb4)</li>
                <li>• Cobb (.apt)</li>
                <li>• MHD (.mhd)</li>
                <li>• ECUTEK (.map)</li>
                <li>• Bootmod3 (.b3)</li>
                <li>• Generic (.bin)</li>
              </ul>
            </div>

            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '15px'
            }}>
              <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={14} /> WHAT'S INCLUDED
              </h3>
              <ul style={{ fontSize: '10px', color: '#aaa', lineHeight: '1.8' }}>
                <li>✅ Custom calibration</li>
                <li>✅ 2 free revisions</li>
                <li>✅ Fuel/boost maps</li>
                <li>✅ Timing optimization</li>
                <li>✅ Safety limiters</li>
              </ul>
            </div>
          </div>

          {/* Center - Chat */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {vehicleSummary && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,60,60,0.15) 0%, rgba(0,0,0,0.4) 100%)',
                border: '1px solid rgba(255,60,60,0.3)',
                borderRadius: '12px 12px 0 0',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ color: 'var(--color-primary-red)', fontWeight: '700', fontSize: '13px' }}>
                  <Car size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  {vehicleSummary.vehicle} • {installedParts.length} mods
                </span>
                <Link to="/garage" style={{ color: 'var(--color-primary-red)', fontSize: '11px', fontWeight: '700' }}>EDIT</Link>
              </div>
            )}
            <ChatBox 
              messages={messages} 
              onSend={handleSend}
              isTyping={isTyping} 
              style={{ 
                height: '55vh',
                minHeight: '400px',
                borderRadius: vehicleSummary ? '0 0 12px 12px' : '12px',
                border: '1px solid rgba(255,60,60,0.2)',
                borderTop: vehicleSummary ? 'none' : undefined,
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
              }} 
            />
          </div>

          {/* Right - Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <RotatingList side="right" />
            
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(255,60,60,0.1) 0%, rgba(0,0,0,0.3) 100%)',
              border: '1px solid rgba(255,60,60,0.3)',
              borderRadius: '12px',
              padding: '15px'
            }}>
              <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-primary-red)', marginBottom: '10px' }}>
                🚀 QUICK PROMPTS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Analyze my logs', 'Stage 2 tune', 'Fix boost issues', 'E85 conversion', 'Check my AFR'].map(prompt => (
                  <button 
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#ccc',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ 
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '12px',
              padding: '15px'
            }}>
              <h3 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-gold)', marginBottom: '10px' }}>
                💡 PRO TIPS
              </h3>
              <ul style={{ fontSize: '10px', color: '#aaa', lineHeight: '1.8' }}>
                <li>• Log 3rd gear pulls for best data</li>
                <li>• Include boost, AFR, timing</li>
                <li>• List all mods for accuracy</li>
                <li>• Specify fuel type (91/93/E85)</li>
              </ul>
            </div>

            <Link to="/ai-mechanic" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '12px',
                padding: '15px',
                cursor: 'pointer'
              }}>
                <p style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '5px' }}>
                  Need general advice?
                </p>
                <p style={{ fontSize: '10px', color: '#888' }}>
                  Visit AI Mechanic →
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* AI Disclaimer Modal */}
      <AIDisclaimerModal 
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />
    </div>
  );
};

export default AiTuner;
