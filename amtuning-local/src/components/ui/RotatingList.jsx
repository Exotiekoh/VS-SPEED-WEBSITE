import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../data/productDatabase';

const RotatingList = ({ side = 'left' }) => {
    // Helper to get random products
    const getRandomProducts = () => {
        return [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
    };

    const [visibleProducts, setVisibleProducts] = useState(() => getRandomProducts());
    const [rotationId, setRotationId] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleProducts(getRandomProducts());
            setRotationId(Date.now());
        }, 20000); // Rotate every 20s
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {/* Header/Label for the stack */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                opacity: 0.7,
                justifyContent: side === 'left' ? 'flex-end' : 'flex-start'
            }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800' }}>
                    {side === 'left' ? 'LIVE MARKET' : 'TRENDING PARTS'}
                </span>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary-red)', boxShadow: '0 0 10px red' }}></div>
            </div>

            <AnimatePresence mode="wait">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {visibleProducts.map((product, i) => (
                        <motion.div
                            key={`${product.id}-${i}-${rotationId}`} // Stable key based on rotation period
                            initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: i * 0.15 }}
                            className="glass-card hover-glow-gold"
                            style={{
                                padding: '12px',
                                background: 'rgba(20, 20, 20, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                flexDirection: side === 'left' ? 'row-reverse' : 'row',
                                gap: '12px',
                                alignItems: 'center',
                                cursor: 'pointer',
                                textAlign: side === 'left' ? 'right' : 'left'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                background: '#000',
                                overflow: 'hidden',
                                flexShrink: 0,
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <img 
                                    src={product.image} 
                                    alt={product.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                                />
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <h5 style={{ 
                                    fontSize: '11px', 
                                    fontWeight: '700', 
                                    color: 'white', 
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis',
                                    marginBottom: '4px'
                                }}>
                                    {product.title}
                                </h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ fontSize: '10px', color: '#888' }}>{product.brand}</span>
                                    <span style={{ fontSize: '10px', color: 'var(--color-gold)', fontWeight: 'bold' }}>{product.price}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>
        </div>
    );
};

export default RotatingList;
