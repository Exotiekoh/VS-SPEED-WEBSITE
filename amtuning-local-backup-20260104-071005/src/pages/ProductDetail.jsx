import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Truck, Shield, RefreshCw, ChevronRight, Minus, Plus, Car, CheckCircle, Zap, Package, FileText, MessageSquare, Share2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useVehicle } from '../contexts/VehicleContext';
import { products } from '../data/productDatabase';
import { motion, AnimatePresence } from 'framer-motion';

// ============ ANIMATIONS ============
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ============ PRODUCT DETAIL ============
const ProductDetail = () => {
    const { addToCart } = useCart();
    const { vehicle } = useVehicle();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('details');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [isCartNotice, setIsCartNotice] = useState(false);
    const [selectedMake, setSelectedMake] = useState('');
    
    const foundProduct = products.find(p => p.id.toString() === id);
    
    const product = foundProduct ? {
        ...foundProduct,
        inStock: true,
        images: foundProduct.gallery ? [foundProduct.image, ...foundProduct.gallery] : [foundProduct.image],
        mfgPartNum: `${foundProduct.brand?.toUpperCase().replace(/\s/g, '-')}-${foundProduct.id}`,
        partNum: `VSS#${4000000 + foundProduct.id}`
    } : {
        id,
        title: `Product #${id}`,
        brand: 'VS SPEED',
        price: '$0.00',
        inStock: true,
        description: 'High performance automotive part.',
        features: ['Premium quality', 'Performance tested'],
        fitment: 'Universal fitment',
        images: ['https://placehold.co/600x600/1a1a1a/d4af37?text=VS+SPEED'],
        mfgPartNum: `VSS-${id}`,
        partNum: `VSS#${id}`
    };

    const relatedProducts = products.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 2);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        setIsCartNotice(true);
        setTimeout(() => setIsCartNotice(false), 3000);
    };

    const vehicleMakes = ['Audi', 'BMW', 'Mercedes-Benz', 'MINI', 'Porsche', 'Volkswagen'];

    const tabs = [
        { id: 'details', label: 'PRODUCT INTEL', icon: <FileText size={14} /> },
        { id: 'fitment', label: 'COMPATIBLE CHASSIS', icon: <Car size={14} /> },
        { id: 'warranty', label: 'LIFETIME COVERAGE', icon: <Shield size={14} /> },
        { id: 'faqs', label: 'FAQ', icon: <MessageSquare size={14} /> }
    ];

    return (
        <div style={{ background: 'var(--color-bg-deep)', color: 'white', minHeight: '100vh' }}>
            {/* ===== TOP BAR ===== */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                    background: 'rgba(0,0,0,0.5)', 
                    borderBottom: '1px solid rgba(255,255,255,0.05)', 
                    padding: '12px 0',
                    fontSize: '13px',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                        <Link to="/" style={{ color: '#888', textDecoration: 'none' }} className="hover-gold">Home</Link>
                        <ChevronRight size={14} color="#444" />
                        <Link to="/products" style={{ color: '#888', textDecoration: 'none' }} className="hover-gold">{product.brand}</Link>
                        <ChevronRight size={14} color="#444" />
                        <span style={{ color: 'var(--color-gold)', fontWeight: '700' }}>{product.partNum}</span>
                    </div>
                    
                    <div className="glass" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        padding: '10px 20px',
                        borderRadius: '12px'
                    }}>
                        <Car size={20} color="var(--color-primary-red)" />
                        <div>
                            <div style={{ fontWeight: '800', color: 'white', fontSize: '11px', letterSpacing: '1px' }}>YOUR CHASSIS</div>
                            <div style={{ color: '#888', fontSize: '11px' }}>TAP TO SELECT</div>
                        </div>
                        <span style={{ color: 'var(--color-gold)', fontWeight: '900', fontSize: '10px', letterSpacing: '1px' }}>SELECT</span>
                    </div>
                </div>
            </motion.div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="container" style={{ padding: '50px 2rem' }}>
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: '60px' }}
                >
                    
                    {/* LEFT: Image Gallery */}
                    <motion.div variants={fadeInUp}>
                        <motion.div 
                            className="glass"
                            style={{
                                borderRadius: '20px',
                                marginBottom: '20px',
                                height: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255,255,255,0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    src={product.images[activeImage]} 
                                    alt={product.title}
                                    style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }}
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x400/1a1a1a/d4af37?text=VS+SPEED'; }}
                                />
                            </AnimatePresence>
                            {product.originalPrice && (
                                <motion.div 
                                    initial={{ x: 50 }}
                                    animate={{ x: 0 }}
                                    style={{ 
                                        position: 'absolute', 
                                        top: '20px', 
                                        right: '20px', 
                                        background: 'var(--color-primary-red)', 
                                        color: 'white', 
                                        padding: '8px 16px', 
                                        borderRadius: '8px',
                                        fontSize: '11px', 
                                        fontWeight: '900',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    SALE ACTIVE
                                </motion.div>
                            )}
                        </motion.div>
                        
                        {/* Thumbnails */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {product.images.map((img, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveImage(i)}
                                    className="glass"
                                    style={{
                                        width: '90px',
                                        height: '90px',
                                        borderRadius: '12px',
                                        border: activeImage === i ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer',
                                        padding: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Related Product */}
                        {relatedProducts.length > 0 && (
                            <motion.div 
                                variants={fadeInUp}
                                className="glass"
                                style={{ marginTop: '30px', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                                    <span style={{ background: 'var(--color-gold)', color: 'black', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', fontWeight: '900', letterSpacing: '1px' }}>⚙ RELATED</span>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <div style={{ width: '80px', height: '80px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                        <img src={relatedProducts[0].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '5px' }}>{relatedProducts[0].title}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                            <span style={{ background: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '800' }}>IN STOCK</span>
                                            <span style={{ fontWeight: '800', color: 'var(--color-gold)', fontSize: '12px' }}>{relatedProducts[0].brand}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '18px', fontWeight: '900', color: 'white' }}>{relatedProducts[0].price}</span>
                                            <Link to={`/products/${relatedProducts[0].id}`}>
                                                <motion.button 
                                                    whileHover={{ scale: 1.05 }}
                                                    style={{ padding: '8px 15px', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', background: 'transparent', borderRadius: '8px', fontSize: '10px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' }}
                                                >
                                                    VIEW
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* RIGHT: Product Info */}
                    <motion.div variants={fadeInUp}>
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Zap size={14} color="var(--color-gold)" />
                            <span style={{ fontSize: '10px', fontWeight: '900', color: 'var(--color-gold)', letterSpacing: '2px' }}>{product.brand} ELITE SERIES</span>
                        </div>
                        
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '15px', lineHeight: '1.2' }}>
                            {product.title}
                        </h1>
                        <p style={{ color: '#888', fontSize: '14px', marginBottom: '25px', lineHeight: '1.6' }}>
                            {product.description?.slice(0, 120)}...
                        </p>

                        {/* Part Numbers */}
                        <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', fontSize: '12px' }}>
                                <div>
                                    <span style={{ color: '#666', fontWeight: '600' }}>MFG PART #</span>
                                    <div style={{ color: 'white', fontWeight: '800', marginTop: '4px' }}>{product.mfgPartNum}</div>
                                </div>
                                <div>
                                    <span style={{ color: '#666', fontWeight: '600' }}>VSS PART #</span>
                                    <div style={{ color: 'white', fontWeight: '800', marginTop: '4px' }}>{product.partNum}</div>
                                </div>
                                <div>
                                    <span style={{ color: '#666', fontWeight: '600' }}>BRAND</span>
                                    <div style={{ color: 'var(--color-gold)', fontWeight: '900', marginTop: '4px' }}>{product.brand}</div>
                                </div>
                            </div>
                        </div>

                        {/* Price & Features */}
                        <div style={{ display: 'flex', gap: '40px', marginBottom: '30px', alignItems: 'flex-start' }}>
                            <div>
                                <motion.div 
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    style={{ fontSize: '3rem', fontWeight: '900', color: 'white' }}
                                >
                                    {product.price}
                                </motion.div>
                                {product.originalPrice && (
                                    <span style={{ fontSize: '16px', color: '#666', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                                )}
                            </div>
                            <div style={{ fontSize: '12px', color: '#888' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Truck size={16} color="#22c55e" />
                                    <span style={{ color: '#22c55e', fontWeight: '700' }}>Free Express Shipping</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <Shield size={16} color="var(--color-gold)" />
                                    <span>Lifetime Warranty</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Package size={16} color="var(--color-primary-red)" />
                                    <span style={{ color: '#22c55e', fontWeight: '700' }}>In Stock - Ships Today</span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
                            <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '8px 15px', borderRadius: '12px' }}>
                                <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '5px' }}
                                >
                                    <Minus size={18} />
                                </motion.button>
                                <span style={{ fontSize: '20px', fontWeight: '900', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                                <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '5px' }}
                                >
                                    <Plus size={18} />
                                </motion.button>
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(255, 0, 0, 0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                className="bg-red"
                                style={{
                                    flex: 1,
                                    padding: '18px 30px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '900',
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}
                            >
                                {isCartNotice ? <CheckCircle size={20} /> : <Zap size={20} />}
                                {isCartNotice ? 'ADDED TO CART' : 'DEPLOY TO CART'}
                            </motion.button>
                        </div>

                        {/* Wishlist & Share */}
                        <div style={{ display: 'flex', gap: '25px', marginBottom: '35px', fontSize: '12px' }}>
                            <motion.button 
                                whileHover={{ color: 'var(--color-primary-red)' }}
                                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}
                            >
                                <Heart size={16} /> ADD TO WISHLIST
                            </motion.button>
                            <motion.button 
                                whileHover={{ color: 'var(--color-gold)' }}
                                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}
                            >
                                <Share2 size={16} /> SHARE
                            </motion.button>
                        </div>

                        {/* Fitment Checker */}
                        <div className="glass" style={{ padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '12px', fontWeight: '900', color: 'var(--color-gold)', marginBottom: '15px', letterSpacing: '2px' }}>DOES THIS FIT YOUR CHASSIS?</h3>
                            <select 
                                value={selectedMake}
                                onChange={(e) => setSelectedMake(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    padding: '15px', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '10px',
                                    fontSize: '14px',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: 'white'
                                }}
                            >
                                <option value="">Select Make...</option>
                                {vehicleMakes.map(make => (
                                    <option key={make} value={make}>{make}</option>
                                ))}
                            </select>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ===== TABS SECTION ===== */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ marginTop: '60px', marginBottom: '50px' }}
                >
                    <div style={{ display: 'flex', borderBottom: 'none', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                        {tabs.map((tab, index) => (
                            <motion.button
                                key={tab.id}
                                whileHover={{ backgroundColor: tab.id === activeTab ? 'var(--color-primary-red)' : 'rgba(255,255,255,0.05)' }}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flex: 1,
                                    padding: '18px 20px',
                                    background: activeTab === tab.id ? 'var(--color-primary-red)' : 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: '800',
                                    fontSize: '11px',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                {tab.icon}
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="glass" style={{ padding: '40px', borderRadius: '0 0 16px 16px', border: '1px solid rgba(255,255,255,0.05)', borderTop: 'none' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'details' && (
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '25px', color: 'white' }}>
                                            <span style={{ color: 'var(--color-gold)', fontWeight: '900' }}>Product</span> Intel
                                        </h2>
                                        <p style={{ marginBottom: '25px', color: '#aaa', lineHeight: '1.9', fontSize: '15px' }}>
                                            {product.description}
                                        </p>
                                        {product.features && (
                                            <>
                                                <h3 style={{ fontSize: '12px', fontWeight: '900', marginBottom: '15px', color: 'var(--color-gold)', letterSpacing: '2px' }}>KIT CONTENTS:</h3>
                                                <ul style={{ color: '#aaa', lineHeight: '2.2', paddingLeft: '0', listStyle: 'none' }}>
                                                    {product.features.map((feature, i) => (
                                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{ width: '6px', height: '6px', background: 'var(--color-primary-red)', borderRadius: '50%' }} />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'fitment' && (
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '25px', color: 'white' }}>
                                            <span style={{ color: 'var(--color-gold)', fontWeight: '900' }}>Compatible</span> Chassis
                                        </h2>
                                        <div className="glass" style={{ padding: '25px', borderRadius: '12px' }}>
                                            <p style={{ color: 'var(--color-gold)', fontWeight: '700', marginBottom: '10px' }}>Validated Platforms:</p>
                                            <p style={{ color: '#aaa', lineHeight: '1.9' }}>
                                                {product.fitment || 'Contact our expert team for detailed fitment verification.'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'warranty' && (
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '25px', color: 'white' }}>
                                            <span style={{ color: 'var(--color-gold)', fontWeight: '900' }}>Lifetime</span> Coverage
                                        </h2>
                                        <p style={{ color: '#aaa', lineHeight: '1.9', marginBottom: '25px' }}>
                                            This component is protected by our Lifetime Replacement Program. If it fails due to manufacturing defects, we replace it - no questions asked.
                                        </p>
                                        <ul style={{ color: '#aaa', lineHeight: '2.2', paddingLeft: '0', listStyle: 'none' }}>
                                            {['Covers all manufacturing defects', 'Original purchaser with proof of purchase', 'Normal wear items excluded', 'Shipping may apply for replacements'].map((item, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <CheckCircle size={14} color="#22c55e" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'faqs' && (
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '25px', color: 'white' }}>
                                            <span style={{ color: 'var(--color-gold)', fontWeight: '900' }}>Frequently</span> Asked
                                        </h2>
                                        {[
                                            { q: 'Is this a direct bolt-on replacement?', a: 'Yes, designed for OEM fitment with no modifications.' },
                                            { q: 'What tools are required for installation?', a: 'Standard hand tools. Consult your service manual for specifics.' },
                                            { q: 'What is the warranty coverage?', a: 'Lifetime replacement against all manufacturing defects.' }
                                        ].map((faq, i) => (
                                            <div key={i} style={{ marginBottom: '25px' }}>
                                                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'white', marginBottom: '10px' }}>Q: {faq.q}</h4>
                                                <p style={{ color: '#aaa', lineHeight: '1.7' }}>A: {faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ===== CLEARANCE BANNER ===== */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="cool-outline"
                    style={{ 
                        background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a1a 100%)', 
                        padding: '50px', 
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '900', marginBottom: '8px' }}>
                            <span style={{ color: 'var(--color-primary-red)' }}>CLEARANCE</span> SALE - UP TO <span style={{ color: 'var(--color-gold)' }}>80% OFF</span>
                        </h2>
                        <p style={{ color: '#888', fontSize: '14px' }}>REVAMP YOUR RIDE WITH UNBEATABLE DEALS!</p>
                        <p style={{ color: 'var(--color-primary-red)', fontSize: '12px', fontWeight: '700', marginTop: '5px' }}>⚡ LIMITED STOCK AVAILABLE</p>
                    </div>
                    <Link to="/products">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red"
                            style={{
                                padding: '18px 45px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '900',
                                letterSpacing: '2px',
                                cursor: 'pointer'
                            }}
                        >
                            SHOP NOW
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
