import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Ruler, Zap, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/productDatabase';

const CustomFabrication = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const customParts = products.filter(p => p.category === 'Custom Fabrication');
    
    const isMobile = windowWidth <= 768;
    const isTablet = windowWidth <= 1024;

    return (
        <div style={{ background: 'var(--color-bg-deep)', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ padding: isMobile ? '40px 1.5rem 80px' : '60px 1.5rem 120px' }}>
                
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: isMobile ? '20px' : '40px', fontWeight: '800', textTransform: 'uppercase' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>Special Projects</span>
                </div>

                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '100px' }}
                >
                    <span className="punchline">Elite Engineering</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-2px', lineHeight: '1' }}>
                        CUSTOM <span className="text-red">FABRICATION</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '1rem' : '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                        Where precision engineering meets automotive art. Our master fabricators bring your vision to life with aerospace-grade materials and precision TIG welding.
                    </p>
                </motion.div>

                {/* Core Values / Process */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px', marginBottom: isMobile ? '60px' : '100px' }}>
                    {[
                        { icon: <Hammer size={32} />, title: "Hand Built", desc: "No mass production. Every piece is a unique masterpiece of engineering." },
                        { icon: <Ruler size={32} />, title: "Precision", desc: "Accuracy down to the micron. Laser-scanned fitment for every chassis." },
                        { icon: <Zap size={32} />, title: "Maximum Flow", desc: "Optimized geometry for unparalleled exhaust telemetry & cooling." },
                        { icon: <ShieldCheck size={32} />, title: "LIFETIME SHIELD", desc: "Unconditional lifetime warranty on every TIG weld we perform." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass glass-hover"
                            style={{
                                padding: isMobile ? '30px' : '40px',
                                borderRadius: '24px',
                                textAlign: 'center',
                                border: '1px solid rgba(255,255,255,0.03)'
                            }}
                        >
                            <div style={{ color: 'var(--color-gold)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                            <h3 style={{ color: 'white', fontWeight: '900', marginBottom: '12px', fontSize: '1.2rem', textTransform: 'uppercase' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Panels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '40px' : '80px' }}>
                    {customParts.map((part, index) => (
                        <motion.div
                            key={part.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                backgroundColor: 'rgba(255,255,255,0.01)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div style={{ position: 'relative', height: isMobile ? '300px' : isTablet ? '400px' : '600px' }}>
                                <img 
                                    src={part.image} 
                                    alt={part.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '150px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                            </div>
                            
                            <div style={{ padding: isMobile ? '30px' : '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <span style={{ color: 'var(--color-gold)', fontWeight: '900', marginBottom: '15px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>VSS SPECIAL PROJECTS DIVISION</span>
                                <h2 style={{ fontSize: isMobile ? '2.2rem' : '3rem', fontWeight: '900', color: 'white', marginBottom: '25px', lineHeight: '1', letterSpacing: '-1px' }}>{part.title}</h2>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '1rem' : '1.1rem', marginBottom: '30px', lineHeight: '1.7' }}>
                                    {part.description}
                                </p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
                                    {part.features?.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3" style={{ fontSize: '13px', color: '#888', fontWeight: '700' }}>
                                            <div style={{ width: '6px', height: '6px', background: 'var(--color-primary-red)', borderRadius: '50%' }} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between" style={{ marginTop: 'auto', flexWrap: 'wrap', gap: '20px' }}>
                                    <span style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', color: 'var(--color-gold)' }}>{part.price}</span>
                                    <a href={`mailto:vsspeedhq@gmail.com?subject=Strategic Consultation: ${part.title}`} style={{ width: isMobile ? '100%' : 'auto' }}>
                                        <button 
                                            className="bg-red"
                                            style={{
                                                width: '100%',
                                                padding: '16px 32px',
                                                borderRadius: '12px',
                                                fontWeight: '900',
                                                fontSize: '14px',
                                                boxShadow: '0 10px 30px rgba(255, 60, 60, 0.2)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}
                                        >
                                            REQUEST CONSULTATION
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="glass"
                    style={{ 
                        marginTop: isMobile ? '60px' : '120px', 
                        textAlign: 'center', 
                        padding: isMobile ? '40px 20px' : '80px', 
                        borderRadius: '32px', 
                        background: 'linear-gradient(135deg, rgba(252, 207, 49, 0.05) 0%, rgba(255, 60, 60, 0.05) 100%)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <h2 style={{ fontSize: isMobile ? '2.2rem' : '3rem', fontWeight: '900', color: 'white', marginBottom: '20px', letterSpacing: '-1px' }}>HAVE A CUSTOM VISION?</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '1rem' : '1.2rem', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                        Whether it's a one-off manifold, a titanium aero setup, or a full bespoke chassis build, our engineering team is ready for the challenge.
                    </p>
                    <a href="mailto:vsspeedhq@gmail.com">
                        <button 
                            style={{ 
                                width: isMobile ? '100%' : 'auto',
                                background: 'transparent',
                                border: '2px solid var(--color-gold)', 
                                color: 'var(--color-gold)', 
                                padding: '20px 50px', 
                                borderRadius: '16px', 
                                fontWeight: '900', 
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                textTransform: 'uppercase',
                                letterSpacing: '2px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--color-gold)';
                                e.target.style.color = 'black';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = 'var(--color-gold)';
                            }}
                        >
                            INITIATE PROJECT PROTOCOL
                        </button>
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default CustomFabrication;
