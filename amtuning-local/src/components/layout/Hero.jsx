import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Truck, CreditCard, MapPin, Shield, Zap } from 'lucide-react';

// Import showcase images
import bmwGarage from '../../assets/homepage_bmw_garage.jpg';
import bmwSunset from '../../assets/homepage_bmw_sunset.jpg';
import bmwTrack from '../../assets/homepage_bmw_track.jpg';
import audiR8 from '../../assets/homepage_audi_r8.jpg';
import bmwBlackGarage from '../../assets/homepage_bmw_black_garage.jpg';
import carbonFiber from '../../assets/homepage_carbon_fiber.jpg';
import jdmGarageBMW from '../../assets/jdm-garage-bmw.jpg';

const Hero = () => {
    // Rotating background images - changes every 20 seconds
    const backgroundImages = [
        bmwGarage,
        bmwSunset, 
        bmwTrack,
        audiR8,
        bmwBlackGarage,
        carbonFiber,
        jdmGarageBMW
    ];

    // Initialize with random image
    const [currentImageIndex, setCurrentImageIndex] = useState(() => 
        Math.floor(Math.random() * 7)
    );

    useEffect(() => {
        // Auto-rotate every 20 seconds
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % backgroundImages.length
            );
        }, 20000); // 20 seconds

        return () => clearInterval(interval);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center', background: 'transparent' }}>
            {/* Rotating Background Images */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: currentImageIndex === index ? 1 : 0,
                            transition: 'opacity 2s ease-in-out',
                            pointerEvents: 'none'
                        }}
                    />
                ))}
                
                {/* Gradient Overlay for Text Readability */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }} />
            </div>

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
