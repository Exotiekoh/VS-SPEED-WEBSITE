import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Truck, CreditCard, MapPin, Shield, Zap } from 'lucide-react';

const Hero = () => {
    // Video background enabled - no state needed for static carousel currently


    return (
        <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center', background: 'transparent' }}>
            {/* Background Video - YouTube Embed */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '300%', // Massive width to ensure coverage
                    height: '300%', // Massive height to ensure coverage
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none' // Prevent interaction
                }}>
                    <iframe
                        src="https://www.youtube.com/embed/wLd3dfix2B8?autoplay=1&mute=1&controls=0&loop=1&playlist=wLd3dfix2B8&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none'
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Hero Background Video"
                    />
                </div>
                
                {/* Gradient Overlay for Text Readability */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }} />
            </div>

            {/* GPU Intensive 3D Background - Now Global in App.jsx */}
            {/* The 3D background will sit on top of this via App.jsx's z-index or blended if needed */}

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="gpu-layer"
                        // Animation container
                    >
                        <span className="punchline" style={{ letterSpacing: '4px', marginBottom: '1.5rem', display: 'block' }}>
                            <Zap size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                            Next-Level Engineering
                        </span>

                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            lineHeight: '0.9',
                            marginBottom: '1.5rem',
                            fontWeight: '900',
                            fontFamily: 'var(--font-family-header)',
                            textShadow: '0 0 30px rgba(255, 60, 60, 0.3)'
                        }}>
                            VS SPEED <br />
                            <span className="text-red">GLOBAL</span>
                        </h1>

                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--color-text-muted)',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            lineHeight: '1.5'
                        }}>
                            Maximizing performance through cutting-edge tuning and premium components.
                            Built for Audi, BMW, and Mercedes enthusiasts who demand more.
                        </p>

                        <div className="flex justify-center gap-6 flex-wrap">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/products" className="gpu-layer cool-outline" style={{
                                    padding: '1.2rem 3rem',
                                    background: 'var(--gradient-red)',
                                    color: 'white',
                                    borderRadius: 'var(--border-radius-sm)',
                                    fontWeight: '800',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 10px 30px rgba(255, 60, 60, 0.4)',
                                    display: 'inline-block'
                                }}>
                                    Launch Shop
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/garage" className="glass gpu-layer" style={{
                                    padding: '1.2rem 3rem',
                                    color: 'white',
                                    borderRadius: 'var(--border-radius-sm)',
                                    fontWeight: '800',
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    display: 'inline-block'
                                }}>
                                    Configure Vehicle
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Feature Bar - Floating Glass Style */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '1200px',
                zIndex: 20
            }}>
                <div className="glass" style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--border-radius-md)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}>
                    <div className="flex items-center gap-3 text-gold">
                        <Truck size={20} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Shipping</span>
                    </div>
                    <div className="flex items-center gap-3 text-gold">
                        <Shield size={20} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Quality</span>
                    </div>
                    <div className="flex items-center gap-3 text-gold">
                        <Zap size={20} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>High Performance</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
