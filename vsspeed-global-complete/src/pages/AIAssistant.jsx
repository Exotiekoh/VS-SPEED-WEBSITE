import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Send, Bot, User, Sparkles, Car, Wrench, DollarSign, HelpCircle, ShieldCheck, Zap, Radio, Target, Info, AlertCircle } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { callGeminiAI, AI_CONSULTANT_SYSTEM_PROMPT } from '../services/geminiAI';
import { buildAIContext } from '../services/aiContextBuilder';

const AIAssistant = () => {
    const { vehicle } = useVehicle();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [aiError, setAiError] = useState(null);
    
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getInitialMessage = () => {
        return `🛰️ **SIGNAL SECURE.** Welcome to VSSPEED Mission Intelligence, powered by **Gemini 3 Flash**.

${vehicle.make ? `Telemetry received for your **${vehicle.year} ${vehicle.make} ${vehicle.model}**.` : "Awaiting vehicle telemetry connection."}

I am initialized to provide tactical support for:
• **Strategic Procurement** - Precision part recommendations from our catalog
• **Operational Implementation** - Technical installation guidance  
• **Performance Optimization** - Stage 1/2/3 tuning intelligence
• **Custom Tuning** - $29.99 ECU calibration with 2 free revisions

How shall we proceed with your ${vehicle.make || 'project'}?`;
    };

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            id: 'init',
            content: getInitialMessage()
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

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { role: 'user', id: Date.now(), content: userMessage }]);
        setInputValue('');
        setIsTyping(true);
        setAiError(null);

        try {
            // Build context from vehicle and product database
            const context = buildAIContext(vehicle, []);
            
            // Format messages for API (exclude initial welcome message for cleaner context)
            const apiMessages = messages
                .filter(m => m.id !== 'init')
                .concat([{ role: 'user', content: userMessage }])
                .map(m => ({ role: m.role, content: m.content }));

            // Call Gemini 3 Flash API
            const response = await callGeminiAI(apiMessages, AI_CONSULTANT_SYSTEM_PROMPT, context);
            
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                id: Date.now() + 1, 
                content: response 
            }]);
        } catch (error) {
            console.error('AI Error:', error);
            setAiError('Connection issue - using backup intelligence');
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                id: Date.now() + 1, 
                content: `⚠️ **Temporary Signal Disruption**\n\nI'm experiencing a brief connection issue. Please try again, or contact support at vsspeedhq@gmail.com for immediate assistance.\n\n_Error: ${error.message}_` 
            }]);
        } finally {
            setIsTyping(false);
        }
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
