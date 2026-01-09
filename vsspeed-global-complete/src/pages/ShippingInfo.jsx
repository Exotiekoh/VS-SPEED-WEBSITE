import { Truck, Clock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ShippingInfo = () => {
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
                        <Truck size={40} className="text-red" />
                        <h1 style={{ fontSize: '2.5rem' }}>SHIPPING <span className="text-red">LOGISTICS</span></h1>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
                        <section className="glass-card" style={{ padding: '30px' }}>
                            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                                <Clock size={24} className="text-gold" />
                                <h3 style={{ color: 'white', margin: 0 }}>DELIVERY TIMELINES</h3>
                            </div>
                            <p>
                                At VS SPEED GLOBAL, we deal with high-demand, precision performance components.
                                <strong style={{ color: 'white' }}> Shipping is NOT instant, but it is SOON.</strong>
                            </p>
                            <p style={{ marginTop: '1rem' }}>
                                Most orders are processed within 48-72 hours. Transit times vary by location and customs,
                                but we strive to get your parts to you as rapidly as the logistics chain allows.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                                <Globe size={24} className="text-gold" />
                                <h3 style={{ color: 'white', margin: 0 }}>GLOBAL AVAILABILITY</h3>
                            </div>
                            <p>
                                We ship to enthusiasts worldwide. Whether you are in North America, Europe, or Asia,
                                we ensure your components are packed securely and shipped via reliable performance-tier carriers.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                                <Truck size={24} className="text-gold" />
                                <h3 style={{ color: 'white', margin: 0 }}>TRACKING & UPDATES</h3>
                            </div>
                            <p>
                                Once your order leaves our facility, you will receive a high-speed tracking number via email.
                                You can monitor your shipment's progress in real-time as it makes its way to your garage.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ShippingInfo;
