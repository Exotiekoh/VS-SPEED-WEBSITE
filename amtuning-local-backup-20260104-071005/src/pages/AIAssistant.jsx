import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Send, Bot, User, Sparkles, Car, Wrench, DollarSign, HelpCircle, ShieldCheck, Zap, Radio, Target, Info } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
    const { vehicle } = useVehicle();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            id: 'init',
            content: `SIGNAL SECURE. Welcome to VSSPEED Mission Intelligence. ${vehicle.make ? `Telemetry received for your **${vehicle.year} ${vehicle.make} ${vehicle.model}**. ` : "Awaiting vehicle telemetry connection. "}

I am initialized to provide tactical support for:
• **Strategic Procurement** - Precision part recommendations
• **Operational Implementation** - Technical installation guidance
• **Performance Optimization** - Stage 1/2/3 tuning intelligence
• **Logistics Coordination** - Real-time order telemetry

How shall we proceed with your ${vehicle.make || 'project'}?`
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickQuestions = [
        { icon: <Zap size={16} />, text: 'Optimize my current build' },
        { icon: <Wrench size={16} />, text: 'Installation protocols for intakes' },
        { icon: <Radio size={16} />, text: 'Stage 2 performance benchmarks' },
        { icon: <Target size={16} />, text: 'Track active shipment' }
    ];

    const getAIResponse = (userMessage) => {
        const lowerMsg = userMessage.toLowerCase();
        const vMake = (vehicle.make || '').toLowerCase();
        const vModel = (vehicle.model || '').toLowerCase();

        // 1. Optimization / Mods logic based on Vehicle
        if (lowerMsg.includes('optimize') || lowerMsg.includes('mod') || lowerMsg.includes('upgrade') || lowerMsg.includes('stage')) {
            if (vMake === 'audi' || vMake === 'volkswagen') {
                return `ANALYZING MQB PLATFORM DEPLOYMENT...
                
For your ${vehicle.make} ${vehicle.model}, I recommend the Phase 1 "Urban Predator" configuration:

**1. Primary Intake:** VSS High-Flow Cold Air System (+12HP)
**2. Management:** Stage 1 ECU Refinement (VSS-Spec)
**3. Power Retention:** Dogbone Mount Upgrade (Eliminates wheel hop)

**Total Estimated HP Gain:** +45-65 WHP
**Operational Cost:** ~$1,250.00 CAD

Should I add these components to your procurement list?`;
            } else if (vMake === 'bmw') {
                return `ANALYZING BAVARIAN POWER DEPLOYMENT...
                
For your ${vehicle.make} ${vehicle.model}, we recommend the "B-Series Dominator" path:

**1. Airflow:** Charge Pipe Upgrade (Mandatory for reliability)
**2. Thermal Management:** VSS Performance Intercooler
**3. Calibration:** Stage 2 Bootmod3 / MHD Transmission

**Telemetry Projection:** +80-100 WHP over stock.
**Strategic Note:** Recommending Index 12 injectors if tracking N54 platform.

Initiate catalog search for these identifiers?`;
            } else if (vMake === 'ferrari') {
                return `ANALYZING EXOTIC TELEMETRY... 🏎️
                
For your Ferrari ${vehicle.model}, we focus on aerodynamic efficiency and acoustic range:

**1. Aero:** VSS Dry Carbon Diffuser & Front Lip (+15% Downforce)
**2. Exhaust:** Valvetronic X-Pipe Deployment
**3. Software:** ECU Mapping for decat-response

**Strategic Disclaimer:** Exotic series procurement requires specialist installation.

Generate a custom body-kit visualization for your chassis?`;
            } else {
                return `ANALYZING GENERIC PERFORMANCE DATA...
                
As your vehicle telemetry is limited, I recommend starting with the "VSS Core Three":
1. High-Flow Air Filtration
2. Stage 1 ECU Software Mapping
3. Performance Brake Fluid/Pads (Safety First)

Connect your vehicle in the Garage for chassis-specific Stage 2/3 benchmarks.`;
            }
        }

        // 2. Installation Logic
        if (lowerMsg.includes('intake') || lowerMsg.includes('install') || lowerMsg.includes('how to')) {
            return `PROTOCOL: COMPONENT IMPLEMENTATION (AIR INTAKE)

**Required Toolset:**
• 10mm Drive Socket
• Precision Flathead Driver
• T25 Torx Driver (Standard for ${vMake === 'bmw' || vMake === 'audi' ? 'German' : 'Global'} exports)

**Operational Sequence:**
1. Secure negative battery terminal
2. Decouple OEM airbox assembly
3. Transfer MAF sensor to VSS high-flow housing
4. Secure VSS assembly to chassis mounts
5. Finalize signal connections

💡 **INTEL:** Synchronize ECU by allowing 300 seconds of idle time post-install.

Do you require the specific torque settings for these mounting points?`;
        }

        // 3. Shipping / Tracking
        if (lowerMsg.includes('order') || lowerMsg.includes('track') || lowerMsg.includes('shipment')) {
            return `COORDINATING LOGISTICS TELEMETRY... 📦

To retrieve real-time status, transmit your Order ID (Format: VSS-XXXXX).

**CURRENT TRANSIT WINDOWS:**
• Domestic (Canada): 2-5 Business Days
• Continental (US): 5-10 Business Days
• Global: 7-21 Business Days

**Note:** Exotic body kits (Ferrari/Porsche) ship via dedicated freight for maximum security.`;
        }

        return `INPUT RECEIVED. ${vehicle.make ? `Processing data for ${vehicle.make} sector...` : "Scanning general databases..."}

I am standing by to assist with:
• Technical schematics and part selection
• Installation troubleshooting
• Performance scaling intelligence
• Order stream status

Transmit your query for analysis.`;
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { role: 'user', id: Date.now(), content: userMessage }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const response = getAIResponse(userMessage);
            setMessages(prev => [...prev, { role: 'assistant', id: Date.now() + 1, content: response }]);
            setIsTyping(false);
        }, 1200);
    };

    const handleQuickQuestion = (question) => {
        setInputValue(question);
    };

    const isMobile = windowWidth <= 1024;

    return (
        <div style={{ background: 'var(--color-bg-deep)', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ padding: '40px 1.5rem 100px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '30px' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>Intelligence Network</span>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', 
                    gap: isMobile ? '30px' : '60px', 
                    maxWidth: '1400px', 
                    margin: '0 auto' 
                }}>
                    {/* Chat Window */}
                    <div className="glass" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: isMobile ? '600px' : '750px', 
                        borderRadius: '32px', 
                        overflow: 'hidden',
                        backgroundColor: 'rgba(255,255,255,0.01)'
                    }}>
                        {/* Header */}
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                backgroundColor: 'var(--color-gold)', 
                                borderRadius: '12px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                boxShadow: '0 0 20px rgba(252, 207, 49, 0.3)' 
                            }}>
                                <Bot size={28} color="black" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '1px' }}>VSS MISSION AI</h3>
                                <div className="flex items-center gap-2">
                                    <div style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}></div>
                                    <p style={{ fontSize: '11px', fontWeight: '800', opacity: 0.6, letterSpacing: '1px' }}>AGENT ONLINE</p>
                                </div>
                            </div>
                            {!isMobile && (
                                <div style={{ marginLeft: 'auto' }}>
                                    <ShieldCheck size={24} color="var(--color-gold)" />
                                </div>
                            )}
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '32px', overflowY: 'auto', backgroundColor: 'transparent' }}>
                            <div className="flex flex-col gap-8">
                                <AnimatePresence initial={false}>
                                    {messages.map((msg) => (
                                        <motion.div 
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            style={{ 
                                                display: 'flex', 
                                                gap: isMobile ? '12px' : '16px', 
                                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                backgroundColor: msg.role === 'user' ? 'var(--color-primary-red)' : 'rgba(255,255,255,0.05)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                {msg.role === 'user' ? <User size={20} color="white" /> : <Bot size={20} color="var(--color-gold)" />}
                                            </div>
                                            <div style={{
                                                maxWidth: '85%',
                                                padding: isMobile ? '16px' : '24px',
                                                borderRadius: '20px',
                                                backgroundColor: msg.role === 'user' ? 'rgba(255, 60, 60, 0.08)' : 'rgba(255,255,255,0.02)',
                                                color: 'white',
                                                border: msg.role === 'user' ? '1px solid rgba(255, 60, 60, 0.15)' : '1px solid rgba(255,255,255,0.05)',
                                                whiteSpace: 'pre-line',
                                                lineHeight: '1.7',
                                                fontSize: isMobile ? '14px' : '15px',
                                                fontFamily: 'inherit'
                                            }}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                
                                {isTyping && (
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Bot size={20} color="var(--color-gold)" />
                                        </div>
                                        <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div className="flex gap-2">
                                                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></div>
                                                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: isMobile ? '20px' : '32px', backgroundColor: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="TRANSMIT COMMAND..."
                                    style={{
                                        flex: 1,
                                        padding: '18px 24px',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backgroundColor: 'rgba(0,0,0,0.4)',
                                        color: 'white',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-red"
                                    style={{
                                        width: '60px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px rgba(255, 60, 60, 0.2)'
                                    }}
                                >
                                    <Send size={22} color="white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Status Panel */}
                        <div className="glass" style={{ padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                            <h4 style={{ fontSize: '11px', fontWeight: '900', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                                Intelligence Hotlinks
                            </h4>
                            <div className="flex flex-col gap-3">
                                {quickQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuickQuestion(q.text)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '14px',
                                            backgroundColor: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '12px',
                                            fontSize: '13px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s',
                                            color: '#aaa'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                                            e.currentTarget.style.color = '#aaa';
                                        }}
                                    >
                                        <div style={{ color: 'var(--color-gold)' }}>{q.icon}</div>
                                        {q.text}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Vehicle Status */}
                        <div className="glass" style={{ padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,60,60,0.1)', background: 'linear-gradient(135deg, rgba(255,60,60,0.05) 0%, transparent 100%)' }}>
                            <div className="flex items-center gap-3" style={{ marginBottom: '15px' }}>
                                <Car size={18} color="var(--color-primary-red)" />
                                <h4 style={{ fontSize: '12px', fontWeight: '900', color: 'white' }}>MISSION VEHICLE</h4>
                            </div>
                            <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', marginBottom: '20px' }}>
                                <p style={{ fontSize: '14px', color: 'white', fontWeight: '900' }}>
                                    {vehicle.make ? `${vehicle.year} ${vehicle.make}` : "NO VEHICLE"}
                                </p>
                                <p style={{ fontSize: '12px', color: 'var(--color-primary-red)', fontWeight: '700' }}>
                                    {vehicle.model || "Awaiting Telemetry..."}
                                </p>
                            </div>
                            <Link to="/garage">
                                <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-primary-red)', backgroundColor: 'transparent', color: 'var(--color-primary-red)', fontSize: '11px', fontWeight: '900', cursor: 'pointer' }}>
                                    {vehicle.make ? "RE-CALIBRATE" : "SYNC VEHICLE"}
                                </button>
                            </Link>
                        </div>

                        {/* Support Info */}
                        <div className="glass" style={{ padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            <div className="flex items-center gap-3" style={{ marginBottom: '15px' }}>
                                <Info size={18} color="var(--color-gold)" />
                                <h4 style={{ fontSize: '12px', fontWeight: '900', color: 'white' }}>ENCRYPTED SUPPORT</h4>
                            </div>
                            <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.6', marginBottom: '15px', fontWeight: '700' }}>
                                Connect with the technical core for manual override or procurement queries.
                            </p>
                            <a href="mailto:vsspeedhq@gmail.com" style={{ fontSize: '12px', fontWeight: '900', color: 'var(--color-gold)', textDecoration: 'none', borderBottom: '1px solid var(--color-gold)', paddingBottom: '2px' }}>
                                vsspeedhq@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
