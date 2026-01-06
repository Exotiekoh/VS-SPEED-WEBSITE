import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, CheckCircle, Crown, Wrench, TrendingUp, Shield, Gift, Star } from 'lucide-react';
import { useVIP } from '../contexts/VIPContext';

const VIPModal = ({ isOpen, onClose }) => {
    const { activateVIP, monthlyPromo } = useVIP();
    const [email, setEmail] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleJoinVIP = () => {
        if (email && agreedToTerms) {
            //  In a real app, this would process payment
            // For now, we'll simulate activation
            activateVIP(email, 1);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
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
                    background: 'rgba(0, 0, 0, 0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                    padding: '20px',
                    backdropFilter: 'blur(10px)'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'linear-gradient(135deg, rgba(20,20,28,0.98) 0%, rgba(10,10,15,0.98) 100%)',
                        border: '2px solid var(--color-primary-red)',
                        borderRadius: '24px',
                        padding: '50px',
                        maxWidth: '700px',
                        width: '100%',
                        boxShadow: '0 0 80px rgba(255, 60, 60, 0.4)',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}
                >
                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white'
                        }}
                    >
                        <X size={20} />
                    </motion.button>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{
                                width: '100px',
                                height: '100px',
                                background: 'linear-gradient(135deg, var(--color-gold) 0%, #b8941e 100%)',
                                border: '3px solid var(--color-primary-red)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 30px',
                                boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)'
                            }}
                        >
                            <Crown size={50} color="black" />
                        </motion.div>
                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: '1000',
                            color: 'white',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            background: 'linear-gradient(135deg, var(--color-gold), var(--color-primary-red))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            JOIN VIP
                        </h1>
                        <p style={{ color: 'var(--color-gold)', fontSize: '16px', fontWeight: '700', letterSpacing: '1px' }}>
                            UNLOCK THE FULL POTENTIAL
                        </p>
                    </div>

                    { /* Monthly Promo Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(255, 60, 60, 0.2))',
                            border: '1px solid var(--color-gold)',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '30px',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                            <Gift size={24} color="var(--color-gold)" />
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'white', textTransform: 'uppercase' }}>
                                This Month's VIP Deal
                            </h3>
                        </div>
                        <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '10px' }}>
                            <strong style={{ color: 'var(--color-gold)' }}>{monthlyPromo.code}</strong> - {monthlyPromo.dealerDiscount}% off dealer purchases
                        </p>
                        <p style={{ fontSize: '16px', fontWeight: '900', color: 'var(--color-primary-red)' }}>
                            Plus: {monthlyPromo.shopBonus} at VS SPEED!
                        </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                        {[
                            { icon: Wrench, title: 'AI Mechanic', desc: 'Unlimited diagnostic help' },
                            { icon: TrendingUp, title: 'AI Tuner', desc: 'Custom tune creation' },
                            { icon: Shield, title: 'Priority Support', desc: '24/7 expert assistance' },
                            { icon: Star, title: 'Dealer Codes', desc: 'Monthly exclusive discounts' },
                            { icon: Zap, title: 'Performance Consulting', desc: 'Personalized build plans' },
                            { icon: CheckCircle, title: 'No Limits', desc: 'Unlimited AI usage' }
                        ].map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    textAlign: 'center'
                                }}
                            >
                                <benefit.icon size={32} color="var(--color-gold)" style={{ marginBottom: '10px' }} />
                                <h4 style={{ fontSize: '14px', fontWeight: '900', color: 'white', marginBottom: '6px', textTransform: 'uppercase' }}>
                                    {benefit.title}
                                </h4>
                                <p style={{ fontSize: '12px', color: '#888' }}>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pricing */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{
                            background: 'rgba(0,0,0,0.8)',
                            border: '2px solid var(--color-primary-red)',
                            borderRadius: '16px',
                            padding: '30px',
                            textAlign: 'center',
                            marginBottom: '30px',
                            boxShadow: '0 0 30px rgba(255, 60, 60, 0.2)'
                        }}
                    >
                        <div style={{ fontSize: '48px', fontWeight: '1000', color: 'white', marginBottom: '10px', letterSpacing: '-2px' }}>
                            $12.99
                            <span style={{ fontSize: '20px', color: '#888', fontWeight: '700' }}> /month</span>
                        </div>
                        <p style={{ fontSize: '14px', color: 'var(--color-gold)', fontWeight: '700', marginBottom: '10px' }}>
                            ✨ First Hour FREE - No Credit Card Required
                        </p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            Cancel anytime • Billed monthly •  Instant access
                        </p>
                    </motion.div>

                    {/* Email Input */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.8)',
                                border: '2px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                padding: '18px',
                                fontSize: '16px',
                                color: 'white',
                                fontWeight: '700',
                                outline: 'none',
                                transition: 'all 0.3s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Terms Checkbox */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '13px', color: '#ccc', fontWeight: '600' }}>
                            I agree to the VIP terms and monthly billing of $12.99 USD
                        </span>
                    </label>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(212, 175, 55, 0.6)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleJoinVIP}
                            disabled={!email || !agreedToTerms}
                            style={{
                                flex: 1,
                                background: email && agreedToTerms ? 'linear-gradient(135deg, var(--color-gold) 0%, #b8941e 100%)' : 'rgba(100,100,100,0.3)',
                                color: email && agreedToTerms ? 'black' : '#666',
                                fontWeight: '1000',
                                textTransform: 'uppercase',
                                height: '64px',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: email && agreedToTerms ? '0 0 40px rgba(212, 175, 55, 0.4)' : 'none',
                                cursor: email && agreedToTerms ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                fontSize: '16px',
                                letterSpacing: '1px'
                            }}
                        >
                            <Crown size={22} fill={email && agreedToTerms ? 'black' : '#666'} />
                            JOIN VIP NOW
                        </motion.button>
                    </div>

                    {/* No Thanks */}
                    <motion.button
                        whileHover={{ opacity: 0.8 }}
                        onClick={onClose}
                        style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: '#666',
                            fontSize: '13px',
                            fontWeight: '700',
                            marginTop: '20px',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        no, thanks
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VIPModal;
