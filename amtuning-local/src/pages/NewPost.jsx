import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, Send, Save, XCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const NewPost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        forum: '',
        title: '',
        content: ''
    });

    const forums = [
        { id: 'audi', name: 'Audi' },
        { id: 'bmw', name: 'BMW' },
        { id: 'volkswagen', name: 'Volkswagen' },
        { id: 'mercedes', name: 'Mercedes-Benz' },
        { id: 'porsche', name: 'Porsche' },
        { id: 'product-reviews', name: 'Product Reviews' },
        { id: 'install-guides', name: 'Install Guides & DIY' },
        { id: 'tuning-software', name: 'Tuning & Software' },
        { id: 'general', name: 'General Discussion' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would POST to an API
        alert('Transmission successful! Intel uploaded to the network.');
        navigate('/forums');
    };

    return (
        <div style={{ background: 'transparent', minHeight: '100vh', color: 'white' }}>
            <div className="container" style={{ padding: '60px 1.5rem 100px', maxWidth: '900px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '40px' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/forums" className="hover-red">Forums</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>Initiate Intelligence Stream</span>
                </div>

                <div style={{ marginBottom: '50px' }}>
                    <span className="punchline">Drafting Protocol</span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginTop: '10px', letterSpacing: '-1px' }}>NEW <span className="text-red">BRIEFING</span></h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card"
                    style={{
                        padding: '60px'
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        {/* Forum Selection */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: 'var(--color-gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Target Sector *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    value={formData.forum}
                                    onChange={(e) => setFormData({ ...formData, forum: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '20px 24px',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        appearance: 'none',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        outline: 'none',
                                        transition: 'border-color 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                >
                                    <option value="" style={{ background: '#111' }}>Select Sector...</option>
                                    <optgroup label="Brand Sectors" style={{ background: '#111' }}>
                                        {forums.slice(0, 5).map(f => (
                                            <option key={f.id} value={f.id} style={{ background: '#111' }}>{f.name.toUpperCase()}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Topic Sectors" style={{ background: '#111' }}>
                                        {forums.slice(5).map(f => (
                                            <option key={f.id} value={f.id} style={{ background: '#111' }}>{f.name.toUpperCase()}</option>
                                        ))}
                                    </optgroup>
                                </select>
                                <ChevronDown size={20} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        {/* Thread Title */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: 'var(--color-gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Briefing Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter a descriptive identifier..."
                                required
                                style={{
                                    width: '100%',
                                    padding: '20px 24px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        {/* Content */}
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: 'var(--color-gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Intelligence Data *
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Input your performance metrics, reviews, or queries here..."
                                required
                                style={{
                                    width: '100%',
                                    minHeight: '350px',
                                    padding: '24px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontSize: '16px',
                                    lineHeight: '1.7',
                                    resize: 'vertical',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    outline: 'none',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        {/* Submit Row */}
                        <div className="flex justify-between items-center" style={{ paddingTop: '20px' }}>
                            <Link to="/forums" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
                                <XCircle size={18} /> ABORT DRAFT
                            </Link>
                            <div className="flex gap-4">
                                <button type="button" style={{
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontWeight: '900',
                                    fontSize: '14px',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <Save size={18} /> LOCAL CACHE
                                </button>
                                <button type="submit" className="bg-red" style={{ 
                                    padding: '16px 40px', 
                                    borderRadius: '12px', 
                                    fontWeight: '900', 
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 10px 30px rgba(255, 60, 60, 0.2)'
                                }}>
                                    <Send size={18} /> BROADCAST INTEL
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>

                {/* Guidelines */}
                <div style={{ marginTop: '50px', padding: '30px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
                    <div className="flex items-center gap-3 mb-20" style={{ marginBottom: '20px' }}>
                         <Info size={20} color="var(--color-gold)" />
                         <h3 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: 'white' }}>Transmission Guidelines</h3>
                    </div>
                    <ul style={{ fontSize: '13px', color: '#666', lineHeight: '2', fontWeight: '700' }}>
                        <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> SEARCH GLOBAL DATABASE BEFORE INITIATING NEW THREADS</li>
                        <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> INCLUDE VIN-SPECIFIC DATA WHERE APPLICABLE</li>
                        <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> MAINTAIN OPERATIONAL SECURITY - NO PERSONAL DATA</li>
                        <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> ATTACH SCHEMATICS OR MEDIA FOR CLARITY</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
