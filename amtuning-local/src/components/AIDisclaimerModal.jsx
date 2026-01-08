import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, CheckCircle } from 'lucide-react';

const AIDisclaimerModal = ({ isOpen, onAccept, onDecline }) => {
    const [hasReadDisclaimer, setHasReadDisclaimer] = useState(false);

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
                    padding: '20px'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(20,20,28,0.98) 0%, rgba(10,10,15,0.98) 100%)',
                        border: '2px solid var(--color-primary-red)',
                        borderRadius: '24px',
                        padding: '40px',
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: '0 0 60px rgba(255, 60, 60, 0.3)',
                        position: 'relative'
                    }}
                >
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{
                                width: '80px',
                                height: '80px',
                                background: 'rgba(255, 60, 60, 0.1)',
                                border: '2px solid var(--color-primary-red)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                boxShadow: '0 0 30px rgba(255, 60, 60, 0.2)'
                            }}
                        >
                            <AlertTriangle size={40} color="var(--color-primary-red)" />
                        </motion.div>
                        <h2 style={{ 
                            fontSize: '28px', 
                            fontWeight: '900', 
                            color: 'white',
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            AI Service Disclaimer
                        </h2>
                        <p style={{ color: 'var(--color-gold)', fontSize: '14px', fontWeight: '700' }}>
                            Please read carefully before proceeding
                        </p>
                    </div>

                    {/* Disclaimer Content */}
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: '24px',
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}>
                        <h3 style={{ 
                            color: 'var(--color-gold)', 
                            fontSize: '16px', 
                            fontWeight: '900', 
                            marginBottom: '16px',
                            textTransform: 'uppercase'
                        }}>
                            Important Information
                        </h3>
                        
                        <div style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.8', marginBottom: '16px' }}>
                            <p style={{ marginBottom: '12px' }}>
                                <strong style={{ color: 'white' }}>1. AI-Generated Advice:</strong> Our AI Mechanic and AI Tuner services provide recommendations based on machine learning algorithms. While highly sophisticated, <strong>AI responses should not replace professional mechanical or tuning services</strong>.
                            </p>
                            
                            <p style={{ marginBottom: '12px' }}>
                                <strong style={{ color: 'white' }}>2. Liability:</strong> VS SPEED is not liable for any damage, injury, or loss resulting from following AI-generated recommendations. Always consult with certified professionals for critical vehicle work.
                            </p>
                            
                            <p style={{ marginBottom: '12px' }}>
                                <strong style={{ color: 'white' }}>3. Subscription Terms:</strong> Your first AI session is <span style={{ color: 'var(--color-gold)' }}>FREE</span>. Continued access requires a subscription of <strong>$12.99 USD/month</strong> for unlimited AI usage.
                            </p>
                            
                            <p style={{ marginBottom: '12px' }}>
                                <strong style={{ color: 'white' }}>4. Data Usage:</strong> We use your vehicle information, installed parts list, and engine bay photos to provide personalized recommendations. Your data is stored securely and never shared with third parties.
                            </p>
                            
                            <p style={{ marginBottom: '12px' }}>
                                <strong style={{ color: 'white' }}>5. Performance Modifications:</strong> Any performance tuning or modifications may void manufacturer warranties, affect emissions compliance, and alter vehicle safety. Proceed at your own risk.
                            </p>

                            <p>
                                <strong style={{ color: 'white' }}>6. No Guarantee:</strong> Results may vary. We make no guarantees regarding power gains, reliability, or performance outcomes.
                            </p>
                        </div>
                    </div>

                    {/* Checkbox Agreement */}
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        background: hasReadDisclaimer ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 60, 60, 0.05)',
                        border: `1px solid ${hasReadDisclaimer ? 'var(--color-gold)' : 'rgba(255, 60, 60, 0.3)'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        marginBottom: '24px',
                        transition: 'all 0.3s ease'
                    }}>
                        <input
                            type="checkbox"
                            checked={hasReadDisclaimer}
                            onChange={(e) => setHasReadDisclaimer(e.target.checked)}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                accentColor: 'var(--color-gold)'
                            }}
                        />
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: '700' }}>
                            I have read and understand the disclaimer. I accept all risks and terms.
                        </span>
                    </label>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onDecline}
                            style={{
                                flex: 1,
                                padding: '16px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '900',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        >
                            <X size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Decline
                        </motion.button>
                        
                        <motion.button
                            whileHover={hasReadDisclaimer ? { scale: 1.02 } : {}}
                            whileTap={hasReadDisclaimer ? { scale: 0.98 } : {}}
                            onClick={hasReadDisclaimer ? onAccept : null}
                            disabled={!hasReadDisclaimer}
                            style={{
                                flex: 1,
                                padding: '16px',
                                background: hasReadDisclaimer 
                                    ? 'linear-gradient(135deg, var(--color-primary-red) 0%, #8b0000 100%)'
                                    : 'rgba(100,100,100,0.3)',
                                border: 'none',
                                borderRadius: '12px',
                                color: hasReadDisclaimer ? 'white' : '#666',
                                fontSize: '14px',
                                fontWeight: '900',
                                cursor: hasReadDisclaimer ? 'pointer' : 'not-allowed',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: hasReadDisclaimer ? '0 0 20px rgba(255, 60, 60, 0.3)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <CheckCircle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            I Understand - Continue
                        </motion.button>
                    </div>

                    {/* Subscription Notice */}
                    <div style={{
                        marginTop: '20px',
                        padding: '12px',
                        background: 'rgba(33, 150, 243, 0.1)',
                        border: '1px solid rgba(33, 150, 243, 0.2)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <p style={{ fontSize: '12px', color: '#2196F3', margin: 0 }}>
                            🎁 <strong>First session FREE</strong> • Then $12.99/month for unlimited AI access
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AIDisclaimerModal;
