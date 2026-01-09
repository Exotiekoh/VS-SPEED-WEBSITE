import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Building, Mail, Shield, Check, AlertCircle, Zap, ShieldCheck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentSettings = () => {
    const [paymentMethod, setPaymentMethod] = useState('email');
    const [email, setEmail] = useState('vsspeedhq@gmail.com');
    const [saved, setSaved] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const isMobile = windowWidth <= 850;

    return (
        <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', color: 'white' }}>
            <div className="container" style={{ padding: isMobile ? '40px 1.5rem 80px' : '80px 1.5rem 100px', maxWidth: '900px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '12px', color: '#666', marginBottom: '30px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Link to="/" className="hover-red">Command</Link>
                    <ChevronRight size={14} />
                    <Link to="/account" className="hover-red">Account</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>Payment Control</span>
                </div>

                <div style={{ marginBottom: '50px' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <Zap size={20} color="var(--color-gold)" />
                        <span style={{ fontSize: '12px', fontWeight: '900', color: 'var(--color-gold)', letterSpacing: '2px' }}>FINANCIAL PROTOCOL</span>
                    </div>
                    <h1 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '900', marginBottom: '15px', letterSpacing: '-1.5px' }}>PAYMENT <span className="text-red">SETTINGS</span></h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Configure your transaction nodes and deployment preferences.</p>
                </div>

                <AnimatePresence>
                    {saved && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="flex items-center gap-3" 
                            style={{ padding: '20px 24px', backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', borderRadius: '12px', marginBottom: '30px', color: '#4ade80', fontWeight: '800' }}
                        >
                            <Check size={20} />
                            SYSTEM UPDATED: PROTOCOL LOCKED
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSave}>
                    {/* Payment Method Selection */}
                    <div style={{ marginBottom: '50px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: '900', marginBottom: '25px', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Transaction Method</h3>

                        <div className="flex flex-col gap-4">
                            {[
                                { id: 'email', icon: <Mail />, title: 'EMAIL DISBURSEMENT', sub: 'Direct e-Transfer to your registered tactical address.' },
                                { id: 'bank', icon: <Building />, title: 'DIRECT DEPOSIT', sub: 'ACH/Wire transfer to connected institutional nodes.' },
                                { id: 'card', icon: <ShieldCheck />, title: 'CRYPTO / GLOBAL WALLET', sub: 'Instant deployment via encrypted digital ledger.' }
                            ].map((method) => (
                                <motion.label 
                                    key={method.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '20px',
                                        padding: '24px',
                                        border: paymentMethod === method.id ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        backgroundColor: paymentMethod === method.id ? 'rgba(252, 207, 49, 0.03)' : 'rgba(255,255,255,0.01)',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="method"
                                        value={method.id}
                                        checked={paymentMethod === method.id}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginTop: '4px', accentColor: 'var(--color-gold)' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
                                            <div style={{ color: paymentMethod === method.id ? 'var(--color-gold)' : '#444' }}>{method.icon}</div>
                                            <span style={{ fontWeight: '900', fontSize: '14px', letterSpacing: '0.5px' }}>{method.title}</span>
                                        </div>
                                        <p style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>{method.sub}</p>
                                    </div>
                                </motion.label>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Section */}
                    <motion.div
                        key={paymentMethod}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="glass"
                        style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '40px' }}
                    >
                        {paymentMethod === 'email' && (
                            <div>
                                <h3 style={{ fontSize: '12px', fontWeight: '900', marginBottom: '20px', color: 'white', textTransform: 'uppercase' }}>Designated Recipient Address</h3>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="COMMAND CONTROL EMAIL"
                                    style={{
                                        width: '100%',
                                        padding: '18px 24px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        color: 'white',
                                        fontSize: '15px',
                                        outline: 'none',
                                        marginBottom: '15px'
                                    }}
                                />
                                <p style={{ fontSize: '11px', color: '#555', fontWeight: '700' }}>
                                    All fiscal deployment notifications will be routed through this secure channel.
                                </p>
                            </div>
                        )}

                        {paymentMethod === 'bank' && (
                            <div className="flex flex-col gap-6">
                                <h3 style={{ fontSize: '12px', fontWeight: '900', marginBottom: '5px', color: 'white', textTransform: 'uppercase' }}>Institutional Data</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                                    <input type="text" placeholder="ACCOUNT HOLDER NAME" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                                    <input type="text" placeholder="INSTITUTION ID" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                                    <input type="text" placeholder="ROUTING NUMBER" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                                    <input type="text" placeholder="ACCOUNT NUMBER" style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'card' && (
                            <div style={{ textAlign: 'center' }}>
                                <Globe size={48} color="var(--color-gold)" style={{ marginBottom: '20px', opacity: 0.5 }} />
                                <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '10px' }}>Global Crypto Bridge</h3>
                                <p style={{ fontSize: '13px', color: '#666', marginBottom: '30px' }}>Secure vault connection via Web3 or Global Wallet provider.</p>
                                <button type="button" className="bg-gold" style={{ padding: '14px 30px', borderRadius: '10px', color: 'black', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', border: 'none', cursor: 'pointer' }}>Connect Vault</button>
                            </div>
                        )}
                    </motion.div>

                    {/* Security Notice */}
                    <div className="glass" style={{ padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)', marginBottom: '40px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                        <div style={{ padding: '10px', background: 'rgba(252, 207, 49, 0.1)', borderRadius: '10px' }}>
                            <Shield size={24} color="var(--color-gold)" />
                        </div>
                        <div>
                            <h4 style={{ fontWeight: '900', fontSize: '14px', marginBottom: '8px', color: 'white' }}>ENCRYPTED ENDPOINT</h4>
                            <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.6', fontWeight: '600' }}>
                                Your financial data is secured with AES-256 level encryption. We do not store sensitive institutional credentials on local servers.
                            </p>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button type="submit" className="bg-red" style={{
                        width: '100%',
                        padding: '24px',
                        color: 'white',
                        fontWeight: '900',
                        fontSize: '14px',
                        borderRadius: '16px',
                        border: 'none',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        boxShadow: '0 10px 40px rgba(255, 60, 60, 0.2)',
                        transition: 'all 0.3s'
                    }}>
                        UPDATE DEPLOYMENT PROTOCOL
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentSettings;
