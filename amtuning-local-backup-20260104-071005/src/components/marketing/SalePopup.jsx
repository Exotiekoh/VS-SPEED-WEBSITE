import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const SalePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check screen size for responsive adjustments
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 600);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Check if user has already seen the sale popup
        const hasSeenSale = localStorage.getItem('vsspeed_sale_seen');
        
        if (!hasSeenSale) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 500);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', checkMobile);
            };
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('vsspeed_sale_seen', 'true');
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
                        onClick={handleDismiss}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            zIndex: 10000,
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)'
                        }}
                    />

                    {/* Centering Container - Flexbox for universal centering */}
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
                            padding: isMobile ? '16px' : '24px',
                            boxSizing: 'border-box',
                            pointerEvents: 'none'
                        }}
                    >
                        {/* Popup Modal */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: isMobile ? '340px' : '480px',
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                                borderRadius: isMobile ? '16px' : '20px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 80px rgba(212, 175, 55, 0.25), 0 0 50px rgba(210, 41, 49, 0.15)',
                                border: '2px solid rgba(212, 175, 55, 0.3)',
                                position: 'relative',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                pointerEvents: 'auto'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleDismiss}
                                aria-label="Close popup"
                                style={{
                                    position: 'absolute',
                                    top: isMobile ? '10px' : '14px',
                                    right: isMobile ? '10px' : '14px',
                                    background: 'rgba(255, 255, 255, 0.12)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: isMobile ? '30px' : '36px',
                                    height: isMobile ? '30px' : '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <X size={isMobile ? 16 : 20} color="#fff" />
                            </button>

                            {/* Sparkle Effects */}
                            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ 
                                            opacity: [0, 0.8, 0], 
                                            scale: [0.5, 1, 0.5],
                                        }}
                                        transition={{ 
                                            duration: 3, 
                                            repeat: Infinity, 
                                            delay: i * 0.5
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: `${20 + Math.random() * 60}%`,
                                            left: `${10 + Math.random() * 80}%`,
                                        }}
                                    >
                                        <Sparkles size={14} color="#d4af37" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content */}
                            <div style={{ 
                                padding: isMobile ? '36px 20px 24px' : '44px 32px 32px', 
                                textAlign: 'center', 
                                position: 'relative' 
                            }}>
                                {/* Badge */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: 'linear-gradient(135deg, #d4af37, #f4d03f)',
                                        padding: isMobile ? '5px 14px' : '6px 18px',
                                        borderRadius: '20px',
                                        marginBottom: isMobile ? '14px' : '18px'
                                    }}
                                >
                                    <Tag size={isMobile ? 12 : 14} color="#0a0a0a" />
                                    <span style={{ 
                                        color: '#0a0a0a', 
                                        fontWeight: '800', 
                                        fontSize: isMobile ? '9px' : '11px', 
                                        letterSpacing: '1px' 
                                    }}>
                                        LIMITED TIME OFFER
                                    </span>
                                </motion.div>

                                {/* Headline */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        fontSize: isMobile ? '28px' : '38px',
                                        fontWeight: '900',
                                        color: '#fff',
                                        marginBottom: isMobile ? '8px' : '12px',
                                        lineHeight: '1.1'
                                    }}
                                >
                                    SAVE <motion.span
                                        animate={{ color: ['#d4af37', '#f4d03f', '#d4af37'] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ color: '#d4af37' }}
                                    >
                                        $25
                                    </motion.span>
                                </motion.h2>

                                {/* Product */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    style={{
                                        fontSize: isMobile ? '14px' : '18px',
                                        color: '#bbb',
                                        marginBottom: '8px',
                                        fontWeight: '600'
                                    }}
                                >
                                    APR Iridium Pro Spark Plugs
                                </motion.p>

                                {/* Price */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    style={{ marginBottom: isMobile ? '18px' : '24px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '10px' : '12px' }}>
                                        <span style={{ 
                                            fontSize: isMobile ? '18px' : '22px', 
                                            color: '#666', 
                                            textDecoration: 'line-through'
                                        }}>
                                            $148.00
                                        </span>
                                        <motion.span
                                            animate={{ scale: [1, 1.04, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            style={{ 
                                                fontSize: isMobile ? '28px' : '34px', 
                                                color: '#D22931',
                                                fontWeight: '900'
                                            }}
                                        >
                                            $123.00
                                        </motion.span>
                                    </div>
                                    <p style={{ fontSize: isMobile ? '10px' : '12px', color: '#777', marginTop: '4px' }}>
                                        Heat Range 10 · Perfect for tuned applications
                                    </p>
                                </motion.div>

                                {/* CTA Button */}
                                <Link to="/products/113" onClick={handleDismiss} style={{ textDecoration: 'none' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: '100%',
                                            padding: isMobile ? '14px 20px' : '16px 28px',
                                            background: 'linear-gradient(135deg, #D22931, #8B0000)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            color: '#fff',
                                            fontSize: isMobile ? '13px' : '15px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            letterSpacing: '0.5px',
                                            textTransform: 'uppercase',
                                            boxShadow: '0 6px 20px rgba(210, 41, 49, 0.35)'
                                        }}
                                    >
                                        Claim This Deal Now
                                    </motion.button>
                                </Link>

                                {/* Urgency */}
                                <motion.p
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        marginTop: isMobile ? '12px' : '16px',
                                        fontSize: isMobile ? '9px' : '10px',
                                        color: '#d4af37',
                                        fontWeight: '600'
                                    }}
                                >
                                    ⚡ Offer ends soon - Limited stock available
                                </motion.p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SalePopup;
