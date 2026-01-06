import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    MessageSquare, Users, Clock, ChevronRight, TrendingUp, 
    Zap, Radio, Target, ArrowUp, ArrowDown, Share2, 
    MoreHorizontal, Flame, Layout, Compass, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Forums = () => {
    const [filter, setFilter] = useState('hot');

    const communities = [
        { id: 'audi', name: 'Audi Tuning', icon: '🔵' },
        { id: 'bmw', name: 'BMW Performance', icon: '⚪' },
        { id: 'vw', name: 'VW / Audi Group', icon: '🔷' },
        { id: 'porsche', name: 'Porsche Elite', icon: '🏎️' },
    ];

    const feedPosts = [
        { 
            id: 1, 
            author: 'm3_vsspeed', 
            community: 'bmw', 
            title: 'Finally installed the Stage 2 kit on my F80. The torque is insane!', 
            content: 'Just finished the installation of the VSSPEED Stage 2 package. The pulls are absolutely clinical. Dyno results coming next week.',
            upvotes: 452, 
            comments: 42, 
            time: '2h ago',
            tag: 'Review'
        },
        { 
            id: 2, 
            author: 'audi_enthusiast', 
            community: 'audi', 
            title: 'S3 vs RS3: Is the carbon intake upgrade worth the premium?', 
            content: 'Comparing the airflow telemetrics between the two platforms. Seeing about 15% increase in throttle response on the RS3 specifically.',
            upvotes: 289, 
            comments: 112, 
            time: '5h ago',
            tag: 'Comparison'
        },
        { 
            id: 3, 
            author: 'track_demon', 
            community: 'porsche', 
            title: 'Track day at Mosport - Brakes held up perfectly', 
            content: 'Temperature management was key. Highly recommend the new cooling ducts.',
            upvotes: 156, 
            comments: 14, 
            time: '8h ago',
            tag: 'Track Intel'
        }
    ];

    return (
        <div style={{ background: '#050505', color: 'white', minHeight: '100vh' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr 300px', gap: '2rem', padding: '30px 1.5rem' }}>
                
                {/* Left Sidebar - Navigation */}
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <NavButton active icon={<Layout size={20} />} label="Home Feed" />
                        <NavButton icon={<Compass size={20} />} label="All Communities" />
                        <NavButton icon={<TrendingUp size={20} />} label="Popular" />
                        
                        <div style={{ marginTop: '2rem', marginBottom: '1rem', paddingLeft: '12px', fontSize: '10px', fontWeight: '900', color: '#444', letterSpacing: '2px' }}>COMMUNITIES</div>
                        {communities.map(c => (
                            <Link key={c.id} to={`/forums/${c.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', fontSize: '0.9rem', color: '#aaa', cursor: 'pointer' }} className="hover-red">
                                    <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
                                    {c.name}
                                </div>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Feed */}
                <main>
                    {/* Feed Filter */}
                    <div className="glass" style={{ padding: '10px 20px', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '20px', border: '1px solid #1a1a1a' }}>
                        <FilterItem active={filter === 'hot'} onClick={() => setFilter('hot')} icon={<Flame size={18} />} label="Hot" />
                        <FilterItem active={filter === 'new'} onClick={() => setFilter('new')} icon={<Zap size={18} />} label="New" />
                        <FilterItem active={filter === 'top'} onClick={() => setFilter('top')} icon={<Target size={18} />} label="Top" />
                        
                        <Link to="/forums/new" style={{ marginLeft: 'auto' }}>
                            <button className="bg-red" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '900' }}>
                                CREATE POST
                            </button>
                        </Link>
                    </div>

                    {/* Posts */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {feedPosts.map(post => (
                            <ForumPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </main>

                {/* Right Sidebar - Intel & Rules */}
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <Shield size={20} color="var(--color-gold)" />
                            <h3 style={{ fontSize: '0.9rem', fontWeight: '900' }}>VSS SECURE NETWORK</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                            The official performance coordination hub. Strictly for high-end automotive enthusiasts and technicians.
                        </p>
                        <div style={{ fontSize: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <div style={{ fontWeight: '900' }}>1.2M</div>
                                <div style={{ color: '#555', fontSize: '9px' }}>OPERATIVES</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: '900' }}>420</div>
                                <div style={{ color: '#555', fontSize: '9px' }}>ACTIVE NOW</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #1a1a1a' }}>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: '#444', marginBottom: '1rem' }}>TRENDING TOPICS</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <TrendingItem label="ECU Flash Protocols" count="2.1k posts" />
                            <TrendingItem label="Dry Carbon Curing" count="845 posts" />
                            <TrendingItem label="E85 Conversion kits" count="1.1k posts" />
                        </ul>
                    </div>
                </aside>

            </div>
        </div>
    );
};

const NavButton = ({ active, icon, label }) => (
    <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        padding: '12px 15px', 
        borderRadius: '8px', 
        background: active ? 'rgba(255,255,255,0.05)' : 'transparent',
        color: active ? 'white' : '#666',
        cursor: 'pointer',
        fontWeight: active ? '900' : '600',
        fontSize: '0.9rem'
    }}>
        {icon}
        {label}
    </div>
);

const FilterItem = ({ active, onClick, icon, label }) => (
    <div 
        onClick={onClick}
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            color: active ? 'var(--color-gold)' : '#666',
            fontWeight: active ? '900' : '600',
            fontSize: '0.9rem'
        }}
    >
        {icon}
        {label}
    </div>
);

const ForumPostCard = ({ post }) => (
    <div className="glass-card" style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden', border: '1px solid #121215', background: '#0a0a0c' }}>
        {/* Voting */}
        <div style={{ width: '45px', padding: '15px 0', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <ArrowUp size={20} className="hover-red" style={{ cursor: 'pointer', color: '#444' }} />
            <span style={{ fontSize: '12px', fontWeight: '900', color: 'white' }}>{post.upvotes}</span>
            <ArrowDown size={20} className="hover-red" style={{ cursor: 'pointer', color: '#444' }} />
        </div>

        {/* Post Main */}
        <div style={{ padding: '15px 20px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '11px', color: '#555' }}>
                <span style={{ color: 'white', fontWeight: '900' }}>r/{post.community}</span>
                <span>• Posted by u/{post.author}</span>
                <span>• {post.time}</span>
                <span style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>{post.tag}</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', lineHeight: '1.4' }}>{post.title}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{post.content}</p>

            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#555', fontWeight: '800' }}>
                    <MessageSquare size={16} /> {post.comments} Comments
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#555', fontWeight: '800' }}>
                    <Share2 size={16} /> Share
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#555', fontWeight: '800' }}>
                    <MoreHorizontal size={16} />
                </div>
            </div>
        </div>
    </div>
);

const TrendingItem = ({ label, count }) => (
    <li style={{ cursor: 'pointer' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'white' }}>#{label}</div>
        <div style={{ fontSize: '10px', color: '#444' }}>{count}</div>
    </li>
);

export default Forums;
