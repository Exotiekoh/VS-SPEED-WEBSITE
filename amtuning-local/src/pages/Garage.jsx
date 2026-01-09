import React, { useState } from 'react';
import { Car, ChevronDown, CheckCircle, ArrowRight, RefreshCw, Info, Plus, X, Wrench, Package, AlertCircle, Camera, Upload } from 'lucide-react';
import { useVehicle } from '../contexts/VehicleContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Garage = () => {
    const { vehicle, updateVehicle, years, makes, installedParts, addPart, removePart, partCategories, engineImages, addEngineImage, removeEngineImage } = useVehicle();
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [isSaved, setIsSaved] = useState(!!vehicle.make);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showAddPartModal, setShowAddPartModal] = useState(false);
    
    // Add Part Form State
    const [newPart, setNewPart] = useState({
        name: '',
        brand: '',
        category: '',
        notes: ''
    });

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

    const handleAddPart = (e) => {
        e.preventDefault();
        if (!newPart.name || !newPart.category) return;
        
        addPart(newPart);
        setNewPart({ name: '', brand: '', category: '', notes: '' });
        setShowAddPartModal(false);
    };

    const handleImageUpload = (index, e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onloadend = () => {
            addEngineImage(index, reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ background: 'transparent', minHeight: '100vh', color: 'white' }}>
            <div className="container" style={{ padding: isMobile ? '40px 1.5rem 80px' : '80px 1.5rem 100px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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

                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '16px', fontWeight: '1000', color: 'white', letterSpacing: '-2px', lineHeight: '0.9' }}>MY <span className="text-red">GARAGE</span></h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', fontWeight: '500' }}>
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
                                        border: '1px solid rgba(212, 175, 55, 0.2)',
                                        fontSize: '15px',
                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                        color: 'white',
                                        outline: 'none',
                                        fontWeight: '700'
                                    }}
                                    maxLength={25}
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
                    <>
                        <div className="glass" style={{
                            padding: isMobile ? '30px 20px' : '60px',
                            background: 'linear-gradient(135deg, rgba(20,20,28,0.9) 0%, rgba(10,10,15,0.95) 100%)',
                            borderRadius: '24px',
                            border: '2px solid var(--color-gold)',
                            boxShadow: '0 0 40px rgba(252, 207, 49, 0.1)',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '40px'
                        }}>
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.05 }}>
                                <Car size={300} color="var(--color-gold)" />
                            </div>
                            
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <CheckCircle size={isMobile ? 48 : 64} color="var(--color-gold)" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 10px rgba(252, 207, 49, 0.5))' }} />
                                <h2 style={{ color: 'white', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: '1000', opacity: 0.6 }}>VEHICLE ACTIVE</h2>
                                <h3 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '1000', color: 'var(--color-gold)', textShadow: '0 0 30px rgba(252, 207, 49, 0.4)', lineHeight: '1', letterSpacing: '-1px' }}>
                                    {vehicle.year} {vehicle.make}
                                </h3>
                                <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '900', color: 'white', marginBottom: '40px', letterSpacing: '-0.5px' }}>{vehicle.model}</p>
                                
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

                        {/* PARTS LIST SECTION */}
                        <div className="glass-card" style={{ padding: '40px', borderRadius: '24px', background: 'rgba(0,0,0,0.6)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Package size={28} color="var(--color-gold)" />
                                        Installed Parts
                                    </h2>
                                    <p style={{ color: '#888', fontSize: '14px' }}>Track your modifications and upgrades</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowAddPartModal(true)}
                                    style={{
                                        background: 'linear-gradient(135deg, var(--color-primary-red) 0%, #8b0000 100%)',
                                        color: 'white',
                                        padding: '14px 24px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '900',
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: '0 0 20px rgba(255, 60, 60, 0.3)'
                                    }}
                                >
                                    <Plus size={18} /> ADD PART
                                </motion.button>
                            </div>

                            {installedParts.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
                                    <Wrench size={64} style={{ marginBottom: '20px', opacity: 0.3 }} />
                                    <p style={{ fontSize: '18px', marginBottom: '8px' }}>No parts installed yet</p>
                                    <p style={{ fontSize: '14px' }}>Click "ADD PART" to start tracking your modifications</p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                    {installedParts.map(part => (
                                        <motion.div
                                            key={part.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="glass-card"
                                            style={{
                                                padding: '20px',
                                                borderRadius: '16px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                position: 'relative'
                                            }}
                                        >
                                            <button
                                                onClick={() => removePart(part.id)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    right: '12px',
                                                    background: 'rgba(255, 60, 60, 0.2)',
                                                    border: '1px solid rgba(255, 60, 60, 0.3)',
                                                    color: 'var(--color-primary-red)',
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <X size={16} />
                                            </button>

                                            <div style={{ marginBottom: '12px' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    background: 'var(--color-gold)',
                                                    color: 'black',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '10px',
                                                    fontWeight: '900',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>
                                                    {part.category}
                                                </span>
                                            </div>

                                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
                                                {part.name}
                                            </h3>

                                            {part.brand && (
                                                <p style={{ fontSize: '13px', color: 'var(--color-gold)', marginBottom: '12px', fontWeight: '700' }}>
                                                    {part.brand}
                                                </p>
                                            )}

                                            {part.notes && (
                                                <div style={{
                                                    background: 'rgba(255, 193, 7, 0.1)',
                                                    border: '1px solid rgba(255, 193, 7, 0.2)',
                                                    borderRadius: '8px',
                                                    padding: '12px',
                                                    marginTop: '12px'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                                        <AlertCircle size={16} color="#ffc107" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                        <p style={{ fontSize: '12px', color: '#ffc107', lineHeight: '1.5', fontWeight: '600' }}>
                                                            {part.notes}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ENGINE BAY IMAGES SECTION */}
                        <div className="glass-card" style={{ padding: '40px', borderRadius: '24px', background: 'rgba(0,0,0,0.6)', marginTop: '40px' }}>
                            <div style={{ marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Camera size={28} color="var(--color-gold)" />
                                    Engine Bay Photos
                                </h2>
                                <p style={{ color: '#888', fontSize: '14px' }}>Upload up to 4 images to help AI provide more accurate diagnostics and recommendations</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                {[0, 1, 2, 3].map(index => (
                                    <div key={index} style={{
                                        position: 'relative',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '2px dashed rgba(255,255,255,0.2)',
                                        borderRadius: '16px',
                                        aspectRatio: '4/3',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        {engineImages[index] ? (
                                            <>
                                                <img 
                                                    src={engineImages[index]} 
                                                    alt={`Engine Bay ${index + 1}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <button
                                                    onClick={() => removeEngineImage(index)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        right: '8px',
                                                        background: 'rgba(255, 60, 60, 0.9)',
                                                        border: 'none',
                                                        color: 'white',
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        zIndex: 10
                                                    }}
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        ) : (
                                            <label style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                gap: '12px'
                                            }}>
                                                <Upload size={32} color="#666" />
                                                <span style={{ color: '#888', fontSize: '13px', fontWeight: '700' }}>
                                                    Upload Image {index + 1}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(index, e)}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                marginTop: '20px',
                                padding: '16px',
                                background: 'rgba(33, 150, 243, 0.1)',
                                border: '1px solid rgba(33, 150, 243, 0.2)',
                                borderRadius: '12px',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'flex-start'
                            }}>
                                <Info size={20} color="#2196F3" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <p style={{ fontSize: '13px', color: '#2196F3', lineHeight: '1.6' }}>
                                    <strong>Pro Tip:</strong> Upload clear photos from different angles (front, top, left, right) for best AI analysis. Images help our AI identify parts, detect issues, and provide personalized recommendations.
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Add Part Modal */}
                <AnimatePresence>
                    {showAddPartModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.9)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 9999,
                                padding: '20px'
                            }}
                            onClick={() => setShowAddPartModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="glass-card"
                                style={{
                                    maxWidth: '600px',
                                    width: '100%',
                                    padding: '40px',
                                    borderRadius: '24px',
                                    background: 'rgba(20,20,28,0.95)',
                                    border: '1px solid var(--color-primary-red)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>Add New Part</h2>
                                    <button
                                        onClick={() => setShowAddPartModal(false)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#666',
                                            cursor: 'pointer',
                                            padding: '8px'
                                        }}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleAddPart} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', letterSpacing: '1px' }}>
                                            Part Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={newPart.name}
                                            onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                                            placeholder="e.g. Cold Air Intake, Coilovers"
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '14px 18px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                fontSize: '14px',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', letterSpacing: '1px' }}>
                                            Brand
                                        </label>
                                        <input
                                            type="text"
                                            value={newPart.brand}
                                            onChange={(e) => setNewPart({ ...newPart,brand: e.target.value })}
                                            placeholder="e.g. VS SPEED, APR, Bilstein"
                                            style={{
                                                width: '100%',
                                                padding: '14px 18px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                fontSize: '14px',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    <div style={{ position: 'relative' }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', letterSpacing: '1px' }}>
                                            Category *
                                        </label>
                                        <select
                                            value={newPart.category}
                                            onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '14px 18px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                fontSize: '14px',
                                                appearance: 'none',
                                                cursor: 'pointer',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="" style={{ background: '#111' }}>Select Category</option>
                                            {partCategories.map(cat => (
                                                <option key={cat} value={cat} style={{ background: '#111' }}>{cat}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={18} style={{ position: 'absolute', right: '16px', bottom: '16px', color: 'var(--color-gold)', pointerEvents: 'none' }} />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', letterSpacing: '1px' }}>
                                            Problems / Notes
                                        </label>
                                        <textarea
                                            value={newPart.notes}
                                            onChange={(e) => setNewPart({ ...newPart, notes: e.target.value })}
                                            placeholder="Any issues, installation notes, or observations..."
                                            rows={4}
                                            style={{
                                                width: '100%',
                                                padding: '14px 18px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                fontSize: '14px',
                                                outline: 'none',
                                                resize: 'vertical',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setShowAddPartModal(false)}
                                            style={{
                                                flex: 1,
                                                padding: '16px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                background: 'transparent',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: '900',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-red"
                                            style={{
                                                flex: 1,
                                                padding: '16px',
                                                borderRadius: '12px',
                                                fontSize: '14px',
                                                fontWeight: '900',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            <Plus size={18} /> ADD PART
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ marginTop: '60px', display: 'flex', gap: '20px', alignItems: 'center', padding: '24px', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                    <Info size={24} color="var(--color-gold)" />
                    <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.5' }}>
                        <strong style={{ color: 'var(--color-gold)' }}>Why add your car?</strong> Our system uses your vehicle data to filter the catalog for exact fitment, show compatibility warnings, and provide torque specs and install guides tailored to your specific chassis.
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Garage;

