import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe, Info, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../components/layout/Hero';
import ProductCard from '../components/products/ProductCard';
import NewsletterSection from '../components/marketing/NewsletterSection';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/productDatabase';

const Home = () => {
    const { addToCart } = useCart();
    
    // Randomize featured products on each page load
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // Shuffle and select 8 random products excluding Ferrari (401, 402)
        const availableProducts = products.filter(p => p.id !== 401 && p.id !== 402);
        const shuffled = [...availableProducts].sort(() => Math.random() - 0.5);
        setFeaturedProducts(shuffled.slice(0, 8));
    }, []);

    // Get Ferrari products for the special section
    const ferrari488 = products.find(p => p.id === 401);
    const ferrari812 = products.find(p => p.id === 402);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div style={{ background: 'var(--color-bg-deep)', color: 'white' }}>
            <Hero />

            {/* Featured Products Section */}
            <section style={{ padding: '100px 0', position: 'relative' }}>
                <div className="container">
                    <div className="flex justify-between items-end" style={{ marginBottom: '50px' }}>
                        <div>
                            <span className="punchline">The Collection</span>
                            <h2 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>FEATURED <span className="text-red">PARTS</span></h2>
                        </div>
                        <Link to="/products" className="flex items-center gap-2 text-gold font-bold hover-opacity">
                            View All Parts <ArrowRight size={20} />
                        </Link>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}
                    >
                        {featuredProducts.map((product) => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Special Deals Section */}
            <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, rgba(210, 41, 49, 0.05) 0%, transparent 100%)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '60px' }}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            style={{
                                display: 'inline-block',
                                background: 'linear-gradient(135deg, #FF2800 0%, #8B0000 100%)',
                                padding: '10px 30px',
                                borderRadius: '30px',
                                marginBottom: '20px',
                                boxShadow: '0 8px 24px rgba(255, 40, 0, 0.3)'
                            }}
                        >
                            <span style={{ color: '#fff', fontWeight: '900', fontSize: '12px', letterSpacing: '3px' }}>
                                🏎️ EXOTIC PERFORMANCE
                            </span>
                        </motion.div>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '12px' }}>
                            FERRARI <span className="text-red">CARBON</span> SERIES
                        </h2>
                        <p style={{ color: '#888', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                            Ultra-premium dry carbon fibre transformations for the world's most elite supercar platforms.
                        </p>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', 
                        gap: '30px' 
                    }}>
                        {/* 488 Kit */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass"
                            style={{
                                padding: 'clamp(20px, 4vw, 30px)',
                                borderRadius: '24px',
                                background: 'rgba(20,20,28,0.9)',
                                border: '1px solid var(--color-primary-red)',
                                overflow: 'hidden',
                                boxShadow: '0 0 20px rgba(255, 60, 60, 0.1)'
                            }}
                        >
                            <div style={{ position: 'relative', height: '250px', marginBottom: '25px', borderRadius: '16px', overflow: 'hidden', borderBottom: '1px solid var(--color-border-glass)' }}>
                                <img src={ferrari488?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Ferrari 488" />
                                <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--color-primary-red)', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '9px', fontWeight: '900', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                    EXOTIC SERIES
                                </div>
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '10px', color: 'var(--color-text-main)' }}>{ferrari488?.title}</h2>
                            <p style={{ color: 'var(--color-text-body)', marginBottom: '20px', fontSize: '0.95rem', lineHeight: '1.6' }}>{ferrari488?.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                                <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-gold)' }}>{ferrari488?.price}</span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Link to={`/products/${ferrari488?.id}`}>
                                        <button style={{ background: '#1a1a24', color: '#fff', border: '1px solid var(--color-border-glass)', padding: '10px 20px', borderRadius: '8px', fontWeight: '900', fontSize: '12px', cursor: 'pointer' }}>Details</button>
                                    </Link>
                                    <button 
                                        onClick={() => addToCart(ferrari488)}
                                        style={{ background: 'var(--color-primary-red)', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 60, 60, 0.4)' }}
                                    >
                                        <ShoppingBag size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
 
                        {/* 812 Kit */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass"
                            style={{
                                padding: 'clamp(20px, 4vw, 30px)',
                                borderRadius: '24px',
                                background: 'rgba(20,20,28,0.9)',
                                border: '1px solid var(--color-gold)',
                                overflow: 'hidden',
                                boxShadow: '0 0 20px rgba(252, 207, 49, 0.1)'
                            }}
                        >
                            <div style={{ position: 'relative', height: '250px', marginBottom: '25px', borderRadius: '16px', overflow: 'hidden', borderBottom: '1px solid var(--color-border-glass)' }}>
                                <img src={ferrari812?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Ferrari 812" />
                                <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--color-gold)', color: 'black', padding: '6px 12px', borderRadius: '4px', fontSize: '9px', fontWeight: '900', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                    ELITE SERIES
                                </div>
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '10px', color: 'var(--color-text-main)' }}>{ferrari812?.title}</h2>
                            <p style={{ color: 'var(--color-text-body)', marginBottom: '20px', fontSize: '0.95rem', lineHeight: '1.6' }}>{ferrari812?.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                                <span style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-gold)' }}>{ferrari812?.price}</span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Link to={`/products/${ferrari812?.id}`}>
                                        <button style={{ background: '#1a1a24', color: '#fff', border: '1px solid var(--color-border-glass)', padding: '10px 20px', borderRadius: '8px', fontWeight: '900', fontSize: '12px', cursor: 'pointer' }}>Details</button>
                                    </Link>
                                    <button 
                                        onClick={() => addToCart(ferrari812)}
                                        style={{ background: 'var(--color-primary-red)', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 60, 60, 0.4)' }}
                                    >
                                        <ShoppingBag size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* JDM & German Performance Banner */}
            <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%)' }}>
                <div className="container text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: '900',
                            marginBottom: '20px'
                        }}
                    >
                        <span style={{ color: 'var(--color-gold)' }}>JDM</span> & <span style={{ color: 'var(--color-primary-red)' }}>GERMAN</span> PERFORMANCE
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
                    >
                        Premium parts for Nissan, Toyota, Subaru, Honda, BMW, Mercedes, Audi, Porsche and more.
                    </motion.p>
                </div>
            </section>

            {/* Unique VSSPEED Value Strip */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="glass" style={{ padding: '60px', borderRadius: 'var(--border-radius-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
                        <div className="text-center">
                            <Globe className="text-red mx-auto" size={40} style={{ marginBottom: '20px' }} />
                            <h4 style={{ marginBottom: '10px' }}>Global Speed</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Worldwide sourcing for rare performance components.</p>
                        </div>
                        <div className="text-center">
                            <Shield className="text-red mx-auto" size={40} style={{ marginBottom: '20px' }} />
                            <h4 style={{ marginBottom: '10px' }}>Pro Verified</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Every part tested for racing-grade reliability.</p>
                        </div>
                        <div className="text-center">
                            <Zap className="text-red mx-auto" size={40} style={{ marginBottom: '20px' }} />
                            <h4 style={{ marginBottom: '10px' }}>Instant Power</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Software and hardware tunes that deliver today.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <NewsletterSection />

        </div>
    );
};

export default Home;
