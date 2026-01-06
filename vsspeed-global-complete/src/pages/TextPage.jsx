import React from 'react';
import { motion } from 'framer-motion';

const TextPage = ({ title, content }) => {
    return (
        <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', color: 'white' }}>
            <div className="container" style={{ padding: '80px 1.5rem', maxWidth: '1000px' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass" 
                    style={{ 
                        padding: '60px', 
                        borderRadius: '32px', 
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <div style={{ marginBottom: '40px' }}>
                        <span className="punchline" style={{ marginBottom: '10px' }}>Official Protocol</span>
                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
                            fontWeight: '900', 
                            letterSpacing: '-2px',
                            lineHeight: '1'
                        }}>{title.toUpperCase()}</h1>
                        <div style={{ width: '80px', height: '4px', background: 'var(--color-primary-red)', marginTop: '20px', borderRadius: '2px' }} />
                    </div>
                    
                    <div style={{ 
                        lineHeight: '1.8', 
                        fontSize: '18px', 
                        color: 'var(--color-text-body)',
                        fontWeight: '500' 
                    }}>
                        {content || (
                            <div className="flex flex-col gap-6">
                                <p>This document contains the official operational protocols and regulatory guidelines for VSSPEED Global customers. Please review the following information carefully to ensure compliance with our performance standards.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p>For further tactical assistance or specific queries regarding these protocols, contact our command center directly via the established secure channels.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TextPage;
