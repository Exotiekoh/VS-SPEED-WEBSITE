import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, ChevronDown, X } from 'lucide-react';
import { useVehicle } from '../../contexts/VehicleContext';
import { useNavigate } from 'react-router-dom';

const VehicleSelectorBar = () => {
    const { vehicle, updateVehicle, years, makes } = useVehicle();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Show bar if no vehicle selected
    const showBar = !vehicle.year || !vehicle.make || !vehicle.model;

    const handleSelect = () => {
        if (vehicle.year && vehicle.make && vehicle.model) {
            setIsOpen(false);
            navigate(`/products?year=${vehicle.year}&make=${vehicle.make}&model=${vehicle.model}`);
        }
    };

    return (
        <AnimatePresence>
            {showBar && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 999,
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.95) 100%)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '2px solid var(--color-primary-red)',
                        boxShadow: '0 4px 30px rgba(255,60,60,0.3)',
                        padding: '12px 0'
                    }}
                >
                    <div className="container flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                style={{
                                    background: 'var(--color-primary-red)',
                                    borderRadius: '50%',
                                    padding: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Car size={20} style={{ color: 'white' }} />
                            </motion.div>
                            <div>
                                <h3 style={{
                                    fontSize: '14px',
                                    fontWeight: '900',
                                    color: 'white',
                                    letterSpacing: '1px',
                                    margin: 0
                                }}>
                                    Your Vehicle
                                </h3>
                                <p style={{
                                    fontSize: '11px',
                                    color: 'var(--color-gold)',
                                    margin: 0,
                                    fontWeight: '600'
                                }}>
                                    Please tap 'Select' to pick your chassis
                                </p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,60,60,0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="cool-outline"
                            style={{
                                background: 'var(--color-primary-red)',
                                color: 'white',
                                border: 'none',
                                padding: '10px 30px',
                                borderRadius: '8px',
                                fontWeight: '900',
                                fontSize: '12px',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            SELECT
                            <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </motion.button>
                    </div>

                    {/* Dropdown Selector */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    overflow: 'hidden',
                                    background: 'rgba(0,0,0,0.98)',
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    marginTop: '12px'
                                }}
                            >
                                <div className="container" style={{ padding: '20px 0' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 120px', gap: '15px', alignItems: 'end' }}>
                                        {/* Year Selector */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '10px',
                                                fontWeight: '900',
                                                letterSpacing: '1px',
                                                color: 'var(--color-gold)',
                                                marginBottom: '8px',
                                                textTransform: 'uppercase'
                                            }}>
                                                Year
                                            </label>
                                            <select
                                                value={vehicle.year}
                                                onChange={(e) => updateVehicle('year', e.target.value)}
                                                className="fade-in hover-glow-red"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid var(--color-border-gold)',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontSize: '13px',
                                                    fontWeight: '700',
                                                    outline: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <option value="">Select Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year} style={{ background: '#0a0a0a' }}>{year}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Make Selector */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '10px',
                                                fontWeight: '900',
                                                letterSpacing: '1px',
                                                color: 'var(--color-gold)',
                                                marginBottom: '8px',
                                                textTransform: 'uppercase'
                                            }}>
                                                Make
                                            </label>
                                            <select
                                                value={vehicle.make}
                                                onChange={(e) => updateVehicle('make', e.target.value)}
                                                disabled={!vehicle.year}
                                                className="fade-in hover-glow-red"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid var(--color-border-gold)',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontSize: '13px',
                                                    fontWeight: '700',
                                                    outline: 'none',
                                                    cursor: vehicle.year ? 'pointer' : 'not-allowed',
                                                    opacity: vehicle.year ? 1 : 0.5
                                                }}
                                            >
                                                <option value="">Select Make</option>
                                                {makes.map(make => (
                                                    <option key={make} value={make} style={{ background: '#0a0a0a' }}>{make}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Model Selector */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '10px',
                                                fontWeight: '900',
                                                letterSpacing: '1px',
                                                color: 'var(--color-gold)',
                                                marginBottom: '8px',
                                                textTransform: 'uppercase'
                                            }}>
                                                Model
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Model (e.g., 335i)"
                                                value={vehicle.model}
                                                onChange={(e) => updateVehicle('model', e.target.value)}
                                                disabled={!vehicle.make}
                                                className="fade-in hover-glow-red"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid var(--color-border-gold)',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontSize: '13px',
                                                    fontWeight: '700',
                                                    outline: 'none',
                                                    opacity: vehicle.make ? 1 : 0.5
                                                }}
                                            />
                                        </div>

                                        {/* GO Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSelect}
                                            disabled={!vehicle.year || !vehicle.make || !vehicle.model}
                                            className="pulse-gold"
                                            style={{
                                                padding: '12px 20px',
                                                background: 'linear-gradient(135deg, var(--color-gold), #ffd700)',
                                                color: '#0a0a0a',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontWeight: '900',
                                                fontSize: '12px',
                                                letterSpacing: '2px',
                                                cursor: vehicle.year && vehicle.make && vehicle.model ? 'pointer' : 'not-allowed',
                                                textTransform: 'uppercase',
                                                opacity: vehicle.year && vehicle.make && vehicle.model ? 1 : 0.5
                                            }}
                                        >
                                            GO
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VehicleSelectorBar;
