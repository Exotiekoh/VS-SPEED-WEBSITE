import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Disclaimer = () => {
    return (
        <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', color: 'white', padding: '120px 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{ padding: '60px', borderRadius: 'var(--border-radius-lg)' }}
                >
                    <div className="flex items-center gap-4" style={{ marginBottom: '30px' }}>
                        <Shield size={40} className="text-red" />
                        <h1 style={{ fontSize: '2.5rem' }}>LEGAL <span className="text-red">DISCLAIMER</span></h1>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
                        <section>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>1. PERFORMANCE USE ONLY</h3>
                            <p>
                                All performance parts and tuning software sold by VS SPEED GLOBAL are intended for <strong style={{ color: 'var(--color-gold)' }}>Off-Road Racing Use Only</strong>.
                                Installation of these parts may void your vehicle manufacturer's warranty and may not be legal for use on public roads in certain jurisdictions.
                            </p>
                        </section>

                        <section>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>2. LIABILITY LIMITATION</h3>
                            <p>
                                VS SPEED GLOBAL is not responsible for any damage to your vehicle, engine, or personal property resulting from the use or installation of parts purchased through this site.
                                High-performance tuning increases stress on mechanical components. Users assume all risk associated with these modifications.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--color-primary-red)', background: 'rgba(255, 60, 60, 0.05)' }}>
                            <div className="flex items-start gap-3">
                                <AlertTriangle size={24} className="text-red" style={{ flexShrink: 0 }} />
                                <p style={{ fontSize: '0.9rem', color: 'white' }}>
                                    <strong>WARNING:</strong> Professional installation is highly recommended for all performance components.
                                    Incorrect installation can lead to catastrophic engine failure or loss of vehicle control.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>3. TUNING RISKS</h3>
                            <p>
                                Software ECU/TCU remapping changes factory safety parameters. While we only provide verified tuning files,
                                the health and maintenance of the target vehicle are the sole responsibility of the owner.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Disclaimer;
