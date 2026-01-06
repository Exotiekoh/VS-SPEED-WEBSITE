import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, MessageSquare, Eye, Pin, Clock, User, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Forum = () => {
    const { forumId } = useParams();

    // Mock forum data based on ID
    const forumData = {
        audi: { name: 'Audi', icon: '🔵', description: 'Discuss all things Audi - from A3 to RS models' },
        bmw: { name: 'BMW', icon: '⚪', description: 'BMW enthusiasts unite - M-Power and beyond' },
        volkswagen: { name: 'Volkswagen', icon: '🔷', description: 'VW community - GTI, Golf R, and all VAG platforms' },
        mercedes: { name: 'Mercedes-Benz', icon: '⭐', description: 'Mercedes and AMG discussions' },
        porsche: { name: 'Porsche', icon: '🏎️', description: 'Porsche performance and ownership' },
        'product-reviews': { name: 'Product Reviews', icon: '⭐', description: 'Share your honest reviews of parts and products' },
        'install-guides': { name: 'Install Guides & DIY', icon: '🔧', description: 'Step-by-step installation guides and tips' },
        'tuning-software': { name: 'Tuning & Software', icon: '💻', description: 'ECU tuning, flash tools, and software discussions' },
        'general': { name: 'General Discussion', icon: '💬', description: 'Off-topic chat and community conversations' }
    };

    const forum = forumData[forumId] || { name: 'Unknown Forum', icon: '❓', description: '' };

    const threads = [
        { id: 1, title: 'CTS Turbo Intake - Honest 6 Month Review', author: 'GTI_Mike', avatar: '👤', replies: 23, views: 456, lastPost: '2 hours ago', isPinned: true, isHot: true },
        { id: 2, title: 'Best exhaust options under $1500?', author: 'SpeedDemon', avatar: '🏎️', replies: 45, views: 892, lastPost: '4 hours ago', isPinned: true },
        { id: 3, title: 'Stage 2 tune - Before and after dyno results', author: 'TunerPro', avatar: '📊', replies: 67, views: 1243, lastPost: '6 hours ago', isHot: true },
        { id: 4, title: 'Coilover recommendations for daily driving', author: 'DailyDriver', avatar: '🚗', replies: 34, views: 567, lastPost: '8 hours ago' },
        { id: 5, title: 'Intercooler upgrade worth it for stock turbo?', author: 'NewbieQ', avatar: '❓', replies: 28, views: 423, lastPost: '12 hours ago' },
        { id: 6, title: 'Oil catch can install write-up with photos', author: 'DIY_Master', avatar: '🔧', replies: 56, views: 987, lastPost: '1 day ago', isHot: true },
        { id: 7, title: 'Wheel fitment guide - What fits without rubbing', author: 'WheelGuru', avatar: '🛞', replies: 89, views: 2341, lastPost: '1 day ago' },
        { id: 8, title: 'Carbon fiber hood - Seibon vs competitors', author: 'CarbonFan', avatar: '⚡', replies: 19, views: 345, lastPost: '2 days ago' }
    ];

    return (
        <div style={{ background: 'transparent', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ padding: '60px 1.5rem 100px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '40px' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/forums" className="hover-red">Forums</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>{forum.name} Data Stream</span>
                </div>

                {/* Forum Header */}
                <div className="glass-card" style={{ 
                    marginBottom: '50px', 
                    padding: '40px', 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-primary-red)' }} />
                    <div style={{ fontSize: '64px', filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.1))' }}>{forum.icon}</div>
                    <div style={{ flex: 1 }}>
                        <div className="flex items-center gap-3 mb-2">
                             <Target size={16} color="var(--color-primary-red)" />
                             <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--color-primary-red)', letterSpacing: '2px', textTransform: 'uppercase' }}>Active Sector</span>
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1px' }}>{forum.name.toUpperCase()}</h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>{forum.description}</p>
                    </div>
                    <Link to="/forums/new">
                        <button className="bg-red" style={{ 
                            padding: '18px 36px', 
                            borderRadius: '12px', 
                            fontWeight: '900', 
                            fontSize: '14px', 
                            textTransform: 'uppercase', 
                            letterSpacing: '2px',
                            boxShadow: '0 10px 30px rgba(255, 60, 60, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                             <Zap size={18} /> NEW BRIEFING
                        </button>
                    </Link>
                </div>

                {/* Thread List Container */}
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                    {/* List Header */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 100px 100px 180px', 
                        gap: '20px', 
                        padding: '20px 30px', 
                        background: 'rgba(255,255,255,0.03)', 
                        borderBottom: '1px solid rgba(255,255,255,0.05)', 
                        fontSize: '11px', 
                        fontWeight: '900', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px', 
                        color: '#555' 
                    }}>
                        <span>Communication Thread</span>
                        <span style={{ textAlign: 'center' }}>Responses</span>
                        <span style={{ textAlign: 'center' }}>Telemetry</span>
                        <span style={{ textAlign: 'right' }}>Last Contact</span>
                    </div>

                    {/* Threads */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {threads.map((thread, index) => (
                            <Link key={thread.id} to={`/forums/thread/${thread.id}`} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 100px 100px 180px',
                                        gap: '20px',
                                        padding: '24px 30px',
                                        borderBottom: index < threads.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                                        position: 'relative',
                                        transition: 'all 0.2s',
                                        backgroundColor: thread.isPinned ? 'rgba(212, 175, 55, 0.02)' : 'transparent'
                                    }}
                                >
                                    {thread.isPinned && <div style={{ position: 'absolute', left: 0, top: 0, width: '3px', height: '100%', background: 'var(--color-gold)' }} />}
                                    
                                    <div className="flex items-center gap-6">
                                        <div style={{ 
                                            fontSize: '32px', 
                                            width: '56px', 
                                            height: '56px', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            background: 'rgba(255,255,255,0.02)', 
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            {thread.avatar}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3" style={{ marginBottom: '6px' }}>
                                                {thread.isPinned && <Pin size={14} color="var(--color-gold)" />}
                                                {thread.isHot && <Zap size={14} color="var(--color-primary-red)" />}
                                                <h4 style={{ fontSize: '17px', fontWeight: '800', color: 'white', letterSpacing: '0.5px' }}>{thread.title}</h4>
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#666', fontWeight: '700' }}>
                                                <User size={12} style={{ display: 'inline', marginRight: '6px', opacity: 0.5 }} />
                                                COMMUNICATION BY <span style={{ color: '#aaa' }}>{thread.author.toUpperCase()}</span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-center justify-center">
                                        <span style={{ fontSize: '18px', fontWeight: '900', color: 'white' }}>{thread.replies}</span>
                                        <span style={{ fontSize: '9px', color: '#555', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Intel Blocks</span>
                                    </div>
                                    
                                    <div className="flex flex-col items-center justify-center">
                                        <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--color-gold)' }}>{thread.views}</span>
                                        <span style={{ fontSize: '9px', color: '#555', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Interceptions</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-end gap-3" style={{ color: '#888', fontSize: '12px', fontWeight: '700' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ color: 'white', fontSize: '13px' }}>{thread.lastPost}</p>
                                            <p style={{ fontSize: '10px', color: '#444' }}>SIGNAL STABLE</p>
                                        </div>
                                        <Clock size={16} color="#333" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Tactical Pagination */}
                <div className="flex justify-center gap-4" style={{ marginTop: '50px' }}>
                    {[1, 2, 3, 4, 5].map(page => (
                        <button
                            key={page}
                            style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '10px',
                                border: page === 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                backgroundColor: page === 1 ? 'var(--color-gold)' : 'rgba(255,255,255,0.03)',
                                color: page === 1 ? 'black' : 'white',
                                fontWeight: '900',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { if(page !== 1) e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
                            onMouseOut={(e) => { if(page !== 1) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Forum;
