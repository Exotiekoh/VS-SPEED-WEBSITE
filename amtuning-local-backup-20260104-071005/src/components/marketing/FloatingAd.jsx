import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, ShoppingCart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/productDatabase';

const FloatingAd = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentAd, setCurrentAd] = useState(null);

    useEffect(() => {
        // Show ad after 5 seconds, then every 45 seconds
        const timer = setTimeout(() => {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            setCurrentAd(randomProduct);
            setIsVisible(true);
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    const closeAd = () => setIsVisible(false);

    if (!currentAd) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        zIndex: 10000,
                        width: '320px',
                    }}
                >
                    <div className="cool-outline" style={{
                        background: 'rgba(10, 10, 12, 0.95)',
                        border: '2px solid var(--color-gold)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {/* Header Banner */}
                        <div style={{ background: 'var(--color-gold)', padding: '6px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'black', fontWeight: '900', fontSize: '10px', letterSpacing: '1px' }}>
                                <TrendingUp size={12} style={{ display: 'inline', marginRight: '5px' }} />
                                LIVE TRENDING
                            </span>
                            <button onClick={closeAd} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'black' }}>
                                <X size={14} />
                            </button>
                        </div>

                        <div style={{ padding: '15px', display: 'flex', gap: '15px' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #333' }}>
                                <img src={currentAd.image} alt="ad" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '5px', lineHeight: '1.2' }}>{currentAd.title}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--color-primary-red)', fontWeight: '900', fontSize: '1rem' }}>{currentAd.price}</span>
                                    <span style={{ fontSize: '10px', color: '#4caf50' }}>IN STOCK</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '0 15px 15px' }}>
                            <Link 
                                to={`/products/${currentAd.id}`} 
                                onClick={closeAd}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    gap: '8px',
                                    width: '100%', 
                                    background: 'var(--color-primary-red)', 
                                    color: 'white', 
                                    padding: '10px', 
                                    borderRadius: '8px', 
                                    fontSize: '0.8rem', 
                                    fontWeight: '900',
                                    textDecoration: 'none'
                                }}
                            >
                                <ShoppingCart size={14} /> VIEW COMPONENT
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingAd;
