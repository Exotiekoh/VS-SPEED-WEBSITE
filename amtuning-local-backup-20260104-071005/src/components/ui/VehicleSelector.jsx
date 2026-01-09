import React from 'react';
import { useVehicle } from '../contexts/VehicleContext';
import { Car, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VehicleSelector = () => {
    const { vehicle, updateVehicle, years, makes } = useVehicle();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const containerVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }
    };

    return (
        <div className="relative z-50">
            {/* Trigger Button */}
            <button 
                onClick={toggleOpen}
                className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full hover:border-red-500/50 transition-all group"
            >
                <Car size={18} className="text-gold group-hover:text-red-500 transition-colors" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                    {vehicle.year && vehicle.make ? `${vehicle.year} ${vehicle.make}` : 'Select Vehicle'}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute top-full mt-2 left-0 w-72 exotic-card rounded-xl p-4 overflow-hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {/* Year Selector */}
                            <div className="space-y-1">
                                <label className="text-xs text-gold uppercase tracking-wider font-bold">Year</label>
                                <select 
                                    className="w-full exotic-input px-3 py-2 rounded-lg text-sm"
                                    value={vehicle.year}
                                    onChange={(e) => updateVehicle('year', e.target.value)}
                                >
                                    <option value="">Select Year</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Make Selector */}
                            <div className="space-y-1">
                                <label className="text-xs text-gold uppercase tracking-wider font-bold">Make</label>
                                <select 
                                    className="w-full exotic-input px-3 py-2 rounded-lg text-sm"
                                    value={vehicle.make}
                                    onChange={(e) => updateVehicle('make', e.target.value)}
                                >
                                    <option value="">Select Make</option>
                                    {makes.map(make => (
                                        <option key={make} value={make}>{make}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Model Input (Free Text for implementation simplicity as per plan) */}
                            <div className="space-y-1">
                                <label className="text-xs text-gold uppercase tracking-wider font-bold">Model</label>
                                <input 
                                    type="text"
                                    className="w-full exotic-input px-3 py-2 rounded-lg text-sm"
                                    placeholder="e.g. M4 Competition"
                                    value={vehicle.model}
                                    onChange={(e) => updateVehicle('model', e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VehicleSelector;
