import React, { useState, useEffect } from 'react';
import ChatBox from '../components/ai/ChatBox';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, Cpu, AlertTriangle, Upload, FileText, Zap, CheckCircle, Shield, DollarSign } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';

const AiTuner = () => {
  const { vehicle, installedParts, getVehicleSummary, engineImages } = useVehicle();
  const vehicleSummary = getVehicleSummary();
  
  const [messages, setMessages] = useState([]);
  const [uploadedLogs, setUploadedLogs] = useState([]);
  
  // Terms acceptance state
  const [termsAccepted, setTermsAccepted] = useState(() => {
    return localStorage.getItem('aiTunerTermsAccepted') === 'true';
  });
  const [termsChecked, setTermsChecked] = useState(false);

  // Initialize with tuner greeting
  useEffect(() => {
    let greeting = `🔧 **Welcome to VS SPEED AI Tuner!**

I'm your dedicated ECU tuning specialist. I analyze your datalogs, review your modifications, and create optimized tune files for your vehicle.

**How This Works:**
1. Tell me about your car and current mods
2. Upload your datalogs (text paste or describe)
3. I'll analyze and provide tuning recommendations
4. Receive your custom tune file for $29.99 USD

**Supported Platforms:**
• BMW N54/N55/B58/S55/S58
• VW/Audi EA888/EA113
• Mercedes M133/M139
• Toyota 2JZ/FA20
• Nissan VR38/SR20`;
    
    if (vehicleSummary) {
      greeting = `🔧 **Welcome back to VS SPEED AI Tuner!**

I see you're tuning your **${vehicleSummary.vehicle}**!`;
      
      if (installedParts.length > 0) {
        greeting += `\n\n**Your Current Mods:**\n${installedParts.slice(0, 6).map(p => `• ${p.name}${p.brand ? ` (${p.brand})` : ''}`).join('\n')}`;
      }
      
      greeting += `\n\n**Ready to tune?**
1. Share your datalogs (copy/paste boost logs, AFR readings, timing data)
2. Tell me your target power goals
3. I'll analyze and build your custom tune

💰 **Tune Price: $29.99 USD** - Includes base map + 2 revisions
⚡ Files compatible with JB4, Cobb, MHD, ECUTEK & more!`;
    }
    
    setMessages([{ role: 'assistant', content: greeting }]);
  }, [vehicleSummary, installedParts]);

  const handleSend = async (userMessage) => {
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    const lowerMsg = userMessage.toLowerCase();
    
    setTimeout(() => {
      let response = '';
      const vehiclePrefix = vehicleSummary 
        ? `For your **${vehicleSummary.vehicle}**, ` 
        : '';

      // TUNE LOGIC - Deep context
      const hasLogs = uploadedLogs.length > 0 || lowerMsg.includes('psi') || lowerMsg.includes('afr');
      const isB58 = vehicleSummary?.model?.toLowerCase().includes('b58') || vehicleSummary?.vehicle?.toLowerCase().includes('b58');
      const isN54 = vehicleSummary?.model?.toLowerCase().includes('n54') || vehicleSummary?.vehicle?.toLowerCase().includes('n54');

      // LOG ANALYSIS
      if (lowerMsg.includes('log') || lowerMsg.includes('datalog') || lowerMsg.includes('afr') || lowerMsg.includes('knock') || lowerMsg.includes('timing')) {
        response = `${vehiclePrefix}📊 **DATALOG ANALYSIS MODE**

Please share your log data. I'm especially interested in your ${isB58 ? 'HPFP (High Pressure Fuel Pump) readings' : isN54 ? 'Wastegate Duty Cycles' : 'Boost/AFR'} data.

**What I Need:**
1. **Paste text logs** directly into chat
2. **Describe readings** (boost PSI, AFR, timing)

**Safe Limits Confirmed for your ${vehicleSummary?.model || 'platform'}:**
• Max Boost: ${isB58 ? '22-26psi' : isN54 ? '20-24psi' : 'Platform dependent'}
• Target Lambda: ${isB58 ? '0.82' : isN54 ? '0.78' : '11.8:1 AFR'}

Paste your data and I'll build you a map! 👇`;
      }

      // TUNE FILE / PRICING
      else if (lowerMsg.includes('tune') || lowerMsg.includes('file') || lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('buy')) {
        response = `💰 **VS SPEED AI TUNER PRICING**

**Custom Tune File: $29.99 USD**

**What's Included:**
✅ Base tune file calibrated for YOUR mods
✅ 2 FREE revisions (adjustments after install)
✅ Fuel map optimization (pump/E30/E85)
✅ Boost target adjustments
✅ Timing map safety margins
✅ Rev limiter adjustment
✅ Throttle response optimization

**File Formats Available:**
• JB4/BMS (.jb4)
• Cobb Accessport (.apt)
• MHD Flasher (.mhd)
• ECUTEK (.map)
• Bootmod3 (.b3)
• Generic OBD flash (.bin)

**How to Order:**
1. Share your full mod list
2. Provide datalog if possible
3. State power goals & fuel type
4. I'll generate your tune

Ready to start? Tell me about your setup! 🏎️`;
      }

      // BOOST / PSI ANALYSIS
      else if (lowerMsg.includes('boost') || lowerMsg.includes('psi') || lowerMsg.includes('wastegate') || lowerMsg.includes('overboost')) {
        response = `${vehiclePrefix}🌀 **BOOST ANALYSIS**

Share your boost readings and I'll analyze them:

**What I Need:**
• Target boost (what tune is commanding)
• Actual boost (what you're hitting)
• Spool RPM
• Any boost spikes or drops

**Common Issues I Can Fix:**
❌ **Boost not hitting target** → Wastegate duty cycle adjustment
❌ **Boost spikes** → PID tuning, wastegate spring
❌ **Slow spool** → Throttle response, anti-lag settings
❌ **Boost drops at redline** → Timing/fueling issue

**Safe Limits by Platform:**
• N54: 22psi pump, 28psi E85
• N55: 18psi pump, 24psi E85
• B58: 20psi pump, 26psi E85
• EA888 Gen3: 26psi pump, 32psi E85

Paste your boost log or describe the issue!`;
      }

      // AFR / FUEL
      else if (lowerMsg.includes('fuel') || lowerMsg.includes('rich') || lowerMsg.includes('lean') || lowerMsg.includes('injector') || lowerMsg.includes('lambda')) {
        response = `${vehiclePrefix}⛽ **FUELING ANALYSIS**

**Target AFR Under Boost:**
• Pump gas (93 oct): 11.5-12.0:1
• E30 blend: 11.0-11.5:1  
• E85: 10.5-11.0:1

**What Your Readings Mean:**
• **<10.5:1** = Too rich (wasting power, fouling plugs)
• **11.5-12.0:1** = Perfect for pump gas
• **>12.5:1** = Too lean (DANGER - detonation risk)
• **>13.0:1** = Fuel cut or injector issue

**Tune Adjustments I Can Make:**
✅ Injector scaling (bigger injectors)
✅ Fuel pressure targets
✅ AFR targets per RPM/load
✅ STFT/LTFT corrections
✅ E-content blending tables

Share your AFR readings and I'll diagnose!`;
      }

      // UPLOAD / SHARE
      else if (lowerMsg.includes('upload') || lowerMsg.includes('send') || lowerMsg.includes('share') || lowerMsg.includes('how do i')) {
        response = `📤 **HOW TO SHARE YOUR DATA**

**Option 1: Paste Text Logs**
Copy your log from JB4 Mobile, MHD, etc and paste directly here.

**Option 2: Describe Readings**
Tell me:
• Peak boost: __ psi
• AFR at WOT: __:1
• Any knock events: Y/N
• IAT during pulls: __ °F

**Option 3: Screenshot Description**
Describe what you see in your logging screenshots.

**Logging Apps We Support:**
• JB4 Mobile App
• MHD Flasher Logs
• Cobb Accessport Logs
• ECUTEK Logger
• HP Tuners
• Bootmod3

**Pro Tip:** Log a 3rd gear pull from 2500 RPM to redline for best data!

What data do you have for me? 📊`;
      }

      // HELP / CAPABILITIES
      else if (lowerMsg.includes('help') || lowerMsg.includes('what can') || lowerMsg.includes('how does')) {
        response = `🔧 **AI TUNER CAPABILITIES**

**What I Do:**
📊 Analyze your datalogs
🔍 Identify tuning issues
⚙️ Build custom tune files
📈 Optimize power safely

**Tune Types:**
• Stage 1 (stock hardware)
• Stage 2 (intake, exhaust)
• Stage 2+ (upgraded FMIC)
• Stage 3 (hybrid/big turbo)
• E85/Flex Fuel tunes

**Pricing:**
💰 **$29.99 USD per tune**
• Includes base file + 2 revisions
• Compatible with all major platforms
• Delivered via download link

**To Get Started:**
1. Tell me your vehicle & mods
2. Share any datalogs you have
3. Tell me your goals
4. I'll build your tune!

What would you like to tune? 🏎️`;
      }

      // DEFAULT
      else {
        response = `${vehiclePrefix}Thanks for your message!

I'm here to help tune your car. Here's what I need:

**Step 1: Vehicle Info**
${vehicleSummary ? `✅ I see your ${vehicleSummary.vehicle}!` : '• What car are you tuning?'}

**Step 2: Modifications**
${installedParts.length > 0 ? `✅ ${installedParts.length} mods on file!` : '• What mods do you have?'}

**Step 3: Datalogs** (optional but helpful)
• Boost logs, AFR readings, knock data

**Step 4: Goals**
• Power target? Fuel type? Daily or track?

💰 **Tune files are $29.99 USD** - Compatible with JB4, Cobb, MHD, ECUTEK & more!

Try asking:
• "Analyze my boost logs"
• "What AFR should I target?"
• "Build me a Stage 2 tune"
• "How much does a tune cost?"`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    }, 600);
  };

  // Handle terms acceptance
  const handleAcceptTerms = () => {
    if (termsChecked) {
      setTermsAccepted(true);
      localStorage.setItem('aiTunerTermsAccepted', 'true');
    }
  };

  return (
    <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      
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
        <div className="container">
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '900', 
            background: 'linear-gradient(90deg, var(--color-primary-red), #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.25rem',
            letterSpacing: '-1px'
          }}>
            AI TUNER
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
    </div>
  );
};

export default AiTuner;
