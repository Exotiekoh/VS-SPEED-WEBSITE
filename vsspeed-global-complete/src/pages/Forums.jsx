import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Clock, ChevronRight, TrendingUp, Zap, Radio, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Forums = () => {
    const brandForums = [
        { id: 'audi', name: 'Audi', icon: '🔵', threads: 156, posts: 1243, description: 'A3, S3, RS3, A4, S4, RS4, A5, S5, Q5 and more', color: '#ff3c3c' },
        { id: 'bmw', name: 'BMW', icon: '⚪', threads: 203, posts: 1876, description: 'M2, M3, M4, M5, 1-Series, 3-Series, 5-Series and more', color: '#2196f3' },
        { id: 'volkswagen', name: 'Volkswagen', icon: '🔷', threads: 189, posts: 1567, description: 'Golf GTI, Golf R, Jetta GLI, Tiguan, Arteon and more', color: '#4caf50' },
        { id: 'mercedes', name: 'Mercedes-Benz', icon: '⭐', threads: 87, posts: 654, description: 'AMG models, C-Class, E-Class, S-Class and more', color: '#ffffff' },
        { id: 'porsche', name: 'Porsche', icon: '🏎️', threads: 64, posts: 412, description: '911, Cayman, Boxster, Cayenne, Macan and more', color: '#ff3c3c' }
    ];

    const topicForums = [
        { id: 'product-reviews', name: 'Product Reviews', icon: '⭐', threads: 324, posts: 2156, description: 'Share your experience with parts and products' },
        { id: 'install-guides', name: 'Install Guides & DIY', icon: '🔧', threads: 178, posts: 892, description: 'Step-by-step installation guides and tips' },
        { id: 'tuning-software', name: 'Tuning & Software', icon: '💻', threads: 145, posts: 743, description: 'ECU tuning, flash tools, and software discussions' },
        { id: 'general', name: 'General Discussion', icon: '💬', threads: 267, posts: 1432, description: 'Off-topic chat and community conversations' }
    ];

    const recentThreads = [
        { id: 1, title: 'CTS Turbo Intake - 6 Month Review', author: 'GTI_Mike', forum: 'Volkswagen', replies: 23, time: '2h ago' },
        { id: 2, title: 'Best exhaust for B9 S4?', author: 'AudiEnthusiast', forum: 'Audi', replies: 45, time: '4h ago' },
        { id: 3, title: 'Stage 2 tune questions - Is it worth it?', author: 'TunerNewbie', forum: 'Tuning & Software', replies: 67, time: '6h ago' },
        { id: 4, title: 'F80 M3 downpipe install guide', author: 'BMWTech', forum: 'BMW', replies: 12, time: '8h ago' }
    ];

    return (
        <div style={{ background: 'var(--color-bg-deep)', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ padding: '60px 1.5rem 100px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '40px' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>Community Intelligence</span>
                </div>

                {/* Header */}
                <div className="flex justify-between items-end" style={{ marginBottom: '60px' }}>
                    <div>
                        <span className="punchline">Global Network</span>
                        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginTop: '0.5rem', letterSpacing: '-2px' }}>VSSPEED <span className="text-red">FORUMS</span></h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>Secure protocols for high-performance enthusiast coordination.</p>
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
                            gap: '10px'
                        }}>
                             <MessageSquare size={18} /> INITIATE POST
                        </button>
                    </Link>
                </div>

                {/* Stats Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                    {[
                        { label: 'Active Targets', value: '1,203', icon: <Target size={24} />, color: 'var(--color-primary-red)' },
                        { label: 'Intel Shared', value: '8,564', icon: <TrendingUp size={24} />, color: 'var(--color-gold)' },
                        { label: 'Operators', value: '3,456', icon: <Users size={24} />, color: '#4ade80' },
                        { label: 'Live Signal', value: '127', icon: <Radio size={24} />, color: '#42a5f5' }
                    ].map((stat, i) => (
                        <div key={i} className="glass" style={{ 
                            padding: '24px', 
                            borderRadius: '16px', 
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            backgroundColor: 'rgba(255,255,255,0.02)'
                        }}>
                            <div style={{ color: stat.color, padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>{stat.icon}</div>
                            <div>
                                <p style={{ fontSize: '28px', fontWeight: '900', color: 'white' }}>{stat.value}</p>
                                <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800' }}>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px' }}>
                    <div>
                        {/* Brand Forums */}
                        <div className="flex items-center gap-3" style={{ marginBottom: '30px' }}>
                            <Zap size={20} color="var(--color-gold)" />
                            <h2 style={{ fontSize: '22px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>PLATFORM COORDINATION</h2>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
                            {brandForums.map(forum => (
                                <Link key={forum.id} to={`/forums/${forum.id}`} style={{ textDecoration: 'none' }}>
                                    <div className="glass" style={{
                                        padding: '24px 30px',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '24px',
                                        transition: 'all 0.3s'
                                    }}
                                        onMouseOver={(e) => { 
                                            e.currentTarget.style.borderColor = forum.color; 
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.transform = 'translateX(10px)';
                                        }}
                                        onMouseOut={(e) => { 
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; 
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <div style={{ fontSize: '40px', width: '60px', textAlign: 'center', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }}>{forum.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '4px', letterSpacing: '1px' }}>{forum.name}</h3>
                                            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>{forum.description}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', display: 'flex', gap: '20px' }}>
                                            <div style={{ minWidth: '70px' }}>
                                                <p style={{ fontSize: '18px', fontWeight: '900', color: 'white' }}>{forum.threads}</p>
                                                <p style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', fontWeight: '800' }}>Threads</p>
                                            </div>
                                            <div style={{ minWidth: '70px' }}>
                                                <p style={{ fontSize: '18px', fontWeight: '900', color: 'var(--color-gold)' }}>{forum.posts}</p>
                                                <p style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', fontWeight: '800' }}>Posts</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} color="#333" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Topic Forums */}
                        <div className="flex items-center gap-3" style={{ marginBottom: '30px' }}>
                            <MessageSquare size={20} color="var(--color-gold)" />
                            <h2 style={{ fontSize: '22px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>TACTICAL TOPICS</h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            {topicForums.map(forum => (
                                <Link key={forum.id} to={`/forums/${forum.id}`} style={{ textDecoration: 'none' }}>
                                    <div className="glass" style={{
                                        padding: '30px',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        height: '100%',
                                        transition: 'all 0.3s'
                                    }}
                                        onMouseOver={(e) => { 
                                            e.currentTarget.style.borderColor = 'var(--color-gold)';
                                            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.03)';
                                        }}
                                        onMouseOut={(e) => { 
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <div style={{ fontSize: '32px', marginBottom: '15px' }}>{forum.icon}</div>
                                        <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px', color: 'white' }}>{forum.name}</h3>
                                        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>{forum.description}</p>
                                        <div style={{ display: 'flex', gap: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                            <span style={{ fontSize: '11px', fontWeight: '800', color: 'white' }}>{forum.threads} THREADS</span>
                                            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-gold)' }}>{forum.posts} POSTS</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="glass" style={{ padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '24px', color: 'white', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Clock size={16} color="var(--color-primary-red)" /> LIVE ACTIVITY
                            </h3>
                            <div className="flex flex-col gap-5">
                                {recentThreads.map(thread => (
                                    <Link key={thread.id} to={`/forums/thread/${thread.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="hover-red" style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <p style={{ fontSize: '14px', fontWeight: '800', marginBottom: '6px', color: 'white', lineHeight: '1.4' }}>{thread.title}</p>
                                            <div style={{ fontSize: '11px', color: '#666', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                <span>BY <strong style={{ color: '#aaa' }}>{thread.author}</strong></span>
                                                <span style={{ color: 'var(--color-primary-red)', fontWeight: '800' }}>{thread.forum}</span>
                                                <span>{thread.time}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '30px', borderRadius: '24px', border: '1px solid var(--color-gold)', backgroundColor: 'rgba(212, 175, 55, 0.03)' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '20px', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '2px' }}>CONDUCT PROTOCOLS</h3>
                            <ul style={{ fontSize: '12px', lineHeight: '2', fontWeight: '700', color: '#aaa' }}>
                                <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> EXECUTE SEARCH PRIOR TO POSTING</li>
                                <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> MAINTAIN HIGH-LEVEL RESPECT</li>
                                <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> NO COVERT ADVERTISING</li>
                                <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> PROTECT COMMUNITY INTELLIGENCE</li>
                                <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: 'var(--color-gold)' }}>•</span> SHARE PERFORMANCE TELEMETRY</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forums;
