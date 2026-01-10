import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Key, ChevronRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  signInWithGoogle, 
  signInWithMicrosoft, 
  signInWithGithub, 
  signInWithApple 
} from '../services/authProviders';
import cookieManager from '../services/cookieManager';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [oauthLoading, setOauthLoading] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const result = login(username, password);
        
        if (result.success) {
            navigate('/garage');
        } else {
            setError(result.error);
        }
    };

    const handleOAuthLogin = async (provider, loginFn) => {
        setOauthLoading(provider);
        setError('');

        try {
            const result = await loginFn();
            
            if (result.success) {
                // Migrate temp data if exists
                if (result.migrationData) {
                    console.log('✅ Migrated temp data to account');
                }
                navigate('/garage');
            } else {
                setError(result.error || 'OAuth login failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setOauthLoading(null);
        }
    };

    const oauthProviders = [
        { name: 'Google', color: '#4285F4', fn: signInWithGoogle },
        { name: 'Microsoft', color: '#00A4EF', fn: signInWithMicrosoft },
        { name: 'GitHub', color: '#333', fn: signInWithGithub },
        { name: 'Apple', color: '#000', fn: signInWithApple }
    ];

    return (
        <div style={{ 
            minHeight: '80vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'transparent',
            padding: '20px'
        }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{ 
                    width: '100%', 
                    maxWidth: '450px', 
                    padding: '40px', 
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 60, 60, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Top Bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--color-primary-red), var(--color-gold))' }} />

                <div className="text-center mb-8">
                    <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        background: 'rgba(255, 60, 60, 0.1)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        border: '1px solid rgba(255, 60, 60, 0.3)'
                    }}>
                        <Lock size={28} color="var(--color-primary-red)" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1px' }}>SECURE LOGIN</h1>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>ENTER CREDENTIALS TO ACCESS MISSION CONTROL</p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ 
                            background: 'rgba(255, 60, 60, 0.15)', 
                            border: '1px solid rgba(255, 60, 60, 0.3)', 
                            padding: '12px', 
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#ffaaaa',
                            fontSize: '0.9rem'
                        }}
                    >
                        <AlertTriangle size={16} />
                        {error}
                    </motion.div>
                )}

                {/* OAuth Providers */}
                <div style={{ marginBottom: '24px' }}>
                    <p style={{ textAlign: 'center', color: '#666', fontSize: '0.85rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Quick Sign In
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {oauthProviders.map(provider => (
                            <motion.button
                                key={provider.name}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOAuthLogin(provider.name, provider.fn)}
                                disabled={oauthLoading !== null}
                                style={{
                                    padding: '12px',
                                    background: oauthLoading === provider.name ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.3)',
                                    border: `1px solid ${provider.color}40`,
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    cursor: oauthLoading ? 'not-allowed' : 'pointer',
                                    opacity: oauthLoading && oauthLoading !== provider.name ? 0.5 : 1,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {oauthLoading === provider.name ? '...' : provider.name}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase' }}>Or</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                        <input 
                            type="text" 
                            placeholder="OPERATOR ID / USERNAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '16px 16px 16px 45px', 
                                background: 'rgba(0,0,0,0.3)', 
                                border: '1px solid #333', 
                                borderRadius: '12px', 
                                color: 'white',
                                outline: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Key size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                        <input 
                            type="password" 
                            placeholder="ACCESS CODE / PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '16px 16px 16px 45px', 
                                background: 'rgba(0,0,0,0.3)', 
                                border: '1px solid #333', 
                                borderRadius: '12px', 
                                color: 'white',
                                outline: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}
                        />
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="bg-red flex items-center justify-center gap-2"
                        style={{ 
                            padding: '18px', 
                            borderRadius: '12px', 
                            fontSize: '1rem', 
                            fontWeight: '900', 
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            boxShadow: '0 10px 30px rgba(255, 60, 60, 0.2)'
                        }}
                    >
                        AUTHENTICATE <ChevronRight size={18} />
                    </motion.button>
                </form>

                <div className="text-center mt-6">
                    <span style={{ color: '#555', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Unauthorized access is strictly prohibited
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
