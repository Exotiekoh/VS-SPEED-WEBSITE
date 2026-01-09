import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { id, title, price, image, brand, category } = product;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };
    
    return (
        <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div
                whileHover={{ y: -8, borderColor: 'var(--color-gold)', boxShadow: '0 10px 30px rgba(252, 207, 49, 0.2)' }}
                className="glass-card gpu-layer"
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border-glass)',
                    transition: 'all 0.3s ease-out'
                }}
            >
                {/* Image Wrapper */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '240px', background: '#12121a', borderBottom: '1px solid var(--color-border-glass)' }}>
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 5,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '800',
                        color: 'var(--color-gold)',
                        border: '1px solid var(--color-gold)'
                    }}>
                        <Zap size={10} style={{ display: 'inline', marginRight: '4px' }} />
                        {brand || 'PERFORMANCE'}
                    </div>
                    <img
                        src={image}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="product-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400/111/d4af37?text=' + encodeURIComponent(title.split(' ').slice(0, 2).join('+'));
                        }}
                    />
                </div>

                {/* Content Wrapper */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '10px', color: '#d4af37', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase' }}>
                        {category}
                    </span>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', flex: 1, lineHeight: '1.4' }}>{title}</h3>

                    <div className="flex justify-between items-center" style={{ marginTop: 'auto' }}>
                        <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--color-primary-red)' }}>
                            {price}
                        </span>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAddToCart}
                            style={{
                                background: 'var(--color-primary-red)',
                                color: 'white',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(255, 60, 60, 0.4)'
                            }}
                        >
                            <ShoppingBag size={20} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
