import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRight, Car, Grid, List, X, Zap, Target, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import { products, categories, brands } from '../data/productDatabase';

// ============ DATA ============
const vehicleMakes = [
    { id: 'audi', name: 'Audi', models: ['A3', 'A4', 'A5', 'A6', 'S3', 'S4', 'S5', 'RS3', 'RS4', 'RS5', 'RS6', 'Q5', 'Q7', 'R8', 'TT'] },
    { id: 'bmw', name: 'BMW', models: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', 'M2', 'M3', 'M4', 'M5', 'X3', 'X5', 'X6', 'Z4'] },
    { id: 'mercedes', name: 'Mercedes Benz', models: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'GLA', 'GLC', 'AMG GT', 'G-Class'] },
    { id: 'mini', name: 'MINI', models: ['Cooper', 'Cooper S', 'JCW', 'Clubman', 'Countryman'] },
    { id: 'porsche', name: 'Porsche', models: ['911', 'Cayman', 'Boxster', 'Cayenne', 'Macan', 'Panamera', 'Taycan'] },
    { id: 'volkswagen', name: 'Volkswagen', models: ['Golf', 'Golf GTI', 'Golf R', 'Jetta', 'Jetta GLI', 'Passat', 'Arteon', 'Atlas', 'Tiguan'] }
];

const featuredBrands = [
    { name: 'APR', count: 12 },
    { name: 'CTS Turbo', count: 8 },
    { name: 'VRSF', count: 18 },
    { name: 'Unitronic', count: 5 },
    { name: 'AWE', count: 3 },
    { name: 'H&R', count: 2 },
    { name: 'Bosch', count: 4 },
    { name: 'Bilstein', count: 1 },
    { name: 'EBC', count: 2 },
    { name: 'Hawk', count: 1 },
];

// ============ ANIMATIONS ============
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// ============ COMPONENT ============
const ProductList = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [viewMode, setViewMode] = useState('vehicle');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [showVehiclePicker, setShowVehiclePicker] = useState(false);
    const [savedVehicle, setSavedVehicle] = useState(null);
    const [gridView, setGridView] = useState(true);

    useEffect(() => {
        const search = searchParams.get('search');
        const brand = searchParams.get('brand');
        if (search) setSearchQuery(search);
        if (brand) {
            setSelectedBrand(brand);
            setViewMode('brand');
        }
    }, [searchParams]);

    const filteredProducts = products.filter(p => {
        const matchesSearch = searchQuery 
            ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
        const matchesCategory = activeCategory ? p.category === activeCategory : true;
        return matchesSearch && matchesBrand && matchesCategory;
    });

    const clearAllFilters = () => {
        setSearchQuery('');
        setSelectedMake(null);
        setSelectedModel(null);
        setSelectedBrand(null);
        setActiveCategory(null);
        setSearchParams({});
    };

    const getBrandProductCount = (brandName) => {
        return products.filter(p => p.brand === brandName).length;
    };

    return (
        <div style={{ background: 'var(--color-bg-deep)', color: 'white', minHeight: '100vh' }}>
            {/* ===== TOP BAR ===== */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                    background: 'rgba(0,0,0,0.5)', 
                    borderBottom: '1px solid rgba(255,255,255,0.05)', 
                    padding: '12px 0',
                    fontSize: '13px',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                        <Link to="/" style={{ color: '#888', textDecoration: 'none' }} className="hover-gold">Home</Link>
                        <ChevronRight size={14} color="#444" />
                        <span style={{ color: 'var(--color-gold)', fontWeight: '700' }}>Arsenal</span>
                        {selectedBrand && (
                            <>
                                <ChevronRight size={14} color="#444" />
                                <span style={{ color: 'var(--color-primary-red)' }}>{selectedBrand}</span>
                            </>
                        )}
                    </div>
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setShowVehiclePicker(true)}
                        className="glass cool-outline"
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            cursor: 'pointer',
                            padding: '10px 20px',
                            borderRadius: '12px'
                        }}
                    >
                        <Car size={20} color="var(--color-primary-red)" />
                        <div>
                            <div style={{ fontWeight: '800', color: 'white', fontSize: '11px', letterSpacing: '1px' }}>YOUR CHASSIS</div>
                            <div style={{ color: '#888', fontSize: '11px' }}>
                                {savedVehicle ? `${savedVehicle.make} ${savedVehicle.model}` : "TAP TO SELECT"}
                            </div>
                        </div>
                        <span style={{ color: 'var(--color-gold)', fontWeight: '900', fontSize: '10px', letterSpacing: '1px' }}>SELECT</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* ===== MAIN NAVIGATION TABS ===== */}
            <div style={{ background: '#0a0a0a', padding: '0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0' }}>
                        <motion.button
                            whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                            onClick={() => setViewMode('vehicle')}
                            style={{
                                padding: '18px 30px',
                                background: viewMode === 'vehicle' ? 'var(--color-primary-red)' : 'transparent',
                                color: 'white',
                                border: 'none',
                                fontWeight: '900',
                                fontSize: '12px',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                            }}
                        >
                            <Zap size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            By Vehicle
                        </motion.button>
                        <motion.button
                            whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                            onClick={() => setViewMode('brand')}
                            style={{
                                padding: '18px 30px',
                                background: viewMode === 'brand' ? 'var(--color-primary-red)' : 'transparent',
                                color: 'white',
                                border: 'none',
                                fontWeight: '900',
                                fontSize: '12px',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                            }}
                        >
                            <Target size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            By Brand
                        </motion.button>
                        <motion.button
                            whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                            onClick={clearAllFilters}
                            style={{
                                padding: '18px 30px',
                                background: 'transparent',
                                color: 'white',
                                border: 'none',
                                fontWeight: '900',
                                fontSize: '12px',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                            }}
                        >
                            <Shield size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Clearance
                        </motion.button>
                        
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                            <motion.span 
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{ color: 'var(--color-primary-red)', fontWeight: '900', fontSize: '11px', letterSpacing: '2px' }}
                            >
                                🔥 HOT DEALS ACTIVE &gt;&gt;
                            </motion.span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== VEHICLE SELECTOR BAR ===== */}
            {viewMode === 'vehicle' && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ 
                        background: 'linear-gradient(90deg, var(--color-primary-red) 0%, #8B0000 100%)', 
                        padding: '15px 0',
                        boxShadow: '0 5px 30px rgba(255, 0, 0, 0.2)'
                    }}
                >
                    <div className="container">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                <span style={{ color: 'white', fontWeight: '900', fontSize: '11px', letterSpacing: '2px', marginRight: '10px' }}>
                                    SELECT MAKE:
                                </span>
                                {vehicleMakes.map(make => (
                                    <motion.button
                                        key={make.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSelectedMake(selectedMake?.id === make.id ? null : make);
                                            setSelectedModel(null);
                                            setSelectedBrand(null);
                                        }}
                                        style={{
                                            padding: '10px 20px',
                                            background: selectedMake?.id === make.id ? 'white' : 'rgba(0,0,0,0.3)',
                                            color: selectedMake?.id === make.id ? 'var(--color-primary-red)' : 'white',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '8px',
                                            fontWeight: '800',
                                            fontSize: '11px',
                                            letterSpacing: '1px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {make.name.toUpperCase()}
                                    </motion.button>
                                ))}
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '700' }}>MY GARAGE</span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ===== MODEL SELECTOR ===== */}
            <AnimatePresence>
                {viewMode === 'vehicle' && selectedMake && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', padding: '20px 0' }}
                    >
                        <div className="container">
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}
                            >
                                <span style={{ fontWeight: '900', color: 'var(--color-gold)', marginRight: '15px', fontSize: '11px', letterSpacing: '2px' }}>
                                    SELECT MODEL:
                                </span>
                                {selectedMake.models.map(model => (
                                    <motion.button
                                        key={model}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, borderColor: 'var(--color-gold)' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedModel(selectedModel === model ? null : model)}
                                        style={{
                                            padding: '10px 18px',
                                            background: selectedModel === model ? 'var(--color-gold)' : 'rgba(255,255,255,0.03)',
                                            color: selectedModel === model ? 'black' : 'white',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: selectedModel === model ? '900' : '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {model}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== MAIN CONTENT ===== */}
            <div className="container" style={{ padding: '50px 2rem' }}>
                
                {/* BRAND VIEW */}
                <AnimatePresence mode="wait">
                    {viewMode === 'brand' && !selectedBrand && (
                        <motion.div
                            key="brand-index"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={fadeInUp}
                        >
                            {/* Featured Brand Logos */}
                            <motion.div variants={fadeInUp} style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '11px', fontWeight: '900', color: 'var(--color-gold)', marginBottom: '25px', letterSpacing: '3px' }}>
                                    FEATURED MANUFACTURERS
                                </h2>
                                <motion.div 
                                    variants={containerVariants}
                                    style={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
                                        gap: '15px',
                                        marginBottom: '50px'
                                    }}
                                >
                                    {featuredBrands.map(brand => (
                                        <motion.div 
                                            key={brand.name}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.03, borderColor: 'var(--color-gold)' }}
                                            onClick={() => setSelectedBrand(brand.name)}
                                            className="glass"
                                            style={{
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '12px',
                                                padding: '25px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            <span style={{ fontWeight: '900', fontSize: '14px', color: 'white', letterSpacing: '1px' }}>{brand.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Brand Index */}
                            <motion.div variants={fadeInUp}>
                                <h2 style={{ 
                                    fontSize: '2rem', 
                                    fontWeight: '300', 
                                    color: 'white', 
                                    textAlign: 'center', 
                                    marginBottom: '50px',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    paddingBottom: '25px'
                                }}>
                                    <span style={{ color: 'var(--color-gold)' }}>Brand</span> Index
                                </h2>
                                <motion.div 
                                    variants={containerVariants}
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 50px' }}
                                >
                                    {brands.sort().map(brand => (
                                        <motion.div 
                                            key={brand}
                                            variants={itemVariants}
                                            whileHover={{ x: 5 }}
                                            onClick={() => setSelectedBrand(brand)}
                                            style={{ 
                                                padding: '12px 0',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <span style={{ color: 'var(--color-gold)', fontWeight: '600' }} className="hover-red">{brand}</span>
                                            <span style={{ color: '#444', fontSize: '13px', fontWeight: '800' }}>({getBrandProductCount(brand)})</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* PRODUCT GRID */}
                {(selectedBrand || selectedMake) && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {/* Filter Header */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '40px',
                            paddingBottom: '25px',
                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
                                    {selectedBrand || (selectedMake && `${selectedMake.name} ${selectedModel || ''}`)}
                                    <span style={{ color: 'var(--color-primary-red)' }}> PARTS</span>
                                </h1>
                                <span style={{ color: '#666', fontSize: '13px', fontWeight: '700' }}>
                                    Showing {filteredProducts.length} components
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <div className="glass" style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden' }}>
                                    <button 
                                        onClick={() => setGridView(true)}
                                        style={{ 
                                            padding: '10px 15px', 
                                            background: gridView ? 'var(--color-primary-red)' : 'transparent',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Grid size={18} />
                                    </button>
                                    <button 
                                        onClick={() => setGridView(false)}
                                        style={{ 
                                            padding: '10px 15px', 
                                            background: !gridView ? 'var(--color-primary-red)' : 'transparent',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={clearAllFilters}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '10px 20px',
                                        background: 'rgba(255, 0, 0, 0.1)',
                                        border: '1px solid rgba(255, 0, 0, 0.3)',
                                        borderRadius: '8px',
                                        color: 'var(--color-primary-red)',
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        fontWeight: '800',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    <X size={14} /> CLEAR
                                </motion.button>
                            </div>
                        </div>

                        {/* Sidebar + Products */}
                        <div style={{ display: 'flex', gap: '40px' }}>
                            {/* Sidebar */}
                            <aside style={{ width: '240px', flexShrink: 0 }}>
                                <div className="glass" style={{ padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h3 style={{ fontSize: '11px', fontWeight: '900', marginBottom: '20px', color: 'var(--color-gold)', letterSpacing: '2px' }}>CATEGORIES</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {categories.map(cat => (
                                            <li key={cat} style={{ marginBottom: '12px' }}>
                                                <motion.button
                                                    whileHover={{ x: 5 }}
                                                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: activeCategory === cat ? 'var(--color-primary-red)' : '#888',
                                                        fontWeight: activeCategory === cat ? '800' : '500',
                                                        fontSize: '13px',
                                                        padding: 0,
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {cat}
                                                </motion.button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>

                            {/* Product Grid */}
                            <div style={{ flex: 1 }}>
                                <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: gridView ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr', 
                                        gap: '25px' 
                                    }}
                                >
                                    {filteredProducts.map(product => (
                                        <motion.div key={product.id} variants={itemVariants}>
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                                
                                {filteredProducts.length === 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ textAlign: 'center', padding: '80px', color: '#666' }}
                                    >
                                        <Target size={50} color="#333" style={{ marginBottom: '20px' }} />
                                        <p style={{ fontSize: '18px', fontWeight: '700' }}>No components found.</p>
                                        <p style={{ fontSize: '14px', marginTop: '10px' }}>Adjust your filters or search criteria.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Default: Show prompt */}
                {viewMode === 'vehicle' && !selectedMake && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', padding: '100px 20px' }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Car size={80} color="#333" style={{ marginBottom: '30px' }} />
                        </motion.div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '300', color: 'white', marginBottom: '15px' }}>
                            Select Your <span style={{ color: 'var(--color-gold)', fontWeight: '900' }}>Chassis</span>
                        </h2>
                        <p style={{ color: '#666', fontSize: '16px' }}>
                            Choose your make and model above to view compatible components
                        </p>
                    </motion.div>
                )}
            </div>

            {/* ===== VEHICLE PICKER MODAL ===== */}
            <AnimatePresence>
                {showVehiclePicker && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass cool-outline"
                            style={{
                                borderRadius: '24px',
                                padding: '40px',
                                width: '500px',
                                maxHeight: '80vh',
                                overflow: 'auto'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                                <h2 style={{ fontSize: '1.5rem', color: 'white', fontWeight: '900' }}>
                                    <span style={{ color: 'var(--color-gold)' }}>GARAGE</span> SELECT
                                </h2>
                                <motion.button 
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    onClick={() => setShowVehiclePicker(false)} 
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <X size={28} color="#888" />
                                </motion.button>
                            </div>
                            
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '800', color: 'var(--color-gold)', fontSize: '11px', letterSpacing: '2px' }}>MAKE</label>
                                <select 
                                    style={{ 
                                        width: '100%', 
                                        padding: '15px', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '12px', 
                                        fontSize: '14px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white'
                                    }}
                                    onChange={(e) => {
                                        const make = vehicleMakes.find(m => m.id === e.target.value);
                                        setSelectedMake(make || null);
                                    }}
                                >
                                    <option value="">Select Make</option>
                                    {vehicleMakes.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {selectedMake && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={{ marginBottom: '25px' }}
                                >
                                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '800', color: 'var(--color-gold)', fontSize: '11px', letterSpacing: '2px' }}>MODEL</label>
                                    <select 
                                        style={{ 
                                            width: '100%', 
                                            padding: '15px', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '12px', 
                                            fontSize: '14px',
                                            background: 'rgba(0,0,0,0.5)',
                                            color: 'white'
                                        }}
                                        onChange={(e) => setSelectedModel(e.target.value || null)}
                                    >
                                        <option value="">Select Model</option>
                                        {selectedMake.models.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </motion.div>
                            )}

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    if (selectedMake) {
                                        setSavedVehicle({ make: selectedMake.name, model: selectedModel || '' });
                                    }
                                    setShowVehiclePicker(false);
                                }}
                                className="bg-red"
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    borderRadius: '12px',
                                    fontWeight: '900',
                                    fontSize: '14px',
                                    letterSpacing: '2px',
                                    cursor: 'pointer'
                                }}
                            >
                                SAVE VEHICLE
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductList;
