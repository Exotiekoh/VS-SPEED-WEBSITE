import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { RefreshCw, Download, Upload, Settings, CheckCircle, XCircle, AlertTriangle, Play, Pause } from 'lucide-react';

const AutomationPanel = () => {
    const [isAutomationActive, setIsAutomationActive] = useState(true);
    const [syncStatus, setSyncStatus] = useState({
        lastSync: null,
        productsTotal: 0,
        productsAdded: 0,
        productsUpdated: 0,
        imagesDownloaded: 0,
        isRunning: false
    });
    const [suppliers, setSuppliers] = useState([
        { id: 'ecstuning', name: 'ECS Tuning', enabled: true, lastSync: '2 hours ago', products: 25 },
        { id: 'turner', name: 'Turner Motorsport', enabled: true, lastSync: '2 hours ago', products: 25 },
        { id: 'fcpeuro', name: 'FCP Euro', enabled: true, lastSync: '2 hours ago', products: 25 },
        { id: 'modbargains', name: 'ModBargains', enabled: true, lastSync: '2 hours ago', products: 25 }
    ]);

    const runFullSync = async () => {
        setSyncStatus(prev => ({ ...prev, isRunning: true }));
        
        try {
            // Import and run the sync
            const { performFullSync } = await import('../../automation/product-sync.js');
            const result = await performFullSync();
            
            if (result.success) {
                setSyncStatus({
                    lastSync: new Date().toLocaleString(),
                    productsTotal: result.results.newDatabaseSize,
                    productsAdded: result.results.added,
                    productsUpdated: result.results.updated,
                    imagesDownloaded: result.results.total,
                    isRunning: false
                });
            }
        } catch (error) {
            console.error('Sync failed:', error);
            setSyncStatus(prev => ({ ...prev, isRunning: false }));
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '10px' }}>
                    🤖 AUTOMATION CONTROL CENTER
                </h2>
                <p style={{ color: '#888', fontSize: '0.95rem' }}>
                    Manage dropshipping automation, product sync, and supplier integrations
                </p>
            </div>

            {/* Master Control */}
            <Motion.div
                className="glass"
                style={{
                    padding: '30px',
                    borderRadius: '20px',
                    marginBottom: '30px',
                    background: isAutomationActive 
                        ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 60, 60, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%)',
                    border: `2px solid ${isAutomationActive ? '#00ff00' : '#ff3c3c'}`
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '900', marginBottom: '5px' }}>
                            AUTOMATION STATUS
                        </h3>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>
                            {isAutomationActive ? '✅ All systems operational' : '⏸️ Automation paused'}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAutomationActive(!isAutomationActive)}
                        style={{
                            padding: '15px 35px',
                            borderRadius: '12px',
                            fontWeight: '900',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            background: isAutomationActive ? '#ff3c3c' : '#00ff00',
                            color: 'black',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        {isAutomationActive ? <><Pause size={18} /> Pause All</> : <><Play size={18} /> Resume</>}
                    </button>
                </div>
            </Motion.div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <Motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={runFullSync}
                    disabled={syncStatus.isRunning}
                    className="glass"
                    style={{
                        padding: '25px',
                        borderRadius: '16px',
                        border: '2px solid rgba(252, 207, 49, 0.3)',
                        background: 'linear-gradient(135deg, rgba(252, 207, 49, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                        cursor: syncStatus.isRunning ? 'wait' : 'pointer',
                        opacity: syncStatus.isRunning ? 0.6 : 1
                    }}
                >
                    <RefreshCw size={32} color="var(--color-gold)" style={{ marginBottom: '15px' }} />
                    <h4 style={{ color: 'white', fontWeight: '900', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {syncStatus.isRunning ? 'Syncing...' : 'Sync Products'}
                    </h4>
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>
                        Scrape all suppliers & update catalog
                    </p>
                </Motion.button>

                <Motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass"
                    style={{
                        padding: '25px',
                        borderRadius: '16px',
                        border: '2px solid rgba(255, 60, 60, 0.3)',
                        background: 'linear-gradient(135deg, rgba(255, 60, 60, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                        cursor: 'pointer'
                    }}
                >
                    <Download size={32} color="var(--color-primary-red)" style={{ marginBottom: '15px' }} />
                    <h4 style={{ color: 'white', fontWeight: '900', marginBottom: '8px', textTransform: 'uppercase' }}>
                        Download Images
                    </h4>
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>
                        Batch download product images
                    </p>
                </Motion.button>

                <Motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass"
                    style={{
                        padding: '25px',
                        borderRadius: '16px',
                        border: '2px solid rgba(100, 200, 255, 0.3)',
                        background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                        cursor: 'pointer'
                    }}
                >
                    <Settings size={32} color="#64c8ff" style={{ marginBottom: '15px' }} />
                    <h4 style={{ color: 'white', fontWeight: '900', marginBottom: '8px', textTransform: 'uppercase' }}>
                        Configure
                    </h4>
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>
                        Pricing, intervals, suppliers
                    </p>
                </Motion.button>
            </div>

            {/* Sync Status */}
            {syncStatus.lastSync && (
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{
                        padding: '25px',
                        borderRadius: '16px',
                        marginBottom: '30px',
                        background: 'rgba(0, 255, 0, 0.05)',
                        border: '1px solid rgba(0, 255, 0, 0.2)'
                    }}
                >
                    <h4 style={{ color: '#00ff00', fontWeight: '900', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle size={20} /> LAST SYNC SUCCESSFUL
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                        <div>
                            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Time</p>
                            <p style={{ color: 'white', fontWeight: '700' }}>{syncStatus.lastSync}</p>
                        </div>
                        <div>
                            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Products Added</p>
                            <p style={{ color: '#00ff00', fontWeight: '700', fontSize: '1.2rem' }}>+{syncStatus.productsAdded}</p>
                        </div>
                        <div>
                            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Products Updated</p>
                            <p style={{ color: '#ffd700', fontWeight: '700', fontSize: '1.2rem' }}>{syncStatus.productsUpdated}</p>
                        </div>
                        <div>
                            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Images Downloaded</p>
                            <p style={{ color: '#64c8ff', fontWeight: '700', fontSize: '1.2rem' }}>{syncStatus.imagesDownloaded}</p>
                        </div>
                    </div>
                </Motion.div>
            )}

            {/* Supplier Status */}
            <div>
                <h3 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '900', marginBottom: '20px' }}>
                    SUPPLIER CONNECTIONS
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                    {suppliers.map(supplier => (
                        <Motion.div
                            key={supplier.id}
                            className="glass"
                            whileHover={{ x: 5 }}
                            style={{
                                padding: '20px',
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: supplier.enabled ? '1px solid rgba(0, 255, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div>
                                <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '5px' }}>
                                    {supplier.enabled ? '🟢' : '⚫'} {supplier.name}
                                </h4>
                                <p style={{ color: '#888', fontSize: '0.85rem' }}>
                                    {supplier.products} products • Last sync: {supplier.lastSync}
                                </p>
                            </div>
                            <button
                                onClick={() => setSuppliers(prev => prev.map(s => 
                                    s.id === supplier.id ? { ...s, enabled: !s.enabled } : s
                                ))}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    background: supplier.enabled ? 'rgba(255, 60, 60, 0.2)' : 'rgba(0, 255, 0, 0.2)',
                                    border: supplier.enabled ? '1px solid #ff3c3c' : '1px solid #00ff00',
                                    color: supplier.enabled ? '#ff3c3c' : '#00ff00',
                                    fontWeight: '700',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {supplier.enabled ? 'Disable' : 'Enable'}
                            </button>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AutomationPanel;
