import React, { useState, useRef } from 'react';
import { ShoppingBag, Zap, Eye, Heart, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { id, title, price, image, brand, category, originalPrice } = product;
    const [isHovered, setIsHovered] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(() => {
        const wishlist = JSON.parse(localStorage.getItem('vss_wishlist') || '[]');
        return wishlist.includes(id);
    });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);


    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; // -15 to 15 degrees
        const rotateY = ((x - centerX) / centerX) * 15; // -15 to 15 degrees
        
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const wishlist = JSON.parse(localStorage.getItem('vss_wishlist') || '[]');
        
        if (isWishlisted) {
            const updated = wishlist.filter(itemId => itemId !== id);
            localStorage.setItem('vss_wishlist', JSON.stringify(updated));
            setIsWishlisted(false);
            showToast('Removed from wishlist', 'info');
        } else {
            wishlist.push(id);
            localStorage.setItem('vss_wishlist', JSON.stringify(wishlist));
            setIsWishlisted(true);
            showToast('Added to wishlist!', 'success');
        }
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/${id}`);
    };

    const isOnSale = originalPrice && originalPrice !== price;
    
    return (
        <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                ref={cardRef}
                className={`glass-card gpu-layer card-animated hover-glow-red ${isHovered ? 'cool-outline' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border-glass)',
                    borderRadius: 'var(--border-radius-md)',
                    position: 'relative',
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
                    boxShadow: isHovered 
                        ? `${rotation.y * 2}px ${rotation.x * 2}px 40px rgba(255, 0, 0, 0.4)` 
                        : '0 4px 20px rgba(0, 0, 0, 0.3)'
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
                            onClick={handleWishlist}
                            className="ripple"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: isWishlisted ? 'rgba(255,0,0,0.9)' : 'rgba(0,0,0,0.8)',
                                border: `1px solid ${isWishlisted ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                transform: isWishlisted ? 'scale(1.1)' : 'scale(1)'
                            }}
                        >
                            <Heart size={16} fill={isWishlisted ? 'white' : 'none'} />
                        </button>
                        <button 
                            onClick={handleQuickView}
                            className="ripple"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'rgba(0,0,0,0.8)',
                                border: '1px solid rgba(212,175,55,0.3)',
                                color: 'var(--color-gold)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease'
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
