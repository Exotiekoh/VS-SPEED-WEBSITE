import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { products, categories, brands } from '../data/productDatabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion as Motion } from 'framer-motion';


const ProductList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    
    const searchQuery = params.get('search') || '';
    const activeCategory = params.get('category') || null;
    const activeBrand = params.get('brand') || null;
    const currentPage = parseInt(params.get('page') || '1', 10);
    
    const ITEMS_PER_PAGE = 12;

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

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const updateParams = (newParams) => {
        const nextParams = new URLSearchParams(location.search);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === '') {
                nextParams.delete(key);
            } else {
                nextParams.set(key, value);
            }
        });
        // Always reset to page 1 unless specifically setting the page
        if (!newParams.page) {
            nextParams.set('page', '1');
        }
        navigate(`/products?${nextParams.toString()}`);
    };

    const handleSearchChange = (val) => {
        updateParams({ search: val });
    };

    const handleCategoryChange = (cat) => {
        updateParams({ 
            category: activeCategory === cat ? null : cat,
            brand: null 
        });
    };

    const handleBrandChange = (brand) => {
        updateParams({ 
            brand: activeBrand === brand ? null : brand,
            category: null 
        });
    };

    const handlePageChange = (page) => {
        const nextParams = new URLSearchParams(location.search);
        nextParams.set('page', page.toString());
        navigate(`/products?${nextParams.toString()}`);
    };

    const clearFilters = () => {
        navigate('/products');
    };


    return (
        <div style={{ background: 'transparent', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '50px 1rem' }}>
            <div className="flex gap-4 mb-8" style={{ fontSize: '13px', color: '#666', marginBottom: '30px', fontWeight: '900' }}>
                <Link to="/" className="hover-red">HOME</Link>
                <span style={{ color: '#333' }}>/</span>
                <span style={{ color: 'var(--color-gold)' }}>ALL PRODUCTS</span>
            </div>

            <h1 className="section-title" style={{ marginBottom: '20px' }}>All Products</h1>

            <div style={{ display: 'flex', gap: '40px' }}>
                {/* Sidebar */}
                <aside style={{ width: '250px', flexShrink: 0 }}>
                    {/* Search */}
                    <div style={{ marginBottom: '30px' }}>
                        <input
                            type="text"
                            placeholder="Search arsenal..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="glass-card"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '14px',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Categories */}
                    <div className="glass-card" style={{ 
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
                                        onClick={() => handleCategoryChange(cat)}
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            color: activeCategory === cat ? 'var(--color-gold)' : '#666', 
                                            cursor: 'pointer', 
                                            fontSize: '13px',
                                            textAlign: 'left',
                                            padding: 0,
                                            transition: 'color 0.2s',
                                            fontWeight: activeCategory === cat ? '900' : '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
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
                    <div className="glass-card" style={{ 
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
                                        onClick={() => handleBrandChange(brand)}
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            color: activeBrand === brand ? 'var(--color-gold)' : '#666', 
                                            cursor: 'pointer', 
                                            fontSize: '13px',
                                            textAlign: 'left',
                                            padding: 0,
                                            transition: 'color 0.2s',
                                            fontWeight: activeBrand === brand ? '900' : '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
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
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
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

                    <Motion.div 
                        key={currentPage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                            gap: '24px',
                            marginBottom: '40px'
                        }}
                    >
                        {paginatedProducts.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </Motion.div>

                    {filteredProducts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                            <p style={{ fontSize: '18px', marginBottom: '12px' }}>No products found</p>
                            <p style={{ fontSize: '14px' }}>Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            gap: '10px',
                            marginTop: '40px'
                        }}>
                            <Motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                style={{
                                    background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(212,175,55,0.2)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                    color: currentPage === 1 ? '#444' : 'var(--color-gold)',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontWeight: '700',
                                    fontSize: '14px'
                                }}
                            >
                                <ChevronLeft size={18} />
                                Previous
                            </Motion.button>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                {[...Array(totalPages)].map((_, i) => {
                                    const pageNum = i + 1;
                                    const showPage = pageNum === 1 || 
                                                    pageNum === totalPages || 
                                                    Math.abs(pageNum - currentPage) <= 1;
                                    
                                    if (!showPage) {
                                        if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                                            return <span key={i} style={{ color: '#666', padding: '0 8px' }}>...</span>;
                                        }
                                        return null;
                                    }

                                    return (
                                        <Motion.button
                                            key={i}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handlePageChange(pageNum)}
                                            style={{
                                                background: currentPage === pageNum 
                                                    ? 'linear-gradient(135deg, var(--color-gold) 0%, #b8941e 100%)'
                                                    : 'rgba(255,255,255,0.05)',
                                                border: currentPage === pageNum
                                                    ? '1px solid var(--color-gold)'
                                                    : '1px solid rgba(255,255,255,0.1)',
                                                color: currentPage === pageNum ? 'black' : 'white',
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: '900',
                                                fontSize: '14px',
                                                transition: 'all 0.2s',
                                                boxShadow: currentPage === pageNum 
                                                    ? '0 0 20px rgba(212, 175, 55, 0.4)' 
                                                    : 'none'
                                            }}
                                        >
                                            {pageNum}
                                        </Motion.button>
                                    );
                                })}
                            </div>

                            <Motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                style={{
                                    background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(212,175,55,0.2)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                    color: currentPage === totalPages ? '#444' : 'var(--color-gold)',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontWeight: '700',
                                    fontSize: '14px'
                                }}
                            >
                                Next
                                <ChevronRight size={18} />
                            </Motion.button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProductList;
