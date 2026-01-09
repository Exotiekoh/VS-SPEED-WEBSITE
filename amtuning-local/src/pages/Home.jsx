import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe, Info, ShoppingBag } from 'lucide-react';

import Hero from '../components/layout/Hero';
import ProductCard from '../components/products/ProductCard';
import NewsletterSection from '../components/marketing/NewsletterSection';
import VIPModal from '../components/VIPModal';
import { useCart } from '../contexts/useCart';
import { useVIP } from '../contexts/VIPContext';
import { products } from '../data/productDatabase';

const Home = () => {
    const { addToCart } = useCart();
    const { showVIPModal, setShowVIPModal, vipData } = useVIP();
    
    // Randomize featured products on each page load
    const [featuredProducts] = useState(() => {
        const availableProducts = products.filter(p => p.id !== 401 && p.id !== 402);
        const shuffled = [...availableProducts].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 8);
    });

    // Show VIP modal on first visit after delay
    useEffect(() => {
        const hasSeenVIPModal = localStorage.getItem('vss_seen_vip_modal');
        if (!hasSeenVIPModal && !vipData.isVIP && !vipData.trialUsed) {
            const timer = setTimeout(() => {
                setShowVIPModal(true);
                localStorage.setItem('vss_seen_vip_modal', 'true');
            }, 2000); // Show after 2 seconds
            
            return () => clearTimeout(timer);
        }
    }, [vipData.isVIP, vipData.trialUsed, setShowVIPModal]);

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
        <div style={{ background: 'transparent', color: 'white' }}>
            <VIPModal isOpen={showVIPModal} onClose={() => setShowVIPModal(false)} />
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

            {/* Special Deals Section - Ferrari */}
            <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, rgba(210, 41, 49, 0.05) 0%, transparent 100%)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '12px' }}>
                            FERRARI <span className="text-red">SERIES</span>
                        </h2>
                    </div>
                    {/* ... existing Ferrari content ... */}
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

             {/* NEW: Carbon Fiber Feature Section */}
            <section style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0 }}>
                    <img 
                        src="/images/feature-carbon-parts.jpg" 
                        alt="Carbon Fiber Parts" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)' }}></div>
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ maxWidth: '600px' }}
                    >
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', lineHeight: 1.1, marginBottom: '20px' }}>
                            PRECISION <br/>
                            <span className="text-red">CARBON</span>
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '30px', maxWidth: '450px' }}>
                            Lightweight. Aerodynamic. Race-proven. Elevate your build with our premium carbon fiber aesthetic kits.
                        </p>
                        <Link to="/products?category=exterior">
                            <button className="cool-outline" style={{ padding: '15px 40px', background: 'transparent', border: '2px solid var(--color-primary-red)', color: 'white', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                Shop Carbon
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* NEW: Garage Feature Section */}
             <section style={{ padding: '0', position: 'relative', background: '#000' }}>
                <div className="container" style={{ padding: '100px 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                        
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                            gap: '40px',
                            alignItems: 'center'
                        }}>
                             <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-gold" style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>VIRTUAL GARAGE</span>
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: '15px 0' }}>BUILD YOUR <span className="text-red">DREAM</span></h2>
                                <p style={{ color: '#888', marginBottom: '30px', lineHeight: '1.6' }}>
                                    Step into our virtual studio. Visualize your perfect spec with our 3D configuration tools and premium parts catalog before you buy.
                                </p>
                                <Link to="/garage">
                                    <button style={{ padding: '15px 35px', background: 'var(--color-gold)', color: 'black', fontWeight: '900', borderRadius: '4px', border: 'none' }}>
                                        ENTER GARAGE
                                    </button>
                                </Link>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                            >
                                <img src="/images/garage-m4-studio.jpg" alt="Virtual Garage" style={{ width: '100%', display: 'block' }} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            {/* NEW: Worldwide Delivery Banner */}
            <section style={{ padding: '40px 0' }}>
                <div className="container">
                    <div style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        position: 'relative',
                        height: '400px',
                    }}>
                        <img 
                            src="/images/feature-worldwide-delivery.jpg" 
                            alt="Worldwide Delivery" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                         <div style={{ 
                             position: 'absolute', 
                             inset: 0, 
                             background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2))',
                             display: 'flex',
                             flexDirection: 'column',
                             justifyContent: 'center',
                             padding: '60px'
                         }}>
                             <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                             >
                                <Globe size={48} className="text-gold mb-4" />
                                <h2 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1' }}>GLOBAL <br/> LOGISTICS</h2>
                                <p style={{ fontSize: '1.2rem', maxWidth: '500px', marginTop: '20px', color: '#ddd' }}>
                                    Fast, insured shipping to over 200 countries. We handle the customs, you handle the driving.
                                </p>
                             </motion.div>
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
