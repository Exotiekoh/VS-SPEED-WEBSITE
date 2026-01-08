import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Truck, Shield, RefreshCw, ChevronRight, Minus, Plus, Zap, CheckCircle, AlertTriangle, Target, Package } from 'lucide-react';
import { useCart } from '../contexts/useCart';
import { useVehicle } from '../contexts/VehicleContext';
import { products } from '../data/productDatabase';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
    const { addToCart } = useCart();
    const { vehicle, makes } = useVehicle();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [fitmentStatus, setFitmentStatus] = useState(null);
    const [selectedMake, setSelectedMake] = useState(vehicle.make || '');
    const [isChecking, setIsChecking] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    
    const foundProduct = products.find(p => p.id.toString() === id);
    const product = foundProduct || products[0];

    // Build image gallery (main + gallery images)
    const allImages = [product.image, ...(product.gallery || [])];

    // Related products (same category or brand)
    const relatedProducts = products
        .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
        .slice(0, 3);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    const handleCheckFitment = () => {
        if (!selectedMake) return;
        
        setIsChecking(true);
        setFitmentStatus(null);

        // Simulate a "deep scan" animation
        setTimeout(() => {
            const fitmentArray = Array.isArray(product.fitment) ? product.fitment : [product.fitment];
            const isMatch = fitmentArray.some(f => 
                f && f.toLowerCase().includes(selectedMake.toLowerCase())
            );
            
            setFitmentStatus(isMatch ? 'match' : 'no-match');
            setIsChecking(false);
        }, 800);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            setSelectedImage(0);
        };
    }, [id]);

    return (
        <div style={{ background: 'transparent', minHeight: '100vh', padding: '100px 0' }}>
            <div className="container">
                {/* Breadcrumb */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#666', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '900', alignItems: 'center' }}
                >
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/products" className="hover-red">Shop</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>VSS#{product.id}</span>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                    {/* Left: Product Images */}
                    <div>
                        {/* Main Image Viewer */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card" 
                            style={{ 
                                padding: '40px', 
                                borderRadius: '24px', 
                                background: 'linear-gradient(135deg, rgba(20,20,28,0.95) 0%, rgba(10,10,15,0.95) 100%)',
                                backdropFilter: 'blur(20px)',
                                border: '2px solid rgba(255, 60, 60, 0.3)',
                                boxShadow: '0 0 40px rgba(255, 60, 60, 0.2), inset 0 0 60px rgba(0,0,0,0.5)',
                                height: '600px',
                              display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img 
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    src={allImages[selectedImage]} 
                                    alt={product.title} 
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                                />
                            </AnimatePresence>
                        </motion.div>
                        
                        {/* Thumbnails */}
                        <div className="flex gap-4 mb-12" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
                            {allImages.map((img, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedImage(i)}
                                    className="glass-card" 
                                    style={{ 
                                        minWidth: '100px', 
                                        width: '100px', 
                                        height: '100px', 
                                        padding: '10px', 
                                        background: selectedImage === i ? 'linear-gradient(135deg, rgba(20,20,28,0.9), rgba(10,10,15,0.9))' : 'rgba(0,0,0,0.7)',
                                        backdropFilter: 'blur(10px)',
                                        border: selectedImage === i ? '2px solid var(--color-gold)' : '1px solid rgba(255, 60, 60, 0.2)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        boxShadow: selectedImage === i ? '0 0 30px rgba(212, 175, 55, 0.5)' : '0 0 10px rgba(255, 60, 60, 0.1)'
                                    }}
                                >
                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={`View ${i + 1}`} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Related Products Section */}
                        {relatedProducts.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{ marginTop: '40px' }}
                            >
                                <div style={{ display: 'inline-block', background: 'var(--color-gold)', color: 'black', padding: '6px 14px', fontSize: '10px', fontWeight: '900', borderRadius: '6px', marginBottom: '20px', letterSpacing: '2px' }}>
                                    ⚡ RELATED
                                </div>
                                <div className="flex flex-col gap-6">
                                    {relatedProducts.map(rp => (
                                        <Link key={rp.id} to={`/products/${rp.id}`} className="glass-card" style={{ padding: '18px', display: 'flex', gap: '20px', alignItems: 'center', transition: 'all 0.3s', background: 'linear-gradient(135deg, rgba(20,20,28,0.8), rgba(10,10,15,0.8))', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 60, 60, 0.2)', boxShadow: '0 0 20px rgba(0,0,0,0.3)' }}>
                                            <div style={{ width: '70px', height: '70px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: 'rgba(0,0,0,0.5)', padding: '8px' }}>
                                                <img src={rp.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={rp.title} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'white', marginBottom: '6px' }}>{rp.title}</h4>
                                                <div className="flex gap-3 items-center">
                                                    <span style={{ fontSize: '14px', color: 'var(--color-primary-red)', fontWeight: '900' }}>{rp.price}</span>
                                                    <span style={{ fontSize: '9px', color: 'var(--color-gold)', fontWeight: '700', background: 'rgba(212, 175, 55, 0.1)', padding: '3px 8px', borderRadius: '4px' }}>{rp.brand}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Product Details */}
                    <div>
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex items-center gap-2 mb-4">
                                <Zap size={14} color="var(--color-gold)" />
                                <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--color-gold)', letterSpacing: '2px' }}>{product.brand?.toUpperCase() || 'VRSF'} ELITE SERIES</span>
                            </div>
                            
                            <h1 style={{ fontSize: '2.8rem', fontWeight: '1000', lineHeight: '1.1', color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                                {product.title}
                            </h1>

                            <p style={{ color: '#999', fontSize: '15px', marginBottom: '30px', lineHeight: '1.7', fontWeight: '500' }}>
                                {product.description}
                            </p>

                            {/* Spec Box */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{ 
                                    background: 'linear-gradient(135deg, rgba(20,20,28,0.95), rgba(10,10,15,0.95))', 
                                    backdropFilter: 'blur(20px)',
                                    border: '2px solid rgba(255, 60, 60, 0.2)', 
                                    borderRadius: '16px', 
                                    padding: '28px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '20px',
                                    marginBottom: '40px',
                                    boxShadow: '0 0 30px rgba(255, 60, 60, 0.15), inset 0 0 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                 <motion.div whileHover={{ scale: 1.05, y: -2 }} style={{ transition: 'transform 0.2s' }}>
                                    <h4 style={{ fontSize: '10px', color: '#555', marginBottom: '10px', fontWeight: '900', letterSpacing: '1px' }}>MFG PART #</h4>
                                    <p style={{ fontSize: '14px', fontWeight: '900', color: 'white' }}>{product.mfgPart || 'VRSF-206'}</p>
                                 </motion.div>
                                 <motion.div whileHover={{ scale: 1.05, y: -2 }} style={{ transition: 'transform 0.2s' }}>
                                    <h4 style={{ fontSize: '10px', color: '#555', marginBottom: '10px', fontWeight: '900', letterSpacing: '1px' }}>VSS PART #</h4>
                                    <p style={{ fontSize: '14px', fontWeight: '900', color: 'white' }}>VSS#{product.id.toString().padStart(4, '0')}</p>
                                 </motion.div>
                                 <motion.div whileHover={{ scale: 1.05, y: -2 }} style={{ transition: 'transform 0.2s' }}>
                                    <h4 style={{ fontSize: '10px', color: '#555', marginBottom: '10px', fontWeight: '900', letterSpacing: '1px' }}>BRAND</h4>
                                    <p style={{ fontSize: '14px', fontWeight: '900', color: 'var(--color-gold)', textShadow: '0 0 10px rgba(252, 207, 49, 0.3)' }}>{product.brand?.toUpperCase() || 'VRSF'}</p>
                                 </motion.div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: '40px' }}>
                                <div style={{ fontSize: '3.8rem', fontWeight: '1000', color: 'white', marginBottom: '15px', letterSpacing: '-2px' }}>
                                    {product.price}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <span style={{ fontSize: '13px', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700' }}><Package size={16}/> Free Express Shipping</span>
                                    <span style={{ fontSize: '13px', color: '#888', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700' }}><Shield size={16}/> Lifetime Warranty</span>
                                    <span style={{ fontSize: '13px', color: '#ff3333', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700' }}><div style={{width:'8px', height:'8px', background:'#ff3333', borderRadius:'50%', boxShadow: '0 0 10px #ff3333'}}/> In Stock - Ships Today</span>
                                </div>
                            </motion.div>

                            {/* Buy Buttons */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '12px', padding: '0 18px', height: '56px' }}>
                                    <button onClick={() => setQuantity(q => Math.max(1, q-1))} style={{ background: 'none', border: 'none', color: 'white', padding: '12px', cursor: 'pointer' }}><Minus size={16}/></button>
                                    <span style={{ padding: '0 20px', fontWeight: '900', color: 'white', fontSize: '16px' }}>{quantity}</span>
                                    <button onClick={() => setQuantity(q => q+1)} style={{ background: 'none', border: 'none', color: 'white', padding: '12px', cursor: 'pointer' }}><Plus size={16}/></button>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    style={{ flex: 1, background: '#c8c8c8', color: 'black', fontWeight: '1000', textTransform: 'uppercase', borderRadius: '12px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', fontSize: '15px', height: '56px', letterSpacing: '0.5px', boxShadow: '0 4px 15px rgba(200, 200, 200, 0.2)' }}
                                >
                                    <Zap size={18} fill="black" /> ADD TO CART
                                </motion.button>
                            </motion.div>
                            <Link to="/cart">
                                <motion.button 
                                    whileHover={{ scale: 1.01, boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={handleAddToCart}
                                    style={{ width: '100%', background: 'linear-gradient(135deg, var(--color-gold) 0%, #b8941e 100%)', color: 'black', fontWeight: '1000', textTransform: 'uppercase', height: '64px', borderRadius: '12px', border: 'none', marginBottom: '30px', boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '16px', letterSpacing: '1px' }}
                                >
                                    <Zap size={20} fill="black" /> BUY NOW
                                </motion.button>
                            </Link>

                            {/* Chassis Fitment Section */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: 0.5 }}
                                style={{ background: 'linear-gradient(135deg, rgba(20,20,28,0.95), rgba(10,10,15,0.95))', backdropFilter: 'blur(20px)', border: '2px solid rgba(255, 60, 60, 0.2)', borderRadius: '16px', padding: '28px', boxShadow: '0 0 30px rgba(255, 60, 60, 0.15), inset 0 0 40px rgba(0,0,0,0.5)' }}
                            >
                                 <h3 style={{ fontSize: '11px', fontWeight: '1000', color: 'var(--color-gold)', marginBottom: '20px', letterSpacing: '2px', textTransform: 'uppercase' }}>DOES THIS FIT YOUR CHASSIS?</h3>
                                 <div style={{ display: 'flex', gap: '15px', marginBottom: (fitmentStatus || isChecking) ? '20px' : '0' }}>
                                    <select 
                                        value={selectedMake}
                                        onChange={(e) => setSelectedMake(e.target.value)}
                                        style={{ flex: 1, background: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: '#888', padding: '0 18px', height: '54px', fontWeight: '700', outline: 'none', fontSize: '14px' }}
                                    >
                                        <option value="">Select Make...</option>
                                        {makes.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCheckFitment}
                                        disabled={isChecking}
                                        style={{ 
                                            background: 'var(--color-gold)', 
                                            color: 'black', 
                                            fontWeight: '1000', 
                                            padding: '0 30px', 
                                            borderRadius: '10px', 
                                            border: 'none', 
                                            cursor: isChecking ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '14px',
                                            letterSpacing: '1px',
                                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                                        }}
                                    >
                                        {isChecking ? <RefreshCw size={18} className="animate-spin" /> : 'CHECK'}
                                    </motion.button>
                                 </div>

                                 <AnimatePresence mode="wait">
                                    {isChecking && (
                                        <motion.div 
                                            key="checking"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            style={{ fontSize: '13px', color: 'var(--color-gold)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}
                                        >
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Target size={18}/></motion.div>
                                            SCANNING DATABASE FOR COMPATIBILITY...
                                        </motion.div>
                                    )}
                                    {fitmentStatus === 'match' && !isChecking && (
                                        <motion.div 
                                            key="match"
                                            initial={{ opacity: 0, y: 10 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#4ade80', fontSize: '13px', fontWeight: '900', background: 'rgba(74, 222, 128, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(74, 222, 128, 0.2)' }}
                                        >
                                            <CheckCircle size={20} /> CONFIRMED FITMENT FOR YOUR {selectedMake.toUpperCase()}
                                        </motion.div>
                                    )}
                                    {fitmentStatus === 'no-match' && !isChecking && (
                                        <motion.div 
                                            key="no-match"
                                            initial={{ opacity: 0, y: 10 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ff4444', fontSize: '13px', fontWeight: '900', background: 'rgba(255, 68, 68, 0.1)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255, 68, 68, 0.2)' }}
                                        >
                                            <AlertTriangle size={20} /> INCOMPATIBLE WITH {selectedMake.toUpperCase()}
                                        </motion.div>
                                    )}
                                 </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
