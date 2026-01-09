import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Truck, Shield, RefreshCw, ChevronRight, Minus, Plus, Zap, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useVehicle } from '../contexts/VehicleContext';
import { products } from '../data/productDatabase';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
    const { addToCart } = useCart();
    const { vehicle } = useVehicle();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('description');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isCartNotice, setIsCartNotice] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const foundProduct = products.find(p => p.id.toString() === id);
    
    const product = foundProduct ? {
        ...foundProduct,
        inStock: true,
        images: foundProduct.images || [foundProduct.image]
    } : {
        id,
        title: `Product #${id}`,
        brand: 'VS SPEED',
        price: 'Contact for Price',
        sku: `VSS-${id}`,
        inStock: true,
        description: 'High performance automotive part. Contact us for details.',
        features: ['Premium quality', 'Performance tested', 'Expert support'],
        fitment: 'Contact for fitment info',
        images: ['https://placehold.co/600x600/1a1a1a/gold?text=VS+SPEED']
    };

    const checkFitment = () => {
        if (!vehicle.make) return 'unknown';
        const fitmentText = (product.fitment || '').toLowerCase();
        const vehicleMake = vehicle.make.toLowerCase();
        const vehicleModel = (vehicle.model || '').toLowerCase();
        if (fitmentText.includes(vehicleMake) || (vehicleModel && fitmentText.includes(vehicleModel))) {
            return 'confirmed';
        }
        return 'incompatible';
    };

    const fitmentStatus = checkFitment();

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: quantity });
        setIsCartNotice(true);
        setTimeout(() => setIsCartNotice(false), 3000);
    };

    const isMobile = windowWidth <= 1024;
    const isSmall = windowWidth <= 640;

    return (
        <div style={{ background: 'var(--color-bg-deep)', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ padding: isMobile ? '40px 1.5rem 80px' : '60px 1.5rem 100px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center mb-10" style={{ fontSize: '13px', color: '#666', marginBottom: isMobile ? '30px' : '40px' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/products" className="hover-red">Arsenal</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>{isSmall ? 'Product' : product.title}</span>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', 
                    gap: isMobile ? '40px' : '80px' 
                }}>
                    {/* Image Gallery */}
                    <div style={{ position: isMobile ? 'static' : 'sticky', top: '100px', height: 'fit-content' }}>
                        <motion.div 
                            layoutId={`product-img-${product.id}`}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.02)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                marginBottom: '20px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                height: isSmall ? '350px' : isMobile ? '500px' : '650px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    src={product.images[activeImage]}
                                    alt={product.title}
                                    style={{ width: '90%', height: '90%', objectFit: 'contain' }}
                                />
                            </AnimatePresence>
                            
                            {product.originalPrice && (
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    backgroundColor: 'var(--color-primary-red)',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontWeight: '900',
                                    fontSize: '12px',
                                    boxShadow: '0 4px 15px rgba(255, 60, 60, 0.4)'
                                }}>
                                    OFFER ACTIVE
                                </div>
                            )}
                        </motion.div>
                        
                        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                            {product.images.map((img, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveImage(i)}
                                    style={{
                                        width: isSmall ? '80px' : '100px',
                                        height: isSmall ? '80px' : '100px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        border: activeImage === i ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                        padding: '10px',
                                        flexShrink: 0
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '40px' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Zap size={14} color="var(--color-gold)" />
                                <span style={{ fontSize: '10px', fontWeight: '900', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                    {product.brand} ELITE SERIES
                                </span>
                            </div>
                            <h1 style={{ fontSize: isSmall ? '2.5rem' : '4rem', fontWeight: '900', marginBottom: '15px', lineHeight: '1.1', letterSpacing: '-1.5px' }}>
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-6" style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }} />
                                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#4ade80', textTransform: 'uppercase' }}>DEPLOYMENT READY</span>
                                </div>
                                <span style={{ fontSize: '12px', color: '#444', fontWeight: '800' }}>SKU/{product.sku}</span>
                            </div>

                            <div className="flex items-center gap-6" style={{ marginBottom: '40px' }}>
                                <span style={{ fontSize: isSmall ? '36px' : '48px', fontWeight: '900', color: 'white' }}>
                                    {product.price}
                                </span>
                                {product.originalPrice && (
                                    <span style={{ fontSize: '20px', color: '#444', textDecoration: 'line-through', fontWeight: '800' }}>
                                        {product.originalPrice}
                                    </span>
                                )}
                            </div>

                            {/* Fitment Checker */}
                            <div className="glass" style={{ 
                                padding: '24px', 
                                borderRadius: '24px', 
                                border: '1px solid rgba(255,255,255,0.05)', 
                                marginBottom: '40px',
                                background: fitmentStatus === 'confirmed' ? 'rgba(74, 222, 128, 0.03)' : fitmentStatus === 'incompatible' ? 'rgba(255, 60, 60, 0.03)' : 'rgba(255,255,255,0.01)'
                            }}>
                                <div className="flex items-center gap-4">
                                    <div style={{ 
                                        padding: '12px', 
                                        borderRadius: '12px', 
                                        backgroundColor: fitmentStatus === 'confirmed' ? 'rgba(74, 222, 128, 0.1)' : fitmentStatus === 'incompatible' ? 'rgba(255, 60, 60, 0.1)' : 'rgba(252, 207, 49, 0.1)' 
                                    }}>
                                        {fitmentStatus === 'confirmed' ? <CheckCircle size={24} color="#4ade80" /> : 
                                         fitmentStatus === 'incompatible' ? <AlertTriangle size={24} color="#ff3c3c" /> : 
                                         <Target size={24} color="var(--color-gold)" />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '13px', fontWeight: '900', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {fitmentStatus === 'confirmed' ? 'FITMENT CONFIRMED' : 
                                             fitmentStatus === 'incompatible' ? 'FITMENT ALERT' : 
                                             'CHASSIS VERIFICATION'}
                                        </h4>
                                        <p style={{ fontSize: '11px', color: '#888', marginTop: '4px', fontWeight: '700' }}>
                                            {fitmentStatus === 'confirmed' ? `Perfect architectural fit for your ${vehicle.year} ${vehicle.make}.` : 
                                             fitmentStatus === 'incompatible' ? `This component may not be compatible with your ${vehicle.make}.` : 
                                             `Select your vehicle in the Garage for precision verification.`}
                                        </p>
                                    </div>
                                    {fitmentStatus === 'unknown' && !isSmall && (
                                        <Link to="/garage">
                                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', backgroundColor: 'transparent', fontSize: '10px', fontWeight: '900', cursor: 'pointer' }}>
                                                GARAGE
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Add to Arsenal */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: isSmall ? '1fr' : '150px 1fr 60px', 
                            gap: '20px', 
                            marginBottom: '50px' 
                        }}>
                             <div className="flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', padding: '8px' }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}
                                >
                                    <Minus size={18} />
                                </button>
                                <span style={{ fontWeight: '900', fontSize: '20px' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}
                                >
                                    <Plus size={18} />
                                </button>
                             </div>

                             <button 
                                onClick={handleAddToCart}
                                disabled={isCartNotice}
                                className="bg-red" 
                                style={{
                                    height: '60px',
                                    fontWeight: '900',
                                    borderRadius: '16px',
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(255, 60, 60, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px'
                                }}
                            >
                                {isCartNotice ? <CheckCircle size={20} /> : <Zap size={20} />}
                                {isCartNotice ? 'ADDED TO ARSENAL' : 'DEPLOY TO CART'}
                            </button>

                             {!isSmall && (
                                <button style={{
                                    width: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '16px',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    color: '#444',
                                    cursor: 'pointer'
                                }}>
                                    <Heart size={20} />
                                </button>
                             )}
                        </div>

                        {/* Feature Badges */}
                        <div style={{ display: 'grid', gridTemplateColumns: isSmall ? '1fr' : 'repeat(3, 1fr)', gap: '15px', marginBottom: '60px' }}>
                            {[
                                { icon: <Truck size={20} />, label: 'GLOBAL TRANSIT', sub: 'EXPRESS' },
                                { icon: <Shield size={20} />, label: 'QC VERIFIED', sub: 'RACE GRADE' },
                                { icon: <RefreshCw size={20} />, label: 'ELITE SWAP', sub: '30 DAY' }
                            ].map((badge, i) => (
                                <div key={i} className="glass" style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
                                    <div style={{ color: 'var(--color-primary-red)', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>{badge.icon}</div>
                                    <p style={{ fontSize: '11px', fontWeight: '900', color: 'white', letterSpacing: '1px' }}>{badge.label}</p>
                                    <p style={{ fontSize: '9px', color: '#555', marginTop: '2px', fontWeight: '800' }}>{badge.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex gap-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px', overflowX: 'auto' }}>
                            {['description', 'features', 'fitment'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '16px 0',
                                        fontWeight: '900',
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        color: activeTab === tab ? 'var(--color-gold)' : '#555',
                                        borderBottom: activeTab === tab ? '2px solid var(--color-gold)' : '2px solid transparent',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div style={{ paddingBottom: '40px' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === 'description' && (
                                        <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1rem' }}>
                                            {product.description} Engineered for the absolute limit of automotive performance. This component utilizes aerospace-grade materials to ensure maximum thermal efficiency and structural integrity under extreme load.
                                        </p>
                                    )}
                                    {activeTab === 'features' && (
                                        <ul style={{ color: '#aaa', lineHeight: '2.5', listStyle: 'none', padding: 0 }}>
                                            {product.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-4">
                                                    <div style={{ padding: '4px', background: 'var(--color-primary-red)', borderRadius: '4px' }}>
                                                        <CheckCircle size={10} color="white" />
                                                    </div>
                                                    <span style={{ fontSize: '1rem', fontWeight: '700' }}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {activeTab === 'fitment' && (
                                        <div className="glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                            <h4 style={{ marginBottom: '15px', fontSize: '12px', fontWeight: '900', color: 'white' }}>VALIDATED CHASSIS:</h4>
                                            <p style={{ color: 'var(--color-gold)', lineHeight: '1.8', fontSize: '1rem', fontWeight: '800' }}>{product.fitment}</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
