import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Send, Wrench, User, AlertTriangle, Car, Settings, CheckCircle, XCircle, Info } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';
import { AnimatePresence } from 'framer-motion';
import AIDisclaimerModal from '../components/AIDisclaimerModal';
import RotatingList from '../components/ui/RotatingList';

const AIMechanic = () => {
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
            content: `🔧 DIAGNOSTIC SYSTEM ONLINE. Welcome to VSSPEED Mechanical Intelligence. ${vehicle.make ? `Vehicle detected: **${vehicle.year} ${vehicle.make} ${vehicle.model}**. ` : "No vehicle connected. "}

I am your diagnostic specialist for:
• **Troubleshooting** - Check engine lights, fault codes, sensor issues
• **Maintenance** - Service intervals, fluid recommendations
• **Installation Help** - Step-by-step installation guides
• **Problem Solving** - Diagnosing strange noises, vibrations, performance issues

What mechanical issue can I help you solve today?`
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
        { icon: <AlertTriangle size={16} />, text: 'Check engine light diagnosis' },
        { icon: <Wrench size={16} />, text: 'Installation guide for coilovers' },
        { icon: <Settings size={16} />, text: 'Service interval for my car' },
        { icon: <Car size={16} />, text: 'Strange noise from engine bay' }
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
        const { callGeminiAI, AI_MECHANIC_SYSTEM_PROMPT } = await import('../services/geminiAI.js');
        
        // Build context about the user's vehicle
        let contextPrompt = AI_MECHANIC_SYSTEM_PROMPT;
        
        if (vehicle.make) {
            contextPrompt += `\n\n**CURRENT VEHICLE CONTEXT:**\n`;
            contextPrompt += `- Vehicle: ${vehicle.make}${vehicle.model ? ` ${vehicle.model}` : ''}${vehicle.year ? ` (${vehicle.year})` : ''}\n`;
            
            if (installedParts && installedParts.length > 0) {
                contextPrompt += `- Modified Parts:\n`;
                installedParts.forEach(part => {
                    contextPrompt += `  • ${part.name}${part.brand ? ` (${part.brand})` : ''}\n`;
                });
            }
            
            contextPrompt += `\nUse this context to provide specific, vehicle-appropriate mechanical advice.`;
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
    
    if (lowerMsg.includes('check engine') || lowerMsg.includes('fault') || lowerMsg.includes('code')) {
        return `🔍 I can help diagnose fault codes! Please share the specific OBD2 code (e.g., P0420) and I'll provide detailed troubleshooting steps.`;
    }
    
    if (lowerMsg.includes('install') || lowerMsg.includes('how to')) {
        return `🔧 I can guide you through installations! Please specify which part or component you need help installing.`;
    }
    
    if (lowerMsg.includes('service') || lowerMsg.includes('maintenance')) {
        return `📋 I can help with service schedules and maintenance! ${vehicle.make ? `For your ${vehicle.make}` : 'Please'} let me know what service you're planning.`;
    }
    
    return `🔧 AI connection issue. I can still help with diagnostics, installations, and maintenance advice. What do you need help with?`;
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
                    <span style={{ color: '#33ff55' }}>AI Mechanic</span>
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
                                backgroundColor: '#33ff55', 
                                borderRadius: '16px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                boxShadow: '0 0 30px rgba(29, 255, 67, 1)' 
                            }}>
                                <Wrench size={40} color="neon green" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '1px', lineHeight: '1' }}>AI MECHANIC</h3>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <div style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}></div>
                                    <p style={{ fontSize: '12px', fontWeight: '800', opacity: 0.8, letterSpacing: '2px' }}>DIAGNOSTIC SYSTEM ONLINE</p>
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
                                                backgroundColor: msg.role === 'user' ? 'var(--color-primary-red)' : 'rgba(51, 255, 85, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                border: msg.role === 'user' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(51, 255, 85, 0.2)'
                                            }}>
                                                {msg.role === 'user' ? <User size={20} color="white" /> : <Wrench size={20} color="#33ff55" />}
                                            </div>
                                            <div style={{
                                                maxWidth: '85%',
                                                padding: isMobile ? '16px' : '24px',
                                                borderRadius: '20px',
                                                backgroundColor: msg.role === 'user' ? 'rgba(255, 60, 60, 0.08)' : 'rgba(51, 255, 85, 0.03)',
                                                color: 'white',
                                                border: msg.role === 'user' ? '1px solid rgba(255, 60, 60, 0.15)' : '1px solid rgba(51, 255, 85, 0.1)',
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
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(51, 255, 85, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(51, 255, 85, 0.2)' }}>
                                            <Wrench size={20} color="#33ff55" />
                                        </div>
                                        <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'rgba(51, 255, 85, 0.03)', border: '1px solid rgba(51, 255, 85, 0.1)' }}>
                                            <div className="flex gap-2">
                                                <div style={{ width: '6px', height: '6px', backgroundColor: '#33ff55', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                                <div style={{ width: '6px', height: '6px', backgroundColor: '#33ff55', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></div>
                                                <div style={{ width: '6px', height: '6px', backgroundColor: '#33ff55', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></div>
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
                                    placeholder="DESCRIBE THE PROBLEM..."
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
                                    onFocus={(e) => e.target.style.borderColor = '#33ff55'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                                <button
                                    onClick={handleSend}
                                    style={{
                                        width: '60px',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#33ff55',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 20px rgba(51, 255, 85, 0.3)'
                                    }}
                                >
                                    <Send size={22} color="black" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <RotatingList side="right" />
                        {/* Quick Diagnostics */}
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <h4 style={{ fontSize: '11px', fontWeight: '900', color: '#33ff55', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                                Quick Diagnostics
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
                                            e.currentTarget.style.backgroundColor = 'rgba(51, 255, 85, 0.05)';
                                            e.currentTarget.style.color = '#33ff55';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                                            e.currentTarget.style.color = '#aaa';
                                        }}
                                    >
                                        <div style={{ color: '#33ff55' }}>{q.icon}</div>
                                        {q.text}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Vehicle Status */}
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div className="flex items-center gap-3" style={{ marginBottom: '15px' }}>
                                <Car size={18} color="var(--color-primary-red)" />
                                <h4 style={{ fontSize: '12px', fontWeight: '900', color: 'white' }}>YOUR VEHICLE</h4>
                            </div>
                            <div style={{ padding: '15px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', marginBottom: '20px' }}>
                                <p style={{ fontSize: '14px', color: 'white', fontWeight: '900' }}>
                                    {vehicle.make ? `${vehicle.year} ${vehicle.make}` : "NO VEHICLE"}
                                </p>
                                <p style={{ fontSize: '12px', color: 'var(--color-primary-red)', fontWeight: '700' }}>
                                    {vehicle.model || "Connect vehicle for diagnostics"}
                                </p>
                            </div>
                            <Link to="/garage">
                                <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-primary-red)', backgroundColor: 'transparent', color: 'var(--color-primary-red)', fontSize: '11px', fontWeight: '900', cursor: 'pointer' }}>
                                    {vehicle.make ? "UPDATE VEHICLE" : "CONNECT VEHICLE"}
                                </button>
                            </Link>
                        </div>

                        {/* Safety Warning */}
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <div className="flex items-center gap-3" style={{ marginBottom: '15px' }}>
                                <AlertTriangle size={18} color="#ffc800" />
                                <h4 style={{ fontSize: '12px', fontWeight: '900', color: '#ffc800' }}>SAFETY FIRST</h4>
                            </div>
                            <p style={{ fontSize: '11px', color: '#888', lineHeight: '1.6', fontWeight: '700' }}>
                                Always follow proper safety procedures. This AI provides guidance only - not a substitute for professional mechanics for complex repairs.
                            </p>
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

export default AIMechanic;
