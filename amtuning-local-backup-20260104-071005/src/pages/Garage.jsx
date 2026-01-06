import React, { useState } from 'react';
import { Car, ChevronDown, CheckCircle, ArrowRight, RefreshCw, Info } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';
import { Link } from 'react-router-dom';

const Garage = () => {
    const { vehicle, updateVehicle, years, makes } = useVehicle();
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [isSaved, setIsSaved] = useState(!!vehicle.make);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 850;

    const handleSave = (e) => {
        e.preventDefault();
        if (!selectedYear || !selectedMake || !selectedModel) return;
        
        updateVehicle('year', selectedYear);
        updateVehicle('make', selectedMake);
        updateVehicle('model', selectedModel);
        setIsSaved(true);
    };

    const handleReset = () => {
        setIsSaved(false);
        setSelectedYear('');
        setSelectedMake('');
        setSelectedModel('');
        updateVehicle('year', '');
        updateVehicle('make', '');
        updateVehicle('model', '');
    };

    return (
        <div className="container" style={{ padding: isMobile ? '40px 1.5rem 80px' : '80px 1.5rem 100px', minHeight: '80vh' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'rgba(255, 60, 60, 0.1)',
                        border: '1px solid var(--color-primary-red)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 30px',
                        boxShadow: '0 0 20px rgba(255, 60, 60, 0.2)'
                    }}>
                        <Car size={36} color="var(--color-primary-red)" />
                    </div>

                    <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '900', color: 'white' }}>MY <span className="text-red">GARAGE</span></h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                        Identify your vehicle to unlock precision part matching and personalized tuning advice from our AI Assistant.
                    </p>
                </div>

                {!isSaved ? (
                    <div className="glass" style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--color-border-glass)',
                        padding: '50px',
                        borderRadius: '24px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            {/* Year */}
                            <div style={{ position: 'relative' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', letterSpacing: '1px' }}>Model Year</label>
                                <select 
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontSize: '15px',
                                        appearance: 'none',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="" style={{ background: '#111' }}>Select Year</option>
                                    {years.map(y => <option key={y} value={y} style={{ background: '#111' }}>{y}</option>)}
                                </select>
                                <ChevronDown size={18} style={{ position: 'absolute', right: '16px', bottom: '16px', color: 'var(--color-gold)', pointerEvents: 'none' }} />
                            </div>

                            {/* Make */}
                            <div style={{ position: 'relative' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', letterSpacing: '1px' }}>Manufacturer</label>
                                <select 
                                    value={selectedMake}
                                    onChange={(e) => setSelectedMake(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontSize: '15px',
                                        appearance: 'none',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="" style={{ background: '#111' }}>Select Make</option>
                                    {makes.map(m => <option key={m} value={m} style={{ background: '#111' }}>{m}</option>)}
                                </select>
                                <ChevronDown size={18} style={{ position: 'absolute', right: '16px', bottom: '16px', color: 'var(--color-gold)', pointerEvents: 'none' }} />
                            </div>

                            {/* Model */}
                            <div style={{ position: 'relative' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', letterSpacing: '1px' }}>Vehicle Model</label>
                                <input 
                                    type="text"
                                    placeholder="e.g. Golf GTI, M3, 488 GTB"
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontSize: '15px',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                                <button className="bg-red" type="submit" style={{
                                    width: '100%',
                                    padding: '20px',
                                    color: 'white',
                                    fontWeight: '900',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    boxShadow: '0 10px 30px rgba(255, 60, 60, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}>
                                    Lock In Vehicle <ArrowRight size={20} />
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="glass" style={{
                        padding: isMobile ? '30px 20px' : '60px',
                        background: 'linear-gradient(135deg, rgba(20,20,28,0.9) 0%, rgba(10,10,15,0.95) 100%)',
                        borderRadius: '24px',
                        border: '2px solid var(--color-gold)',
                        boxShadow: '0 0 40px rgba(252, 207, 49, 0.1)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.05 }}>
                            <Car size={300} color="var(--color-gold)" />
                        </div>
                        
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <CheckCircle size={isMobile ? 48 : 64} color="var(--color-gold)" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 10px rgba(252, 207, 49, 0.5))' }} />
                            <h2 style={{ color: 'white', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '900' }}>Vehicle Active</h2>
                            <h3 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', color: 'var(--color-gold)', textShadow: '0 0 20px rgba(252, 207, 49, 0.3)', lineHeight: '1' }}>
                                {vehicle.year} {vehicle.make}
                            </h3>
                            <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '700', color: 'white', marginBottom: '40px' }}>{vehicle.model}</p>
                            
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/products" style={{ flex: 1, minWidth: '200px' }}>
                                    <button style={{ width: '100%', padding: '16px', background: 'var(--color-primary-red)', color: 'white', borderRadius: '8px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                                        Find Matching Parts
                                    </button>
                                </Link>
                                <Link to="/ai-assistant" style={{ flex: 1, minWidth: '200px' }}>
                                    <button style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', fontWeight: '800', border: '1px solid var(--color-border-glass)', cursor: 'pointer' }}>
                                        Consult AI Tuner
                                    </button>
                                </Link>
                            </div>

                            <button
                                onClick={handleReset}
                                style={{
                                    marginTop: '40px',
                                    color: '#666',
                                    fontSize: '13px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    margin: '40px auto 0'
                                }}
                                className="hover-red"
                            >
                                <RefreshCw size={14} /> Change Vehicle
                            </button>
                        </motion.div>
                    </div>
                )}

                <div style={{ marginTop: '60px', display: 'flex', gap: '20px', alignItems: 'center', padding: '24px', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                    <Info size={24} color="var(--color-gold)" />
                    <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.5' }}>
                        <strong style={{ color: 'var(--color-gold)' }}>Why add your car?</strong> Our system uses your vehicle data to filter the catalog for exact fitment, show compatibility warnings, and provide torque specs and install guides tailored to your specific chassis.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Garage;

