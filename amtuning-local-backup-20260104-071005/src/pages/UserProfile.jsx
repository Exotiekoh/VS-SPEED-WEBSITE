import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Award, Calendar, MessageSquare, Share2, Settings, 
    MoreHorizontal, ArrowUp, ArrowDown, User as UserIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
    const { currentUser } = useAuth();
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState('posts');

    // For demo, we assume the user is the current user if no param, or just show current user
    const profileUser = currentUser || { 
        username: 'Guest', 
        reputation: 0, 
        joinDate: 'N/A', 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest' 
    };

    const mockPosts = [
        { id: 1, title: 'Check out my new E92 Widebody progress!', upvotes: 124, comments: 22, community: 'r/BMW', time: '2h' },
        { id: 2, title: 'Best fuel pump for S55 700whp build?', upvotes: 89, comments: 45, community: 'r/Performance', time: '1d' },
        { id: 3, title: 'VSSPEED Ferrari Kit Review - Absolute Fire', upvotes: 342, comments: 67, community: 'r/Exotic', time: '3d' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#0b0b0e', color: 'white' }}>
            {/* Header Banner */}
            <div style={{ height: '180px', background: 'linear-gradient(90deg, #1a1a1a 0%, #330000 100%)', width: '100%' }} />

            <div className="container" style={{ marginTop: '-40px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', paddingBottom: '4rem' }}>
                
                {/* Left Column - Main Feed */}
                <div>
                    {/* User Info Card */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '2rem' }}>
                        <div style={{ 
                            width: '120px', 
                            height: '120px', 
                            borderRadius: '50%', 
                            border: '5px solid #0b0b0e', 
                            background: '#222', 
                            overflow: 'hidden' 
                        }}>
                            <img src={profileUser.avatar} alt="avatar" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div style={{ paddingBottom: '10px' }}>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>u/{username || profileUser.username}</h1>
                            <div style={{ display: 'flex', gap: '15px', color: '#888', fontSize: '0.9rem' }}>
                                <span>{profileUser.reputation} Karma</span>
                                <span>{profileUser.joinDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div style={{ borderBottom: '1px solid #222', marginBottom: '2rem', display: 'flex', gap: '30px' }}>
                        <TabItem label="Posts" active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} />
                        <TabItem label="Comments" active={activeTab === 'comments'} onClick={() => setActiveTab('comments')} />
                        <TabItem label="About" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
                    </div>

                    {/* Posts List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {mockPosts.map(post => (
                            <RedditPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>

                {/* Right Column - Stats/Sidebar */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '40px' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #222' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '1.5rem', textTransform: 'uppercase', color: '#666' }}>User Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Award size={18} color="var(--color-gold)" />
                                <span style={{ fontSize: '0.9rem' }}>Premium Tuning Member</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={18} color="#888" />
                                <span style={{ fontSize: '0.9rem' }}>Member since {profileUser.joinDate}</span>
                            </div>
                        </div>
                        <button style={{ width: '100%', background: 'var(--color-primary-red)', padding: '12px', borderRadius: '30px', fontWeight: '900', marginTop: '1.5rem', cursor: 'pointer' }}>
                            FOLLOW
                        </button>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #222' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: '800', marginBottom: '1rem', color: '#666' }}>TROPHY CASE</h4>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div title="Alpha Tester" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserIcon size={20} /></div>
                            <div title="Top Contributor" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={20} color="var(--color-gold)" /></div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

const TabItem = ({ label, active, onClick }) => (
    <div 
        onClick={onClick}
        style={{ 
            paddingBottom: '12px', 
            borderBottom: active ? '2px solid white' : '2px solid transparent',
            color: active ? 'white' : '#666',
            fontWeight: active ? '800' : '500',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
        }}
    >
        {label}
    </div>
);

const RedditPost = ({ post }) => (
    <div className="glass-card" style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
        {/* Voting Sidebar */}
        <div style={{ width: '40px', padding: '10px 0', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <ArrowUp size={20} style={{ cursor: 'pointer', color: '#666' }} />
            <span style={{ fontSize: '12px', fontWeight: '900' }}>{post.upvotes}</span>
            <ArrowDown size={20} style={{ cursor: 'pointer', color: '#666' }} />
        </div>
        
        {/* Post Content */}
        <div style={{ padding: '12px 16px', flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>
                <span style={{ color: 'white', fontWeight: '800' }}>{post.community}</span> • Posted by u/someone • {post.time} ago
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '10px' }}>{post.title}</h3>
            
            <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#888' }}>
                    <MessageSquare size={14} /> {post.comments} Comments
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#888' }}>
                    <Share2 size={14} /> Share
                </div>
            </div>
        </div>
    </div>
);

export default UserProfile;
