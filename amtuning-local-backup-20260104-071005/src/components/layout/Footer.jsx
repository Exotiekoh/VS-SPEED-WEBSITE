import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/main.css';
import logo from '../../assets/vsspeed-logo-transparent.png';

const Footer = () => {
    return (
        <footer style={{ 
            backgroundColor: 'var(--color-bg-deep)', 
            color: 'var(--color-text-body)', 
            padding: '80px 0 30px 0', 
            marginTop: '80px', 
            fontSize: '14px',
            borderTop: '1px solid var(--color-border-glass)',
            position: 'relative'
        }}>
            {/* Top Accent Bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, var(--color-primary-red), var(--color-gold), var(--color-primary-red))' }} />

            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '50px', marginBottom: '60px' }}>

                    {/* Column 1: About */}
                    <div>
                        <img src={logo} alt="VSSPEED Global" style={{ height: '50px', marginBottom: '20px' }} />
                        <p style={{ lineHeight: '1.8', marginBottom: '24px', color: '#888' }}>
                            Welcome to VS Speed! The only source for any of your best & cheapest performance parts! We take pride in our quality and pricing so you as the customer can save your money with pure reassurance and confidence that what you get will improve power, fix your problems and give you peace of mind. Welcome to the family!
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="flex items-center justify-center hover-glow-red" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255, 60, 60, 0.1)', border: '1px solid rgba(255, 60, 60, 0.2)', borderRadius: '50%', transition: 'all 0.3s' }}>
                                <Facebook size={18} color="var(--color-primary-red)" />
                            </a>
                            <a href="#" className="flex items-center justify-center hover-glow-gold" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(252, 207, 49, 0.1)', border: '1px solid rgba(252, 207, 49, 0.2)', borderRadius: '50%', transition: 'all 0.3s' }}>
                                <Instagram size={18} color="var(--color-gold)" />
                            </a>
                            <a href="#" className="flex items-center justify-center hover-glow-red" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255, 60, 60, 0.1)', border: '1px solid rgba(255, 60, 60, 0.2)', borderRadius: '50%', transition: 'all 0.3s' }}>
                                <Youtube size={18} color="var(--color-primary-red)" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 style={{ color: 'var(--color-text-main)', marginBottom: '24px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Links</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/products" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">All Products</Link></li>
                            <li><Link to="/forums" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Community Forums</Link></li>
                            <li><Link to="/ai-assistant" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">AI Assistant</Link></li>
                            <li><Link to="/products" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">On Sale</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Information */}
                    <div>
                        <h4 style={{ color: 'var(--color-text-main)', marginBottom: '24px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Information</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/about" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">About Us</Link></li>
                            <li><Link to="/shipping" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Shipping Policy</Link></li>
                            <li><Link to="/returns-refunds-policy" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Returns & Refunds</Link></li>
                            <li><Link to="/disclaimer" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Safety Disclaimer</Link></li>
                            <li><Link to="/privacy-policy" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Mission Control */}
                    <div>
                        <h4 style={{ color: 'var(--color-text-main)', marginBottom: '24px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Mission Control</h4>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/garage" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">My Garage</Link></li>
                            <li><Link to="/account/payments" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Payment Control</Link></li>
                            <li><Link to="/part-hunter" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Part Hunter</Link></li>
                            <li><Link to="/custom-fabrication" style={{ color: '#888', transition: 'color 0.3s' }} className="hover-red">Custom Fab</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 style={{ color: 'var(--color-text-main)', marginBottom: '24px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Get In Touch</h4>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-center gap-4">
                                <Mail size={18} color="var(--color-primary-red)" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <a href="mailto:vsspeedsupport@gmail.com" style={{ color: 'var(--color-primary-red)' }}>vsspeedsupport@gmail.com</a>
                                    <span style={{ fontSize: '11px', color: '#666' }}>Support inquiries</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail size={18} color="#d4af37" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <a href="mailto:vsspeedhq@gmail.com" style={{ color: '#d4af37' }}>vsspeedhq@gmail.com</a>
                                    <span style={{ fontSize: '11px', color: '#666' }}>General inquiries</span>
                                </div>
                            </li>
                        </ul>
                        <p style={{ marginTop: '20px', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                            We respond to all inquiries within 24 hours!
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid #333', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <p style={{ color: '#666', fontSize: '13px' }}>&copy; 2024 VSSPEED Global (www.vsspeed.org). All Rights Reserved.</p>
                    <div className="flex gap-4">
                        <img src="https://placehold.co/50x30/333/fff?text=VISA" alt="Visa" style={{ height: '24px', opacity: 0.8 }} />
                        <img src="https://placehold.co/50x30/333/fff?text=MC" alt="Mastercard" style={{ height: '24px', opacity: 0.8 }} />
                        <img src="https://placehold.co/50x30/333/fff?text=AMEX" alt="Amex" style={{ height: '24px', opacity: 0.8 }} />
                        <img src="https://placehold.co/50x30/333/fff?text=PP" alt="PayPal" style={{ height: '24px', opacity: 0.8 }} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
