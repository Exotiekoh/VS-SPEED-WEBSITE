import React, { useState } from 'react';
import { ShoppingBag, Zap, Eye, Heart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { id, title, price, image, brand, category, originalPrice } = product;
    const [isHovered, setIsHovered] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const isOnSale = originalPrice && originalPrice !== price;
    
    return (
        <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                className={`glass-card gpu-layer card-animated hover-glow-red ${isHovered ? 'cool-outline' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border-glass)',
                    borderRadius: 'var(--border-radius-md)',
                    position: 'relative'
                }}
            >
                {/* Sale Badge */}
                {isOnSale && (
                    <div className="pulse-red" style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 10,
                        background: 'var(--color-primary-red)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '900',
                        letterSpacing: '1px'
                    }}>
                        SALE
                    </div>
                )}

                {/* Image Wrapper */}
                <div style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    height: '240px', 
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)', 
                    borderBottom: '1px solid var(--color-border-glass)' 
                }}>
                    {/* Brand Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 5,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(10px)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '900',
                        color: 'var(--color-gold)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        letterSpacing: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <Zap size={10} />
                        {brand || 'PERFORMANCE'}
                    </div>

                    {/* Quick Action Buttons */}
                    <div 
                        className={`fade-in-right`}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: isOnSale ? '70px' : '12px',
                            zIndex: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="ripple"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Heart size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="ripple"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Eye size={16} />
                        </button>
                    </div>

                    {/* Product Image */}
                    <img
                        src={image}
                        alt={title}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            padding: '20px',
                            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                        }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400/1a1a1a/d4af37?text=' + encodeURIComponent(title.split(' ').slice(0, 2).join('+'));
                        }}
                    />

                    {/* Stock Indicator */}
                    <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '700'
                    }}>
                        <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }} />
                        <span style={{ color: '#22c55e' }}>IN STOCK</span>
                    </div>
                </div>

                {/* Content Wrapper */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ 
                        fontSize: '10px', 
                        color: 'var(--color-gold)', 
                        fontWeight: '800', 
                        marginBottom: '8px', 
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {category}
                    </span>
                    <h3 style={{ 
                        fontSize: '1rem', 
                        marginBottom: '1rem', 
                        flex: 1, 
                        lineHeight: '1.4',
                        fontWeight: '700',
                        color: 'white'
                    }}>
                        {title}
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <div>
                            <span style={{ 
                                fontSize: '1.4rem', 
                                fontWeight: '900', 
                                color: 'var(--color-primary-red)' 
                            }}>
                                {price}
                            </span>
                            {isOnSale && originalPrice && (
                                <span style={{ 
                                    fontSize: '0.9rem', 
                                    color: '#666', 
                                    textDecoration: 'line-through',
                                    marginLeft: '10px'
                                }}>
                                    {originalPrice}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="btn-animated ripple"
                            style={{
                                background: isAdded ? '#22c55e' : 'var(--color-primary-red)',
                                color: 'white',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                boxShadow: isAdded ? '0 4px 15px rgba(34, 197, 94, 0.4)' : '0 4px 15px rgba(255, 0, 0, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                transform: isAdded ? 'scale(1.1)' : 'scale(1)'
                            }}
                        >
                            {isAdded ? <CheckCircle size={20} /> : <ShoppingBag size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
