import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const ProductFilter = ({ categories, onFilterChange, selectedFilters }) => {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        availability: false
    });

    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCategoryToggle = (category) => {
        const newCategories = selectedFilters.categories.includes(category)
            ? selectedFilters.categories.filter(c => c !== category)
            : [...selectedFilters.categories, category];
        
        onFilterChange({ ...selectedFilters, categories: newCategories });
    };

    const handlePriceChange = (type, value) => {
        const newRange = { ...priceRange, [type]: parseInt(value) };
        setPriceRange(newRange);
        onFilterChange({ ...selectedFilters, priceRange: newRange });
    };

    const handleStockFilter = (inStock) => {
        onFilterChange({ ...selectedFilters, inStock });
    };

    const clearFilters = () => {
        setPriceRange({ min: 0, max: 2000 });
        onFilterChange({ categories: [], priceRange: { min: 0, max: 2000 }, inStock: null });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            {/* Clear Filters */}
            {(selectedFilters.categories.length > 0 || selectedFilters.inStock !== null) && (
                <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors"
                >
                    <X size={14} />
                    Clear All Filters
                </button>
            )}

            {/* Availability Section */}
            <div 
                className="rounded-xl overflow-hidden"
                style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)' 
                }}
            >
                <button
                    onClick={() => toggleSection('availability')}
                    className="w-full flex justify-between items-center p-4 text-left"
                >
                    <span className="font-bold text-white text-sm uppercase tracking-wider">
                        Availability
                    </span>
                    {expandedSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections.availability && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        className="px-4 pb-4 space-y-2"
                    >
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedFilters.inStock === true}
                                onChange={() => handleStockFilter(selectedFilters.inStock === true ? null : true)}
                                className="w-4 h-4 rounded border-gray-600 bg-transparent accent-red-500"
                            />
                            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                In Stock
                            </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedFilters.inStock === false}
                                onChange={() => handleStockFilter(selectedFilters.inStock === false ? null : false)}
                                className="w-4 h-4 rounded border-gray-600 bg-transparent accent-red-500"
                            />
                            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                Out of Stock
                            </span>
                        </label>
                    </motion.div>
                )}
            </div>

            {/* Product Category Section */}
            <div 
                className="rounded-xl overflow-hidden"
                style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)' 
                }}
            >
                <button
                    onClick={() => toggleSection('category')}
                    className="w-full flex justify-between items-center p-4 text-left"
                >
                    <span className="font-bold text-white text-sm uppercase tracking-wider">
                        Product Category
                    </span>
                    {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections.category && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        className="px-4 pb-4 space-y-2"
                    >
                        {categories.map((category, index) => (
                            <motion.label
                                key={category}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between cursor-pointer group py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.categories.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                        className="w-4 h-4 rounded border-gray-600 bg-transparent accent-red-500"
                                    />
                                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                        {category}
                                    </span>
                                </div>
                                <span 
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{ 
                                        background: selectedFilters.categories.includes(category) 
                                            ? 'var(--color-primary-red)' 
                                            : 'rgba(255,255,255,0.1)',
                                        color: 'white'
                                    }}
                                >
                                    {Math.floor(Math.random() * 20) + 1}
                                </span>
                            </motion.label>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Price Range Section */}
            <div 
                className="rounded-xl overflow-hidden"
                style={{ 
                    background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)' 
                }}
            >
                <button
                    onClick={() => toggleSection('price')}
                    className="w-full flex justify-between items-center p-4 text-left"
                >
                    <span className="font-bold text-white text-sm uppercase tracking-wider">
                        Price
                    </span>
                    {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections.price && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        className="px-4 pb-4 space-y-4"
                    >
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            value={priceRange.max}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500"
                        />
                        <div className="flex justify-between text-sm text-white/60">
                            <span>${priceRange.min} CAD</span>
                            <span>${priceRange.max} CAD</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductFilter;
