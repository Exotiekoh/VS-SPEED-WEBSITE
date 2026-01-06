import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, User, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsScanning(true);

        // Simulate deep security scan
        setTimeout(() => {
            const result = login(username, password);
            if (result.success && result.role === 'admin') {
                navigate('/admin');
            } else {
                setError(result.role !== 'admin' && result.success ? 'UNAUTHORIZED: LEVEL 5 CLEARANCE REQUIRED' : result.error);
                setIsScanning(false);
            }
        }, 2000);
    };

    return (
        <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Background Effects */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #220000 0%, #000 100%)', opacity: 0.5 }} />
            <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ width: '450px', zIndex: 10 }}
            >
                <div className="glass cool-outline" style={{ padding: '3rem', borderRadius: '24px', border: '1px solid #330000', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '20px', background: 'rgba(255, 60, 60, 0.05)', borderRadius: '50%', marginBottom: '2rem', border: '1px solid rgba(255, 60, 60, 0.2)' }}>
                        <ShieldAlert size={40} color="var(--color-primary-red)" />
                    </div>

                    <h1 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '4px', marginBottom: '10px' }}>COMMAND LOGIN</h1>
                    <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3rem' }}>VSSPEED GLOBAL ADMINISTRATION</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                            <input 
                                type="text"
                                placeholder="OPERATIVE ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid #222', padding: '15px 15px 15px 45px', borderRadius: '12px', color: 'white', outline: 'none', transition: 'border 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-red)'}
                                onBlur={(e) => e.target.style.borderColor = '#222'}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                            <input 
                                type="password"
                                placeholder="ACCESS KEY"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid #222', padding: '15px 15px 15px 45px', borderRadius: '12px', color: 'white', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-red)'}
                                onBlur={(e) => e.target.style.borderColor = '#222'}
                            />
                        </div>

                        {error && <div style={{ color: 'var(--color-primary-red)', fontSize: '0.8rem', fontWeight: '800' }}>{error}</div>}

                        <button 
                            disabled={isScanning}
                            style={{ 
                                width: '100%', 
                                background: 'var(--color-primary-red)', 
                                padding: '18px', 
                                borderRadius: '12px', 
                                color: 'white', 
                                fontWeight: '900', 
                                letterSpacing: '2px', 
                                cursor: 'pointer',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            {isScanning ? 'DECRYPTING...' : 'AUTHORIZE'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div style={{ marginTop: '3rem' }}>
                        <Link to="/" style={{ color: '#444', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} className="hover-red">
                            <Home size={14} /> ABORT TO PUBLIC SITE
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Scanning Line Animation */}
            {isScanning && (
                <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'var(--color-primary-red)', boxShadow: '0 0 20px var(--color-primary-red)', zIndex: 100 }}
                />
            )}
        </div>
    );
};

export default AdminLogin;
