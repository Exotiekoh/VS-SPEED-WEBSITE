import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search parts..." }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const popularSearches = [
        'Widebody Kit',
        'Fuel Pump',
        'Turbo Upgrade',
        'Intake System',
        'Exhaust',
        'Coilovers',
        'Intercooler',
        'Downpipe'
    ];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        
        // Call onSearch immediately for real-time filtering
        if (onSearch) {
            onSearch(value);
        }
        
        if (value.length > 1) {
            const filtered = popularSearches.filter(s => 
                s.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setIsFocused(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        onSearch(suggestion);
        setIsFocused(false);
        setSuggestions([]);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
                <motion.div
                    animate={{ 
                        borderColor: isFocused ? 'var(--color-gold)' : 'rgba(255,215,0,0.2)',
                        boxShadow: isFocused ? '0 0 30px rgba(255,215,0,0.2)' : 'none'
                    }}
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'rgba(0,0,0,0.5)',
                        border: '2px solid rgba(255,215,0,0.2)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Search 
                        size={20} 
                        style={{ 
                            position: 'absolute', 
                            left: '20px',
                            color: 'var(--color-gold)',
                            opacity: 0.7
                        }}
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder={placeholder}
                        style={{
                            width: '100%',
                            padding: '16px 50px 16px 50px',
                            background: 'transparent',
                            color: 'var(--color-text-main)',
                            fontSize: '16px',
                            border: 'none',
                            outline: 'none'
                        }}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('');
                                setSuggestions([]);
                                if (onSearch) {
                                    onSearch('');
                                }
                            }}
                            style={{
                                position: 'absolute',
                                right: '55px',
                                background: 'none',
                                border: 'none',
                                color: 'rgba(255,215,0,0.6)',
                                cursor: 'pointer',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,215,0,0.6)'}
                        >
                            <X size={18} />
                        </button>
                    )}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            padding: '10px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            background: 'linear-gradient(135deg, var(--color-primary-red) 0%, #ff4444 100%)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(255,60,60,0.3)'
                        }}
                    >
                        <Search size={20} />
                    </motion.button>
                </motion.div>
            </form>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
                {isFocused && (suggestions.length > 0 || query.length === 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '8px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            zIndex: 50,
                            background: 'rgba(10,10,10,0.95)',
                            border: '1px solid rgba(255,215,0,0.2)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}
                    >
                        {query.length === 0 && (
                            <div className="p-4">
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                                    Popular Searches
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.slice(0, 6).map((search, i) => (
                                        <motion.button
                                            key={search}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => handleSuggestionClick(search)}
                                            className="px-3 py-1.5 text-sm rounded-full transition-colors"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--color-text-main)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--color-primary-red)';
                                                e.currentTarget.style.borderColor = 'var(--color-primary-red)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                            }}
                                        >
                                            {search}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {suggestions.length > 0 && (
                            <div className="py-2">
                                {suggestions.map((suggestion, i) => (
                                    <motion.button
                                        key={suggestion}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full px-5 py-3 text-left text-white/80 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3"
                                    >
                                        <Search size={14} className="text-white/30" />
                                        {suggestion}
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
