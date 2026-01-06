import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Zap } from 'lucide-react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            console.log('Newsletter signup:', email);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    const isMobile = windowWidth <= 640;
    const isTablet = windowWidth <= 1024;

    return (
        <section 
            style={{ 
                padding: isTablet ? '80px 0' : '120px 0',
                background: 'linear-gradient(180deg, transparent 0%, rgba(255,60,60,0.03) 100%)',
                borderTop: '1px solid var(--color-border-glass)'
            }}
        >
            <div className="container" style={{ padding: '0 1.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
                >
                    {/* Icon */}
                    <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ 
                            width: isMobile ? '60px' : '80px', 
                            height: isMobile ? '60px' : '80px', 
                            background: 'rgba(252, 207, 49, 0.1)', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid rgba(252, 207, 49, 0.2)'
                        }}>
                            <Zap size={isMobile ? 30 : 40} color="var(--color-gold)" />
                        </div>
                    </div>

                    <span className="punchline">Global Intelligence</span>
                    <h2 
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                            fontWeight: '900',
                            marginBottom: '15px',
                            letterSpacing: '-1.5px',
                            lineHeight: '1.1'
                        }}
                    >
                        JOIN THE <span className="text-red">SPEED</span> TRIBE
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: isMobile ? '0.95rem' : '1.1rem', marginBottom: '50px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 40px' }}>
                        Get first access to tactical part drops, mission-critical updates, and exclusive procurement deals.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                alignItems: 'stretch',
                                borderRadius: isMobile ? '20px' : '24px',
                                overflow: 'hidden',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid var(--color-border-glass)',
                                padding: isMobile ? '10px' : '8px',
                                gap: isMobile ? '10px' : '0'
                            }}
                        >
                             {!isMobile && (
                                <Mail 
                                    size={20} 
                                    style={{ 
                                        marginLeft: '20px',
                                        color: 'var(--color-gold)',
                                        opacity: 0.8,
                                        alignSelf: 'center'
                                    }}
                                />
                             )}
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="INTEL ADDRESS..."
                                required
                                disabled={isSubmitted}
                                style={{
                                    flex: 1,
                                    padding: isMobile ? '16px' : '18px 20px',
                                    background: 'transparent',
                                    color: 'var(--color-text-main)',
                                    fontSize: '14px',
                                    fontWeight: '800',
                                    border: 'none',
                                    outline: 'none',
                                    letterSpacing: '1px',
                                    textAlign: isMobile ? 'center' : 'left'
                                }}
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitted}
                                className="bg-red"
                                style={{
                                    padding: '18px 40px',
                                    borderRadius: isMobile ? '14px' : '18px',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 30px rgba(255, 60, 60, 0.3)',
                                    minWidth: isMobile ? '100%' : '180px'
                                }}
                            >
                                {isSubmitted ? (
                                    <>
                                        <Zap size={18} />
                                        SYNCED
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        SUBSCRIBE
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <p style={{ fontSize: '10px', color: '#444', marginTop: '25px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        SECURE TRANSMISSION SECURED. NO SPAM PROTOCOLS IN EFFECT.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;
