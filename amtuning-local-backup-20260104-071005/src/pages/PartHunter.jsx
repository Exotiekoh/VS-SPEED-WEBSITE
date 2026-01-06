import React, { useState } from 'react';
import { Search, ExternalLink, ShoppingCart, Globe, Zap, AlertTriangle, Target, Radio, Cpu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVehicle } from '../contexts/VehicleContext';
import { Link } from 'react-router-dom';

const PartHunter = () => {
    const { vehicle } = useVehicle();
    const [query, setQuery] = useState('');
    const [isHunting, setIsHunting] = useState(false);
    const [results, setResults] = useState(null);
    const [mode, setMode] = useState('general'); // 'general' or 'n5x'

    const n5xPresets = [
        "Index 12 Injectors", "Charge Pipe Upgrade", "Catless Downpipe", "Twin Turbo Upgrade", "HPFP Upgrade"
    ];

    const runHunt = (searchQuery) => {
        setIsHunting(true);
        setResults(null);
        // Simulate AI "Hunting" process
        setTimeout(() => {
            const contextString = mode === 'n5x' ? "BMW N54 N55" : (vehicle.year && vehicle.make ? `${vehicle.year} ${vehicle.make} ${vehicle.model || ''}` : '');
            const fullQuery = `${contextString} ${searchQuery}`.trim();
            const encodedQuery = encodeURIComponent(fullQuery);

            setResults([
                {
                    platform: "AliExpress",
                    url: `https://www.aliexpress.com/wholesale?SearchText=${encodedQuery}`,
                    icon: <ShoppingCart size={20} color="#ff9800" />,
                    desc: "Direct from global manufacturers. Best for bulk & unbranded components."
                },
                {
                    platform: "Amazon",
                    url: `https://www.amazon.com/s?k=${encodedQuery}`,
                    icon: <ShoppingCart size={20} color="#ffcc00" />,
                    desc: "Fast delivery & comprehensive buyer protection for standard parts."
                },
                {
                    platform: "eBay Motors",
                    url: `https://www.ebay.com/sch/i.html?_nkw=${encodedQuery}`,
                    icon: <Globe size={20} color="#42a5f5" />,
                    desc: "New, used, and rare salvaged finds from around the world."
                },
                {
                    platform: "Alibaba",
                    url: `https://www.alibaba.com/trade/search?SearchText=${encodedQuery}`,
                    icon: <Globe size={20} color="#ff5722" />,
                    desc: "Wholesale factory-direct sourcing for custom builds and volume."
                }
            ]);
            setIsHunting(false);
        }, 2200);
    };

    const handleHunt = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        runHunt(query);
    };

    return (
        <div style={{ padding: '60px 0 120px', minHeight: '100vh', background: 'var(--color-bg-deep)', color: 'var(--color-text-main)' }}>
            <div className="container">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    
                    {/* Breadcrumb */}
                    <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '40px' }}>
                        <Link to="/" className="hover-red">Home</Link>
                        <ChevronRight size={14} />
                        <span style={{ color: 'var(--color-gold)' }}>Intelligence Network</span>
                    </div>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <span className="punchline" style={{ display: 'inline-block', marginBottom: '10px' }}>Global Tracking</span>
                            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-2px', lineHeight: '1' }}>
                                PART <span className="text-red">HUNTER</span> <span style={{ color: 'var(--color-gold)' }}>XI</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                                Advanced cross-platform component tracking. <span className="text-red">Locate mission-critical parts across the dark web of global markets.</span>
                            </p>
                        </motion.div>

                        {/* Mode Toggle */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px', flexWrap: 'wrap' }}>
                            <button 
                                onClick={() => setMode('general')}
                                style={{ 
                                    padding: '12px 24px', 
                                    borderRadius: '12px', 
                                    fontWeight: '900', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '1px',
                                    fontSize: '11px',
                                    transition: 'all 0.3s',
                                    backgroundColor: mode === 'general' ? 'var(--color-primary-red)' : 'rgba(255,255,255,0.05)',
                                    color: mode === 'general' ? 'white' : '#888',
                                    border: mode === 'general' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: mode === 'general' ? '0 10px 20px rgba(255, 60, 60, 0.2)' : 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                STRATEGIC HUNTER
                            </button>
                            <button 
                                onClick={() => setMode('n5x')}
                                style={{ 
                                    padding: '12px 24px', 
                                    borderRadius: '12px', 
                                    fontWeight: '900', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '1px',
                                    fontSize: '11px',
                                    transition: 'all 0.3s',
                                    backgroundColor: mode === 'n5x' ? 'var(--color-gold)' : 'rgba(255,255,255,0.05)',
                                    color: mode === 'n5x' ? 'black' : '#888',
                                    border: mode === 'n5x' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: mode === 'n5x' ? '0 10px 20px rgba(252, 207, 49, 0.2)' : 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                N5X SPECIALIST
                            </button>
                        </div>
                    </div>

                    {/* Active Target Banner */}
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={mode + (vehicle.make || '')}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ 
                                textAlign: 'center', 
                                marginBottom: '40px' 
                            }}
                        >
                            <div className="glass" style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '10px',
                                padding: '12px 30px', 
                                borderRadius: '12px', 
                                color: mode === 'n5x' ? 'var(--color-gold)' : 'var(--color-primary-red)', 
                                fontSize: '13px', 
                                fontWeight: '900',
                                fontFamily: 'monospace',
                                letterSpacing: '2px',
                                border: `1px solid ${mode === 'n5x' ? 'rgba(252, 207, 49, 0.2)' : 'rgba(255, 60, 60, 0.2)'}`
                            }}>
                                <Target size={18} />
                                {mode === 'n5x' ? "TARGET: BMW N54/N55 PLATFORM" : 
                                 (vehicle.make ? `TARGET: ${vehicle.year || ''} ${vehicle.make} ${vehicle.model || ''}`.toUpperCase() : "TARGET: GLOBAL CATALOG")}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Search Interface */}
                    <div className="glass" style={{ 
                        padding: 'clamp(20px, 5vw, 50px)', 
                        borderRadius: '32px', 
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.01)'
                    }}>
                        {/* Scanning Effect Overlay */}
                        {isHunting && (
                            <motion.div 
                                initial={{ top: '-100%' }}
                                animate={{ top: '100%' }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                style={{ 
                                    position: 'absolute', 
                                    left: 0, 
                                    right: 0, 
                                    height: '3px', 
                                    background: mode === 'n5x' ? 'var(--color-gold)' : 'var(--color-primary-red)', 
                                    zIndex: 2,
                                    boxShadow: `0 0 20px ${mode === 'n5x' ? 'var(--color-gold)' : 'var(--color-primary-red)'}`
                                }}
                            />
                        )}
                        
                        {/* N5X Presets */}
                        {mode === 'n5x' && (
                            <div style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                                {n5xPresets.map(preset => (
                                    <button
                                        key={preset}
                                        onClick={() => { setQuery(preset); runHunt(preset); }}
                                        style={{ 
                                            padding: '8px 16px', 
                                            backgroundColor: 'rgba(255,255,255,0.03)', 
                                            border: '1px solid rgba(252, 207, 49, 0.2)', 
                                            color: 'rgba(252, 207, 49, 0.8)', 
                                            borderRadius: '8px', 
                                            fontSize: '11px', 
                                            fontWeight: '800',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(252, 207, 49, 0.1)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'rgba(252, 207, 49, 0.8)'; }}
                                    >
                                        {preset}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        <form onSubmit={handleHunt} style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <input 
                                    type="text"
                                    placeholder={
                                        mode === 'n5x' 
                                        ? "ENTER N5X COMPONENT IDENTIFIER..." 
                                        : (vehicle.make ? `LOCATE ${vehicle.make} COMPONENTS...` : "TRANSMIT PART DESCRIPTION...")
                                    }
                                    style={{ 
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        padding: '24px',
                                        fontSize: '1.2rem',
                                        color: 'white',
                                        fontWeight: '700',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = mode === 'n5x' ? 'var(--color-gold)' : 'var(--color-primary-red)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                                <div style={{ position: 'absolute', right: '25px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3, color: 'var(--color-gold)' }}>
                                    {mode === 'n5x' ? <Cpu size={28} /> : <Radio size={28} />}
                                </div>
                            </div>
                            <button 
                                type="submit"
                                disabled={isHunting || !query.trim()}
                                className={mode === 'n5x' ? 'bg-gold' : 'bg-red'}
                                style={{ 
                                    backgroundColor: mode === 'n5x' ? 'var(--color-gold)' : 'var(--color-primary-red)',
                                    color: mode === 'n5x' ? 'black' : 'white',
                                    fontWeight: '900',
                                    padding: '24px',
                                    borderRadius: '16px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    opacity: isHunting || !query.trim() ? 0.5 : 1,
                                    boxShadow: mode === 'n5x' ? '0 10px 40px rgba(252, 207, 49, 0.3)' : '0 10px 40px rgba(255, 60, 60, 0.3)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {isHunting ? "SCANNING GLOBAL ARCHIVES..." : "INITIATE SEARCH PROTOCOL"}
                                {!isHunting && <Search size={22} />}
                            </button>
                        </form>
                    </div>

                    {/* Results Grid */}
                    <AnimatePresence>
                        {results && (
                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ 
                                    marginTop: '80px', 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                                    gap: '24px' 
                                }}
                            >
                                {results.map((res, idx) => (
                                    <motion.a 
                                        key={idx} 
                                        href={res.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className="glass glass-hover" style={{ 
                                            padding: '40px', 
                                            borderRadius: '24px', 
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor: 'rgba(255,255,255,0.01)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                        {res.icon}
                                                    </div>
                                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'white' }}>{res.platform}</h3>
                                                </div>
                                                <ExternalLink size={18} color="#666" />
                                            </div>
                                            <p style={{ fontSize: '1rem', color: '#888', lineHeight: '1.7', marginBottom: '30px', flex: 1, fontWeight: '500' }}>{res.desc}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '10px', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                                <span style={{ color: '#444' }}>SIGNAL ACQUIRED</span>
                                                <span style={{ color: '#4ade80' }}>SECURE ACCESS</span>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Protocol Disclaimer */}
                    <div className="glass" style={{ 
                        marginTop: '100px', 
                        padding: '40px', 
                        background: 'rgba(255, 60, 60, 0.02)', 
                        border: '1px solid rgba(255, 60, 60, 0.1)', 
                        borderRadius: '24px', 
                        display: 'flex', 
                        gap: '25px', 
                        alignItems: 'flex-start' 
                    }}>
                        <AlertTriangle size={32} color="var(--color-primary-red)" style={{ flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: '14px', fontWeight: '900', color: 'var(--color-primary-red)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Operational Security Notice</p>
                            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', fontWeight: '600' }}>
                                VSSPEED acts as an intelligence aggregator for global markets. Procurement from 3rd party vendors is subject to their independent shipping logistics, duties, and return protocols. Conduct proper reconnaissance (merchant feedback review) before final acquisition.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PartHunter;

