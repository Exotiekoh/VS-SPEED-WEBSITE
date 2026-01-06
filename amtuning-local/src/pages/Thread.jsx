import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ThumbsUp, MessageSquare, Share2, Flag, Clock, Quote, User, ShieldCheck, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const Thread = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [replyText, setReplyText] = useState('');
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'GTI_Mike',
            avatar: '👤',
            role: 'Senior Member',
            joinDate: 'Jan 2019',
            postCount: 347,
            content: `Hey everyone! I wanted to share my honest review of the CTS Turbo Intake after running it for 6 months on my MK7 GTI.`,
            likes: 45,
            time: '2 hours ago',
            isOP: true
        },
        {
            id: 2,
            author: 'AudiEnthusiast',
            avatar: '🔵',
            role: 'Member',
            joinDate: 'Mar 2021',
            postCount: 89,
            content: `Great review! I've been considering this intake for my S3. Quick question - did you notice any difference in MPG? Some people say cold air intakes can actually hurt fuel economy.`,
            likes: 12,
            time: '1 hour ago'
        },
        {
            id: 3,
            author: 'GTI_Mike',
            avatar: '👤',
            role: 'Senior Member',
            joinDate: 'Jan 2019',
            postCount: 348,
            content: `@AudiEnthusiast Good question! I haven't noticed any significant change in MPG. Maybe 0.5 mpg difference at most, which could just be driving style variation. If anything, the improved airflow should help efficiency slightly.`,
            likes: 8,
            time: '45 mins ago',
            isOP: true
        },
        {
            id: 4,
            author: 'TunerPro',
            avatar: '📊',
            role: 'Moderator',
            joinDate: 'Nov 2018',
            postCount: 1243,
            content: `Nice write-up! Just want to add that the CTS intake pairs really well with a tune. If you're planning to go Stage 1 or 2, this intake is basically a requirement. The stock airbox becomes a restriction pretty quickly with more boost.

Also, make sure you're cleaning/oiling the filter every 10-15k miles for optimal performance.`,
            likes: 34,
            time: '30 mins ago',
            isMod: true
        }
    ]);

    const handleSubmitReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newPost = {
            id: posts.length + 1,
            author: 'Guest Operator',
            avatar: '😎',
            role: 'New Member',
            joinDate: 'Dec 2024',
            postCount: 1,
            content: replyText,
            likes: 0,
            time: 'Just now'
        };

        setPosts([...posts, newPost]);
        setReplyText('');
    };

    const isMobile = windowWidth <= 850;

    return (
        <div style={{ background: 'transparent', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ padding: '40px 1.5rem 100px' }}>
                {/* Breadcrumb */}
                <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '40px' }}>
                    <Link to="/" className="hover-red">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/forums" className="hover-red">Forums</Link>
                    <ChevronRight size={14} />
                    <Link to="/forums/volkswagen" className="hover-red">Volkswagen</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: 'var(--color-gold)' }}>Intelligence Stream</span>
                </div>

                {/* Thread Title */}
                <div style={{ marginBottom: '50px' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <PenTool size={16} color="var(--color-gold)" />
                        <span style={{ fontSize: '11px', fontWeight: '900', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase' }}>Mission Report</span>
                    </div>
                    <h1 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1.2' }}>
                        CTS TURBO INTAKE - <span className="text-red">6 MONTH REVIEW</span>
                    </h1>
                </div>

                {/* Posts */}
                <div className="flex flex-col gap-8" style={{ marginBottom: '60px' }}>
                    {posts.map((post) => (
                        <div key={post.id} className="glass-card" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', 
                            border: `1px solid ${post.isMod ? 'rgba(255, 60, 60, 0.2)' : post.isOP ? 'rgba(252, 207, 49, 0.2)' : 'rgba(255,255,255,0.05)'}`, 
                            borderRadius: '24px', 
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            {/* Author Sidebar */}
                            <div style={{ 
                                background: post.isMod ? 'rgba(255, 60, 60, 0.03)' : post.isOP ? 'rgba(252, 207, 49, 0.03)' : 'rgba(255,255,255,0.02)', 
                                padding: isMobile ? '20px' : '40px 24px', 
                                textAlign: isMobile ? 'left' : 'center', 
                                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)',
                                borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                display: isMobile ? 'flex' : 'block',
                                alignItems: 'center',
                                gap: '20px'
                            }}>
                                <div style={{ 
                                    fontSize: '32px', 
                                    marginBottom: isMobile ? '0' : '15px', 
                                    width: isMobile ? '50px' : '70px',
                                    height: isMobile ? '50px' : '70px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    flexShrink: 0
                                }}>{post.avatar}</div>
                                
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '4px', color: 'white' }}>{post.author.toUpperCase()}</h4>
                                    
                                    {post.isMod ? (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-primary-red)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', marginBottom: isMobile ? '0' : '12px' }}>
                                            <ShieldCheck size={10} /> MOD
                                        </div>
                                    ) : post.isOP ? (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-gold)', color: 'black', padding: '4px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', marginBottom: isMobile ? '0' : '12px' }}>
                                            <PenTool size={10} /> OP
                                        </div>
                                    ) : (
                                        <p style={{ fontSize: '10px', color: '#666', fontWeight: '800', textTransform: 'uppercase', marginBottom: isMobile ? '0' : '12px' }}>{post.role}</p>
                                    )}

                                    {!isMobile && (
                                        <div style={{ fontSize: '10px', color: '#444', lineHeight: '1.8', fontWeight: '800' }}>
                                            <p>JOINED: {post.joinDate.toUpperCase()}</p>
                                            <p>INTEL: {post.postCount}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Post Content */}
                            <div style={{ padding: isMobile ? '24px' : '40px' }}>
                                <div className="flex justify-between items-center" style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="flex items-center gap-2" style={{ fontSize: '11px', color: '#666', fontWeight: '900', textTransform: 'uppercase' }}>
                                        <Clock size={12} color="var(--color-primary-red)" />
                                        {post.time}
                                    </div>
                                    <span style={{ fontSize: '10px', color: '#333', fontWeight: '900' }}>#{post.id}</span>
                                </div>

                                <div style={{ fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: '1.7', color: '#bbb', whiteSpace: 'pre-line', marginBottom: '30px' }}>
                                    {post.content}
                                </div>

                                {/* Post Actions */}
                                <div className="flex justify-between items-center" style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="flex gap-4 md:gap-6">
                                        <button className="flex items-center gap-2 hover-red" style={{ fontSize: '11px', color: '#555', fontWeight: '900', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                            <ThumbsUp size={14} color={post.likes > 0 ? 'var(--color-gold)' : '#333'} /> {post.likes}
                                        </button>
                                        <button className="flex items-center gap-2 hover-red" style={{ fontSize: '11px', color: '#555', fontWeight: '900', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                            <Quote size={14} /> QUOTE
                                        </button>
                                        {!isMobile && (
                                            <button className="flex items-center gap-2 hover-red" style={{ fontSize: '11px', color: '#555', fontWeight: '900', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                                <Share2 size={14} /> SHARE
                                            </button>
                                        )}
                                    </div>
                                    <button className="flex items-center gap-2" style={{ fontSize: '10px', color: '#333', fontWeight: '900', background: 'transparent', border: 'none' }}>
                                        <Flag size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reply Form */}
                <div className="glass-card" style={{ padding: isMobile ? '30px' : '50px', background: 'rgba(252, 207, 49, 0.02)', border: '1px solid rgba(252, 207, 49, 0.1)' }}>
                    <div className="flex items-center gap-4 mb-24" style={{ marginBottom: '24px' }}>
                         <div style={{ padding: '10px', background: 'var(--color-gold)', borderRadius: '10px' }}>
                              <MessageSquare size={20} color="black" />
                         </div>
                         <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'white' }}>REPLY TO INTEL</h3>
                    </div>
                    
                    <form onSubmit={handleSubmitReply}>
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your transmission..."
                            style={{
                                width: '100%',
                                minHeight: '150px',
                                padding: '20px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                color: 'white',
                                outline: 'none',
                                marginBottom: '20px'
                            }}
                        />
                        <div className="flex justify-between items-center">
                            <p style={{ fontSize: '10px', color: '#444', fontWeight: '800' }}>ENCRYPTED CHANNEL V.2.1</p>
                            <button type="submit" className="bg-red" style={{ 
                                padding: '14px 32px', 
                                borderRadius: '10px', 
                                fontWeight: '900', 
                                fontSize: '14px' 
                            }}>
                                SEND TRANSMISSION
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Thread;
