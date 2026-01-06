import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Zap, Globe } from 'lucide-react';
import logo from '../../assets/vsspeed-logo-transparent.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useCart } from '../../contexts/CartContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { totalItems } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            {/* Top Accent Bar */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--color-primary-red), var(--color-gold), var(--color-primary-red))' }} />
            {/* Top Info Bar - Integrated Glass */}
            <div className="glass" style={{ background: 'rgba(0,0,0,0.8)', color: '#aaa', fontSize: '11px', padding: '8px 0', borderBottom: '1px solid var(--color-border-glass)' }}>
                <div className="container flex justify-between items-center">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1"><Globe size={12} /> GLOBAL SHIPPING</span>
                        <span className="flex items-center gap-1"><Zap size={12} className="text-red" /> PERFORMANCE OPTIMIZED</span>
                    </div>
                    <div className="flex gap-6 font-bold text-gray-400">
                        <Link to="/shipping" className="hover-red">SHIPPING POLICY</Link>
                        <Link to="/disclaimer" className="hover-red">DISCLAIMER</Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation - Primary Glass */}
            <div className="glass" style={{ padding: '1.2rem 0' }}>
                <div className="container flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src={logo} alt="VSSPEED Global" style={{ height: '40px', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} className="group-hover:scale-110" />
                    </Link>

                    {/* Parts Focus Text (Desktop) */}
                    <div className="md-hidden flex items-center gap-4 ml-8 border-l border-white/10 pl-8">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-bold tracking-widest text-gold uppercase"
                            style={{ textShadow: '0 0 20px rgba(255,215,0,0.5)' }}
                        >
                            JDM & GERMAN PERFORMANCE
                        </motion.span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="md-hidden">
                        <ul className="flex gap-8" style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '1px' }}>
                            <li><Link to="/products" className="nav-link">SHOP</Link></li>
                            <li><Link to="/custom-fabrication" className="nav-link">CUSTOM FAB</Link></li>
                            <li><Link to="/garage" className="nav-link">GARAGE</Link></li>
                            <li><Link to="/forums" className="nav-link">FORUM</Link></li>
                            <li><Link to="/ai-tuner" className="nav-link text-gold">AI TUNER</Link></li>
                            <li><Link to="/ai-consultant" className="nav-link">AI CONSULTANT</Link></li>
                        </ul>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <div style={{ position: 'relative' }} className="md-hidden">
                            <input
                                type="text"
                                placeholder="Search components..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid var(--color-border-gold)',
                                    borderRadius: '20px',
                                    padding: '8px 40px 8px 15px',
                                    color: 'var(--color-text-main)',
                                    fontSize: '0.8rem',
                                    width: '200px',
                                    outline: 'none',
                                    boxShadow: '0 0 10px rgba(252, 207, 49, 0.1)'
                                }}
                            />
                            <Search size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold)', cursor: 'pointer' }} onClick={() => searchQuery.trim() && handleSearch({ key: 'Enter' })} />
                        </div>

                        <div className="flex gap-4">
                            <Link to="/account" className="hover-red" style={{ color: 'var(--color-text-main)', border: '1px solid var(--color-border-glass)', padding: '6px', borderRadius: '50%' }}><User size={20} /></Link>
                            <Link to="/cart" className="hover-red relative" style={{ color: 'var(--color-text-main)', border: '1px solid var(--color-border-red)', padding: '6px', borderRadius: '50%', boxShadow: '0 0 10px rgba(255, 60, 60, 0.2)' }}>
                                <ShoppingBag size={20} />
                                {totalItems > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        background: 'var(--color-primary-red)',
                                        fontSize: '8px',
                                        width: '14px',
                                        height: '14px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '900'
                                    }}>{totalItems}</span>
                                )}
                            </Link>
                        </div>

                        <button className="md-block hidden" style={{ color: 'var(--color-text-main)' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass"
                        style={{ position: 'absolute', width: '100%', top: '100%', left: 0, overflow: 'hidden' }}
                    >
                        <div className="container" style={{ padding: '2rem' }}>
                            <div style={{ position: 'relative', marginBottom: '20px' }} className="md-block hidden">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    style={{
                                        width: '100%',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid var(--color-border-gold)',
                                        borderRadius: '10px',
                                        padding: '12px 15px',
                                        color: '#fff',
                                        outline: 'none'
                                    }}
                                />
                                <Search size={20} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gold)' }} onClick={() => searchQuery.trim() && handleSearch({ key: 'Enter' })} />
                            </div>
                            <ul className="flex flex-col gap-6 font-bold uppercase">
                                <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Shop All</Link></li>
                                <li><Link to="/custom-fabrication" onClick={() => setIsMenuOpen(false)}>Custom Fabrication</Link></li>
                                <li><Link to="/garage" onClick={() => setIsMenuOpen(false)}>My Garage</Link></li>
                                <li><Link to="/forums" onClick={() => setIsMenuOpen(false)}>Community</Link></li>
                                <li><Link to="/ai-tuner" onClick={() => setIsMenuOpen(false)}>AI Tuning</Link></li>
                                <li><Link to="/ai-consultant" onClick={() => setIsMenuOpen(false)}>AI Consultant</Link></li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
