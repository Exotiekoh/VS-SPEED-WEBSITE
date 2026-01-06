import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories, brands } from '../data/productDatabase';


const ProductList = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeBrand, setActiveBrand] = useState(null);
    
    // Sync search query from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search');
        if (search) {
            setSearchQuery(search);
            setActiveCategory(null);
            setActiveBrand(null);
        }
    }, [location.search]);

    // Filter products based on search, category and brand
    const filteredProducts = products.filter(p => {
        // 1. Text Search (if exists)
        const matchesSearch = searchQuery 
            ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            : true;

        // 2. Brand Filter (if exists)
        const matchesBrand = activeBrand ? p.brand === activeBrand : true;

        // 3. Category Filter (if exists)
        const matchesCategory = activeCategory ? p.category === activeCategory : true;

        return matchesSearch && matchesBrand && matchesCategory;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setActiveCategory(null);
        setActiveBrand(null);
        // Clear URL search params
        const url = new URL(window.location);
        url.searchParams.delete('search');
        window.history.replaceState({}, '', url);
    };


    return (
        <div className="container" style={{ padding: '50px 1rem' }}>
            <div className="flex gap-4 mb-8" style={{ fontSize: '13px', color: '#888', marginBottom: '30px' }}>
                <Link to="/" className="hover-red">Home</Link>
                <span>/</span>
                <span style={{ color: '#333' }}>All Products</span>
            </div>

            <h1 className="section-title" style={{ marginBottom: '20px' }}>All Products</h1>

            <div style={{ display: 'flex', gap: '40px' }}>
                {/* Sidebar */}
                <aside style={{ width: '250px', flexShrink: 0 }}>
                    {/* Search */}
                    <div style={{ marginBottom: '30px' }}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Categories */}
                    <div style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '8px', 
                        padding: '20px', 
                        marginBottom: '24px' 
                    }}>
                        <h3 style={{ 
                            fontSize: '13px', 
                            fontWeight: '700', 
                            textTransform: 'uppercase', 
                            letterSpacing: '1px', 
                            marginBottom: '16px',
                            color: '#d4af37'
                        }}>Categories</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {categories.map((cat, i) => (
                                <li key={i}>
                                    <button 
                                        onClick={() => {
                                            setActiveCategory(activeCategory === cat ? null : cat);
                                            setActiveBrand(null);
                                        }}
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            color: activeCategory === cat ? '#d4af37' : '#aaa', 
                                            cursor: 'pointer', 
                                            fontSize: '13px',
                                            textAlign: 'left',
                                            padding: 0,
                                            transition: 'color 0.2s',
                                            fontWeight: activeCategory === cat ? '800' : '400'
                                        }}
                                        className="hover-gold"
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brands */}
                    <div style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '8px', 
                        padding: '20px' 
                    }}>
                        <h3 style={{ 
                            fontSize: '13px', 
                            fontWeight: '700', 
                            textTransform: 'uppercase', 
                            letterSpacing: '1px', 
                            marginBottom: '16px',
                            color: '#d4af37'
                        }}>Brands</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {brands.map((brand, i) => (
                                <li key={i}>
                                    <button 
                                        onClick={() => {
                                            setActiveBrand(activeBrand === brand ? null : brand);
                                            setActiveCategory(null);
                                        }}
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            color: activeBrand === brand ? '#d4af37' : '#aaa', 
                                            cursor: 'pointer', 
                                            fontSize: '13px',
                                            textAlign: 'left',
                                            padding: 0,
                                            transition: 'color 0.2s',
                                            fontWeight: activeBrand === brand ? '800' : '400'
                                        }}
                                        className="hover-gold"
                                    >
                                        {brand}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Products Grid */}
                <div style={{ flex: 1 }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: '30px',
                        paddingBottom: '20px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <span style={{ color: '#888', fontSize: '14px' }}>
                            Showing {filteredProducts.length} of {products.length} products
                            {activeBrand && <span style={{ color: '#d4af37' }}> | Brand: {activeBrand}</span>}
                            {activeCategory && <span style={{ color: '#d4af37' }}> | Category: {activeCategory}</span>}
                        </span>
                        {(searchQuery || activeBrand || activeCategory) && (
                            <button 
                                onClick={clearFilters}
                                style={{
                                    background: 'rgba(210,41,49,0.2)',
                                    border: '1px solid rgba(210,41,49,0.3)',
                                    color: '#ff6b6b',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    <div 
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                            gap: '24px' 
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                            <p style={{ fontSize: '18px', marginBottom: '12px' }}>No products found</p>
                            <p style={{ fontSize: '14px' }}>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
