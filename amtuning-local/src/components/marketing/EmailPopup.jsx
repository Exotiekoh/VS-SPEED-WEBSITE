import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Sparkles } from 'lucide-react';
import popupYellowGolf from '../../assets/popup_yellow_golf.jpg';

const EmailPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Responsive check
        const checkMobile = () => setIsMobile(window.innerWidth < 600);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const hasSeenPopup = localStorage.getItem('vsspeed_popup_dismissed');
        
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', checkMobile);
            };
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('vsspeed_popup_dismissed', 'true');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Email submitted:', email);
            setSubmitted(true);
            setTimeout(() => {
                handleClose();
            }, 2500);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Fullscreen Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            zIndex: 10000,
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)'
                        }}
                    />

                    {/* Centering Container */}
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10001,
                            padding: '16px',
                            boxSizing: 'border-box',
                            pointerEvents: 'none'
                        }}
                    >
                        {/* Popup Modal */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                                borderRadius: isMobile ? '14px' : '18px',
                                boxShadow: '0 30px 80px rgba(255, 60, 60, 0.35), 0 0 0 1px rgba(212, 175, 55, 0.25)',
                                overflow: 'hidden',
                                width: '100%',
                                maxWidth: isMobile ? '340px' : '460px',
                                position: 'relative',
                                border: '2px solid rgba(212, 175, 55, 0.2)',
                                pointerEvents: 'auto',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                        >
                            {/* Background Image */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: 0,
                                    pointerEvents: 'none',
                                    overflow: 'hidden'
                                }}
                            >
                                <img 
                                    src={popupYellowGolf} 
                                    alt="VS SPEED Performance"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.4
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(212,175,55,0.2) 100%)'
                                }} />
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                aria-label="Close"
                                style={{
                                    position: 'absolute',
                                    top: isMobile ? '10px' : '12px',
                                    right: isMobile ? '10px' : '12px',
                                    width: isMobile ? '28px' : '32px',
                                    height: isMobile ? '28px' : '32px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10,
                                    transition: 'all 0.2s'
                                }}
                            >
                                <X size={isMobile ? 14 : 18} color="white" />
                            </button>

                            {!submitted ? (
                                <div style={{ 
                                    position: 'relative', 
                                    zIndex: 1, 
                                    padding: isMobile ? '28px 20px 24px' : '36px 32px 28px' 
                                }}>
                                    {/* Badge */}
                                    <motion.div 
                                        animate={{ y: [0, -2, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            background: 'linear-gradient(135deg, #fccf31, #f5af19)',
                                            padding: isMobile ? '4px 12px' : '5px 14px',
                                            borderRadius: '16px',
                                            marginBottom: isMobile ? '14px' : '18px'
                                        }}
                                    >
                                        <Sparkles size={isMobile ? 11 : 13} color="#000" />
                                        <span style={{ 
                                            fontWeight: '800', 
                                            color: '#000', 
                                            fontSize: isMobile ? '9px' : '10px', 
                                            letterSpacing: '0.8px' 
                                        }}>
                                            EXCLUSIVE OFFER
                                        </span>
                                    </motion.div>

                                    {/* Headline */}
                                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '18px' : '22px' }}>
                                        <motion.h2 
                                            animate={{ scale: [1, 1.02, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            style={{ 
                                                fontSize: isMobile ? '38px' : '48px', 
                                                fontWeight: '900',
                                                background: 'linear-gradient(135deg, #ff3c3c, #fccf31)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                marginBottom: '6px',
                                                lineHeight: '1'
                                            }}
                                        >
                                            $25 OFF
                                        </motion.h2>
                                        
                                        <p style={{ 
                                            fontSize: isMobile ? '13px' : '15px', 
                                            color: '#d4af37',
                                            marginBottom: '4px',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1.5px'
                                        }}>
                                            Your First Order
                                        </p>

                                        <p style={{ 
                                            fontSize: isMobile ? '11px' : '12px', 
                                            color: '#888',
                                            lineHeight: '1.4',
                                            maxWidth: '320px',
                                            margin: '0 auto'
                                        }}>
                                            Join our VIP list for exclusive discounts on premium performance parts
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit}>
                                        <div style={{ 
                                            display: 'flex', 
                                            flexDirection: isMobile ? 'column' : 'row',
                                            gap: '10px',
                                            marginBottom: '10px'
                                        }}>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                required
                                                style={{
                                                    flex: 1,
                                                    padding: isMobile ? '12px 14px' : '13px 16px',
                                                    border: '2px solid rgba(212, 175, 55, 0.25)',
                                                    borderRadius: '10px',
                                                    outline: 'none',
                                                    fontSize: isMobile ? '13px' : '14px',
                                                    color: '#fff',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    transition: 'all 0.3s'
                                                }}
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                style={{
                                                    padding: isMobile ? '12px 20px' : '13px 24px',
                                                    background: 'linear-gradient(135deg, #ff3c3c, #dc2626)',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '6px',
                                                    color: 'white',
                                                    fontWeight: '800',
                                                    fontSize: isMobile ? '12px' : '13px',
                                                    letterSpacing: '0.5px',
                                                    textTransform: 'uppercase'
                                                }}
                                            >
                                                <Zap size={14} fill="white" />
                                                Claim
                                            </motion.button>
                                        </div>
                                    </form>

                                    <p style={{ fontSize: isMobile ? '8px' : '9px', color: '#555', textAlign: 'center' }}>
                                        By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                                    </p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{ 
                                        position: 'relative', 
                                        zIndex: 1, 
                                        textAlign: 'center', 
                                        padding: isMobile ? '40px 24px' : '50px 36px' 
                                    }}
                                >
                                    <motion.div 
                                        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                                        transition={{ duration: 0.6 }}
                                        style={{ 
                                            fontSize: isMobile ? '50px' : '60px', 
                                            marginBottom: '12px',
                                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >✓</motion.div>
                                    <h3 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>
                                        You're In!
                                    </h3>
                                    <p style={{ color: '#888', fontSize: isMobile ? '12px' : '13px' }}>
                                        Check your email for your <strong style={{ color: '#fccf31' }}>$25 discount code</strong>!
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EmailPopup;
