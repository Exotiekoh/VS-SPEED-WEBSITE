import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ScanLine, Lock, CheckCircle, Smartphone } from 'lucide-react';

const SecurityGateway = ({ children }) => {
    const [scanStatus, setScanStatus] = useState('checking'); // checking, verified, failed
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const addLog = (msg) => setLogs(prev => [...prev, msg]);

        // Simulated Security Checks
        const runDiagnostics = async () => {
            addLog('Initializing VSSPEED Protocol v9.2...');
            await new Promise(r => setTimeout(r, 600));
            setProgress(20);

            addLog('Analyzing Client User Agent...');
            // Simple check for automation flags (Navigator.webdriver)
            const isAutomation = navigator.webdriver;
            await new Promise(r => setTimeout(r, 800));
            setProgress(50);

            if (isAutomation) {
                addLog('WARNING: Automation Flag Detected');
                // You might deny access here in a real strict app, 
                // but for this demo, we'll flag it but maybe allow or fail.
                // Let's mimic a strict fail for "bot" browser properties.
                // UNCOMMENT TO STRICTLY BLOCK BOTS:
                // setScanStatus('failed');
                // return;
            }

            addLog('Verifying Encryption Keys...');
            await new Promise(r => setTimeout(r, 700));
            setProgress(80);

            addLog('Establishing Secure Handshake...');
            await new Promise(r => setTimeout(r, 500));
            setProgress(100);

            addLog('Access Granted.');
            setScanStatus('verified');
        };

        runDiagnostics();
    }, []);

    if (scanStatus === 'verified') {
        return <>{children}</>;
    }

    if (scanStatus === 'failed') {
        return (
            <div style={{ 
                height: '100vh', 
                width: '100vw', 
                background: 'black', 
                color: 'red', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontFamily: 'monospace' 
            }}>
                <ShieldAlert size={64} className="mb-4" />
                <h1 className="text-4xl font-bold mb-2">ACCESS DENIED</h1>
                <p>AUTOMATION / BOT TRAFFIC DETECTED</p>
                <p className="text-xs mt-4 text-gray-500">IP LOGGED: {Math.floor(Math.random()*255)}.{Math.floor(Math.random()*255)}.{Math.floor(Math.random()*255)}.{Math.floor(Math.random()*255)}</p>
            </div>
        );
    }

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            background: '#050505', 
            color: 'white', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999
        }}>
            <div style={{ width: '300px', textAlign: 'center' }}>
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'inline-block', marginBottom: '30px' }}
                >
                    <ScanLine size={48} color="var(--color-gold)" />
                </motion.div>

                <h2 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>
                    SYSTEM SECURITY SCAN
                </h2>

                {/* Progress Bar */}
                <div style={{ 
                    height: '4px', 
                    width: '100%', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '2px',
                    marginBottom: '20px',
                    overflow: 'hidden'
                }}>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ height: '100%', background: 'var(--color-primary-red)' }}
                    />
                </div>

                {/* Logs */}
                <div style={{ 
                    height: '100px', 
                    textAlign: 'left', 
                    fontSize: '12px', 
                    color: '#666', 
                    fontFamily: 'monospace',
                    overflow: 'hidden'
                }}>
                    <AnimatePresence>
                        {logs.slice(-4).map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{ marginBottom: '4px' }}
                            >
                                {`> ${log}`}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SecurityGateway;
