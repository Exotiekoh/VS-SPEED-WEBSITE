import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Send, Bot, User, AlertTriangle, Car, Wrench, Zap, Radio, Target, Info, ShieldCheck } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import AIDisclaimerModal from '../components/AIDisclaimerModal';
import RotatingList from '../components/ui/RotatingList';

const AIAssistant = () => {
    const { vehicle, installedParts } = useVehicle();
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
        return localStorage.getItem('ai_disclaimer_accepted') === 'true';
    });
    
    // Check garage prerequisite on mount
    useEffect(() => {
        if (!vehicle.make) {
            // No garage configured, redirect
            navigate('/garage');
            return;
        }
        
        // Check if disclaimer needs to be shown
        if (!disclaimerAccepted) {
            setShowDisclaimer(true);
        }
    }, [vehicle.make, disclaimerAccepted, navigate]);
    
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

    const handleDisclaimerAccept = () => {
        localStorage.setItem('ai_disclaimer_accepted', 'true');
        setDisclaimerAccepted(true);
        setShowDisclaimer(false);
    };

    const handleDisclaimerDecline = () => {
        navigate('/');
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { role: 'user', id: Date.now(), content: userMessage }]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Import Gemini AI service
            const { callGeminiAI, AI_CONSULTANT_SYSTEM_PROMPT } = await import('../services/geminiAI.js');
            
            // Build consultant-specific system prompt
            let contextPrompt = AI_CONSULTANT_SYSTEM_PROMPT;
            
            // Add vehicle context
            if (vehicle.make) {
                contextPrompt += `\n\n**CURRENT VEHICLE CONTEXT:**\n`;
                contextPrompt += `- Vehicle: ${vehicle.make}${vehicle.model ? ` ${vehicle.model}` : ''}${vehicle.year ? ` (${vehicle.year})` : ''}\n`;
                
                if (installedParts && installedParts.length > 0) {
                    contextPrompt += `- Modified Parts:\n`;
                    installedParts.forEach(part => {
                        contextPrompt += `  • ${part.name}${part.brand ? ` (${part.brand})` : ''}\n`;
                    });
                }

                contextPrompt += `\nTailor recommendations specifically for this vehicle platform.`;
            }

            // Prepare messages for AI
            const aiMessages = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            aiMessages.push({ role: 'user', content: userMessage });

            // Call Gemini AI
            const response = await callGeminiAI(aiMessages, contextPrompt);
            
            setMessages(prev => [...prev, { role: 'assistant', id: Date.now() + 1, content: response }]);
            setIsTyping(false);
            
        } catch (error) {
            console.error('AI Error:', error);
            
            // Fallback to basic response on error
            const fallbackResponse = getBasicFallbackResponse(userMessage);
            setMessages(prev => [...prev, { role: 'assistant', id: Date.now() + 1, content: fallbackResponse }]);
            setIsTyping(false);
        }
    };

    const getBasicFallbackResponse = (userMessage) => {
        const lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.includes('optimize') || lowerMsg.includes('upgrade') || lowerMsg.includes('stage')) {
            return `⚡ **PERFORMANCE OPTIMIZATION**\n\nI can help you build the perfect upgrade path! ${vehicle.make ? `For your ${vehicle.make}` : 'Please'} let me know your goals:\n- Target horsepower\n- Budget range\n- Intended use (daily/track/both)`;
        }
        
        if (lowerMsg.includes('install') || lowerMsg.includes('how to')) {
            return `🔧 **INSTALLATION GUIDANCE**\n\nI can provide step-by-step installation protocols! Which component are you installing?`;
        }
        
        if (lowerMsg.includes('order') || lowerMsg.includes('track') || lowerMsg.includes('ship')) {
            return `📦 **LOGISTICS TRACKING**\n\nShare your order ID (Format: VSS-XXXXX) and I'll retrieve your shipment status.\n\n**Standard Transit:**\n• Canada: 2-5 days\n• USA: 5-10 days\n• International: 7-21 days`;
        }
        
        return `🤖 AI connection issue. I can still assist with:\n• Performance parts selection\n• Installation procedures\n• Order tracking\n• Technical consultation\n\nWhat can I help you with?`;
    };

    const handleQuickQuestion = (question) => {
        setInputValue(question);
    };

    const isMobile = windowWidth <= 1024;

    return (
        <div style={{ background: 'transparent', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ padding: '40px 1.5rem 100px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '30px' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>Intelligence Network</span>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : '300px 1fr 300px', 
                    gap: isMobile ? '30px' : '30px', 
                    maxWidth: '1600px', 
                    margin: '0 auto' 
                }}>
                    {/* Left Sidebar */}
                    {!isMobile && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <RotatingList side="left" />
                        </div>
                    )}

                    {/* Chat Window */}
                    <div className="glass-card" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: isMobile ? '600px' : '750px', 
                        overflow: 'hidden'
                    }}>
                        {/* Header */}
                        <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                            <div style={{ 
                                width: '64px', 
                                height: '64px', 
                                backgroundColor: 'var(--color-gold)', 
                                borderRadius: '16px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                boxShadow: '0 0 30px rgba(252, 207, 49, 0.4)' 
                            }}>
                                <Bot size={36} color="black" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '1px', lineHeight: '1' }}>AI CONSULTANT</h3>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <div style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}></div>
                                    <p style={{ fontSize: '12px', fontWeight: '800', opacity: 0.8, letterSpacing: '2px' }}>AGENT ONLINE</p>
                                </div>
                            </div>
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
                        <div style={{ padding: isMobile ? '20px' : '32px', backgroundColor: 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
                        <RotatingList side="right" />
                        {/* Status Panel */}
                        <div className="glass-card" style={{ padding: '24px' }}>
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
                        <div className="glass-card" style={{ padding: '24px' }}>
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
                        <div className="glass-card" style={{ padding: '24px' }}>
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

            {/* AI Disclaimer Modal */}
            <AIDisclaimerModal 
                isOpen={showDisclaimer}
                onAccept={handleDisclaimerAccept}
                onDecline={handleDisclaimerDecline}
            />
        </div>
    );
};

export default AIAssistant;
