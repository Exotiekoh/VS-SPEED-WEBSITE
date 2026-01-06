import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Send, Loader2, Bot, User, Zap } from 'lucide-react';

const ChatBox = ({ messages = [], onSend, isTyping = false, style = {} }) => {
    const [inputValue, setInputValue] = useState('');
    // const [isTyping, setIsTyping] = useState(false); // Removed local state
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Use external isTyping prop if provided, otherwise default to internal state (though internal is deprecated/legacy behavior)
    // For this fix, we are assuming the parent controls isTyping.
    
    // Note: The previous internal isTyping state logic has been removed to rely on the parent component.
    // However, to maintain backward compatibility if other components use it without props, we can keep the local state but prefer the prop.
    // Actually, let's stick to the prompt: Update to use external isTyping prop.
    
    // We will assume 'isLoading' or 'isTyping' is passed in props. The file view showed 'messages' and 'onSend'.
    // We need to update the signature on line 5 to include 'isTyping'.
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        onSend(inputValue);
        setInputValue('');
        // No internal setTyping here, waiting for parent
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div 
            className="glass"
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,60,60,0.3)',
                overflow: 'hidden',
                ...style
            }}
        >
            {/* Messages Container */}
            <div 
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    scrollBehavior: 'smooth'
                }}
                className="custom-scrollbar"
            >
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%'
                            }}
                        >
                            {msg.role === 'assistant' && (
                                <div style={{
                                    minWidth: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #ff3c3c 0%, #d2232a 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(255,60,60,0.4)'
                                }}>
                                    <Zap size={18} fill="white" color="white" />
                                </div>
                            )}
                            
                            <div
                                className={msg.role === 'user' ? 'glass' : ''}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '16px',
                                    background: msg.role === 'user' 
                                        ? 'rgba(212, 175, 55, 0.15)' 
                                        : 'rgba(255,255,255,0.03)',
                                    border: msg.role === 'user'
                                        ? '1px solid rgba(212, 175, 55, 0.3)'
                                        : '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    wordWrap: 'break-word'
                                }}
                            >
                                {msg.content}
                            </div>

                            {msg.role === 'user' && (
                                <div style={{
                                    minWidth: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #d4af37 0%, #fccf31 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                                }}>
                                    <User size={18} color="black" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'flex',
                            gap: '12px',
                            alignSelf: 'flex-start',
                            maxWidth: '80%'
                        }}
                    >
                        <div style={{
                            minWidth: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff3c3c 0%, #d2232a 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Loader2 size={18} color="white" className="spinning" />
                        </div>
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            gap: '4px',
                            alignItems: 'center'
                        }}>
                            <span className="typing-dot" style={{ animationDelay: '0ms' }}></span>
                            <span className="typing-dot" style={{ animationDelay: '150ms' }}></span>
                            <span className="typing-dot" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
                onSubmit={handleSubmit}
                style={{
                    padding: '16px 20px',
                    borderTop: '1px solid rgba(255,60,60,0.2)',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your tuning goals..."
                    style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                        e.target.style.boxShadow = 'none';
                    }}
                />
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim()}
                    style={{
                        background: inputValue.trim() 
                            ? 'linear-gradient(135deg, #d4af37 0%, #fccf31 100%)' 
                            : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '700',
                        fontSize: '14px',
                        color: inputValue.trim() ? 'black' : '#666',
                        transition: 'all 0.3s ease',
                        boxShadow: inputValue.trim() ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none'
                    }}
                >
                    <Send size={16} />
                    SEND
                </motion.button>
            </form>

            {/* Custom Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,60,60,0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,60,60,0.5);
                }
                .spinning {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .typing-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #888;
                    animation: typingDot 1.4s infinite;
                }
                @keyframes typingDot {
                    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
                    30% { opacity: 1; transform: translateY(-6px); }
                }
            `}</style>
        </div>
    );
};

export default ChatBox;
