import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Users, ShoppingCart, TrendingUp, Search, 
    ArrowDownRight, ExternalLink, ShieldAlert, BarChart3, 
    Activity, Package, DollarSign
} from 'lucide-react';
import AutomationPanel from '../components/admin/AutomationPanel';


const AdminDashboard = () => {
    const { currentUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [dropshipSearch, setDropshipSearch] = useState('');
    const [foundSources, setFoundSources] = useState([]);
    const [isLoadingSource, setIsLoadingSource] = useState(false);

    // Security Check: Only Level 5 Admin
    useEffect(() => {
        if (!isAuthenticated || currentUser?.role !== 'admin') {
            navigate('/account');
        }
    }, [isAuthenticated, currentUser, navigate]);

    const stats = [
        { title: 'Total Revenue', value: '$124,592.00', icon: <DollarSign size={20} />, trend: '+12%', color: '#4caf50' },
        { title: 'Active Operatives', value: '42', icon: <Users size={20} />, trend: '+5', color: 'var(--color-gold)' },
        { title: 'Pending Deployments', value: '14', icon: <Package size={20} />, trend: '-2', color: 'var(--color-primary-red)' },
        { title: 'Traffic Burst', value: '1.2k', icon: <Activity size={20} />, trend: '+20%', color: '#2196f3' },
    ];

    const handleDropshipSearch = (e) => {
        e.preventDefault();
        if (!dropshipSearch) return;

        setIsLoadingSource(true);
        // Simulated AI Supplier Finder
        setTimeout(() => {
            const sources = [
                { name: 'Global Engine Supply (Alibaba)', price: '$420.00', quality: 'Tier 1', reliability: '98%', margin: '45%' },
                { name: 'Shenzhen TechFab', price: '$380.00', quality: 'Tier 2', reliability: '85%', margin: '55%' },
                { name: 'Taiwan Precision', price: '$510.00', quality: 'OE-Spec', reliability: '99%', margin: '30%' },
            ];
            setFoundSources(sources);
            setIsLoadingSource(false);
        }, 1500);
    };

    if (!isAuthenticated || currentUser?.role !== 'admin') return null;

    return (
        <div style={{ minHeight: '100vh', background: '#08080c', color: 'white', display: 'flex' }}>
            {/* Sidebar */}
            <aside style={{ width: '260px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--color-primary-red)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                        <ShieldAlert size={18} />
                    </div>
                    <span style={{ fontWeight: '900', letterSpacing: '2px' }}>VSS COMMAND</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18} />} label="Overview" />
                    <TabButton active={activeTab === 'automation'} onClick={() => setActiveTab('automation')} icon={<Activity size={18} />} label="Automation" />
                    <TabButton active={activeTab === 'dropship'} onClick={() => setActiveTab('dropship')} icon={<ShoppingCart size={18} />} label="DropShip Tool" />
                    <TabButton active={activeTab === 'intel'} onClick={() => setActiveTab('intel')} icon={<BarChart3 size={18} />} label="Live Intel" />
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '5px' }}>MISSION CONTROL</h1>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>STATUS: <span style={{ color: '#4caf50' }}>OPERATIONAL</span> | CLEARANCE: {currentUser.accessLevel}</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: '#888', fontSize: '0.8rem' }}>CURRENT SESSION:</span> <span style={{ fontWeight: '700' }}>{currentUser.name}</span>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div 
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                                {stats.map((stat, i) => (
                                    <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <div style={{ color: stat.color }}>{stat.icon}</div>
                                            <span style={{ fontSize: '0.8rem', color: stat.trend.includes('+') ? '#4caf50' : '#ff3c3c' }}>{stat.trend}</span>
                                        </div>
                                        <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px' }}>{stat.title}</h3>
                                        <span style={{ fontSize: '1.8rem', fontWeight: '900' }}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem' }}>RECENT OPERATIONS (SALES)</h2>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', color: '#dd1cb3ff', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <th style={{ padding: '1rem' }}>OPERATIVE</th>
                                            <th style={{ padding: '1rem' }}>STATION</th>
                                            <th style={{ padding: '1rem' }}>AMOUNT</th>
                                            <th style={{ padding: '1rem' }}>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <OperationRow name="John Doe" item="BMW E9X Widebody" amount="$3,500" status="DEPLOYED" />
                                        <OperationRow name="Jane Smith" item="Ferrari 488 Kit" amount="$15,500" status="PREPARING" />
                                        <OperationRow name="Mike Ross" item="APR Coil Pack" amount="$64.28" status="PENDING" />
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'automation' && (
                        <motion.div 
                            key="automation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <AutomationPanel />
                        </motion.div>
                    )}

                    {activeTab === 'dropship' && (
                        <motion.div 
                            key="dropship"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>DROPSHIP SOURCE FINDER</h2>
                            <form onSubmit={handleDropshipSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <input 
                                    type="text" 
                                    placeholder="Enter part name or competitor URL..."
                                    value={dropshipSearch}
                                    onChange={(e) => setDropshipSearch(e.target.value)}
                                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '12px', padding: '16px', color: 'white', outline: 'none' }}
                                />
                                <button type="submit" disabled={isLoadingSource} style={{ background: 'var(--color-primary-red)', padding: '0 30px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' }}>
                                    {isLoadingSource ? 'SCANNING...' : 'SCAN MARGINS'}
                                </button>
                            </form>

                            {isLoadingSource && (
                                <div style={{ textAlign: 'center', padding: '4rem' }}>
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                                        <Search size={48} color="var(--color-gold)" />
                                    </motion.div>
                                    <p style={{ marginTop: '1rem', color: '#28ffb7ff' }}>Accessing Global Manufacturing Databases...</p>
                                </div>
                            )}

                            {!isLoadingSource && foundSources.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {foundSources.map((source, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="glass"
                                            style={{ padding: '2rem', borderRadius: '20px', border: '1px solid #222' }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <h4 style={{ fontWeight: '800', color: 'var(--color-gold)' }}>{source.name}</h4>
                                                <ArrowDownRight size={20} color="#50ff55ff" />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>Supply Price:</span> <strong>{source.price}</strong></div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>Quality:</span> <strong>{source.quality}</strong></div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>Est. Margin:</span> <strong style={{ color: '#4caf50' }}>{source.margin}</strong></div>
                                            </div>
                                            <button style={{ width: '100%', marginTop: '1.5rem', background: '#333', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer' }}>
                                                CONTACT SUPPLIER
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 15px', 
            borderRadius: '10px', 
            background: active ? 'rgba(255,255,255,0.05)' : 'transparent',
            color: active ? 'white' : '#666',
            border: 'none',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
            fontWeight: active ? '800' : '500',
            transition: 'all 0.2s'
        }}
    >
        {icon}
        {label}
    </button>
);

const OperationRow = ({ name, item, amount, status }) => (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
        <td style={{ padding: '1.5rem' }}>{name}</td>
        <td style={{ padding: '1.5rem', color: '#888' }}>{item}</td>
        <td style={{ padding: '1.5rem', fontWeight: '700' }}>{amount}</td>
        <td style={{ padding: '1.5rem' }}>
            <span style={{ 
                fontSize: '10px', 
                fontWeight: '900', 
                padding: '4px 10px', 
                borderRadius: '4px', 
                background: status === 'DEPLOYED' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 60, 60, 0.1)',
                color: status === 'DEPLOYED' ? '#4caf50' : 'var(--color-primary-red)',
                border: `1px solid ${status === 'DEPLOYED' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 60, 60, 0.3)'}`
            }}>
                {status}
            </span>
        </td>
    </tr>
);

export default AdminDashboard;
