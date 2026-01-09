import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/useCart';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const subtotal = totalPrice;
    const shipping = subtotal > 399 || subtotal === 0 ? 0 : 29.99;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate order processing
        setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutSuccess(true);
            clearCart();
        }, 2000);
    };

    if (checkoutSuccess) {
        return (
            <div className="container text-center" style={{ padding: '120px 1rem' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid var(--color-gold)',
                        padding: '60px',
                        borderRadius: '24px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        boxShadow: '0 0 40px rgba(252, 207, 49, 0.1)'
                    }}
                >
                    <CheckCircle size={80} color="var(--color-gold)" style={{ marginBottom: '24px', filter: 'drop-shadow(0 0 10px rgba(252, 207, 49, 0.5))' }} />
                    <h1 style={{ fontSize: '36px', marginBottom: '16px', fontWeight: '900' }}>ORDER <span className="text-gold">CONFIRMED!</span></h1>
                    <p style={{ color: '#aaa', marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Your high-performance components are being prepared. You'll receive a confirmation email with tracking details shortly.
                    </p>
                    <Link to="/products">
                        <button className="bg-red" style={{ padding: '18px 48px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Continue Building
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container text-center" style={{ padding: '120px 1rem', minHeight: '60vh' }}>
                <ShoppingBag size={80} color="#333" style={{ marginBottom: '24px' }} />
                <h1 style={{ fontSize: '36px', marginBottom: '16px', fontWeight: '900' }}>YOUR <span className="text-red">CART</span> IS EMPTY</h1>
                <p style={{ color: '#888', marginBottom: '40px', fontSize: '1.2rem' }}>Looks like you haven't added any performance upgrades yet.</p>
                <Link to="/products">
                    <button className="bg-red" style={{ padding: '18px 48px', borderRadius: '12px', fontWeight: '900', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Browse Catalog
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ background: 'transparent', minHeight: '100vh', color: 'white' }}>
            <div className="container" style={{ padding: '60px 1.5rem 120px' }}>
            {/* Breadcrumb */}
            <div className="flex gap-2 items-center" style={{ fontSize: '13px', color: '#666', marginBottom: '40px' }}>
                <Link to="/" className="hover-red">Home</Link>
                <ChevronRight size={14} />
                <span style={{ color: 'var(--color-gold)' }}>Shopping Cart</span>
            </div>

            <h1 className="section-title" style={{ marginBottom: '50px', fontSize: '3rem' }}>SHOPPING <span className="text-red">CART</span></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '60px' }}>
                {/* Cart Items */}
                <div>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr 40px', gap: '20px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#666' }}>
                            <span>Component</span>
                            <span style={{ textAlign: 'center' }}>Price</span>
                            <span style={{ textAlign: 'center' }}>Qty</span>
                            <span style={{ textAlign: 'right' }}>Subtotal</span>
                            <span></span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {cartItems.map(item => (
                            <motion.div 
                                key={item.id} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-card" 
                                style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: '3fr 1fr 1fr 1fr 40px', 
                                    gap: '20px', 
                                    alignItems: 'center', 
                                    padding: '24px', 
                                    borderRadius: '16px', 
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    background: 'rgba(0,0,0,0.6)'
                                }}
                            >
                                <Link to={`/products/${item.id}`} className="flex items-center gap-6 group">
                                    <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="group-hover:scale-110" />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '6px', color: 'white' }}>{item.title}</h4>
                                        <p style={{ fontSize: '11px', color: 'var(--color-gold)', fontWeight: '900', letterSpacing: '1px' }}>ID: {item.sku || `VSS-00${item.id}`}</p>
                                    </div>
                                </Link>
                                <p style={{ textAlign: 'center', fontWeight: '900', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                                    {typeof item.price === 'string' ? item.price : `$${item.price.toLocaleString()}`}
                                </p>
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '10px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <Minus size={14} />
                                        </button>
                                        <span style={{ width: '30px', textAlign: 'center', fontWeight: '900', fontSize: '14px' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '10px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                                <p style={{ textAlign: 'right', fontWeight: '1000', color: 'var(--color-primary-red)', fontSize: '20px', textShadow: '0 0 15px rgba(210,41,49,0.3)' }}>
                                    ${((typeof item.price === 'string' ? parseFloat(item.price.replace(/[$, CAD, USD]/g, '')) : item.price) * item.quantity).toLocaleString()}
                                </p>
                                <button onClick={() => removeFromCart(item.id)} style={{ color: 'rgba(255,255,255,0.1)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }} className="hover-red">
                                    <Trash2 size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ marginTop: '50px' }}>
                        <Link to="/products" className="flex items-center gap-2 hover-red" style={{ color: '#666', fontSize: '14px', fontWeight: '700' }}>
                            ← CONTINUE SHOPPING
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="glass" style={{ backgroundColor: 'rgba(20,20,28,0.95)', padding: '40px', borderRadius: '24px', border: '1px solid var(--color-border-glass)', position: 'sticky', top: '150px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '30px', color: 'white', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>ORDER SUMMARY</h3>

                        <div className="flex justify-between mb-6">
                            <span style={{ color: '#888', fontWeight: '600' }}>Subtotal</span>
                            <span style={{ fontWeight: '700', color: 'white' }}>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className="flex justify-between mb-8">
                            <span style={{ color: '#888', fontWeight: '600' }}>Shipping</span>
                            <span style={{ fontWeight: '900', color: shipping === 0 ? '#4ade80' : 'white' }}>
                                {shipping === 0 ? 'FREE' : `$${shipping.toLocaleString()}`}
                            </span>
                        </div>

                        {shipping > 0 && (
                            <div style={{ fontSize: '12px', color: 'var(--color-gold)', marginBottom: '30px', padding: '15px', backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Info size={16} />
                                <span>Add ${(399 - subtotal).toLocaleString(undefined, { minimumFractionDigits: 2 })} more for <strong style={{ textDecoration: 'underline' }}>FREE Global Shipping</strong></span>
                            </div>
                        )}

                        <div style={{ borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginBottom: '40px' }}>
                            <div className="flex justify-between items-center">
                                <span style={{ fontWeight: '900', fontSize: '18px', color: 'white' }}>TOTAL</span>
                                <span style={{ fontWeight: '900', fontSize: '32px', color: 'var(--color-primary-red)', textShadow: '0 0 20px rgba(210,41,49,0.2)' }}>
                                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <p style={{ fontSize: '10px', color: '#555', textAlign: 'right', marginTop: '4px' }}>TAX INCLUDED AT CHECKOUT</p>
                        </div>

                        <button 
                            disabled={isCheckingOut}
                            onClick={handleCheckout}
                            className="bg-red" 
                            style={{ 
                                width: '100%', 
                                padding: '22px', 
                                fontWeight: '900', 
                                borderRadius: '12px', 
                                fontSize: '14px', 
                                textTransform: 'uppercase', 
                                letterSpacing: '2px',
                                boxShadow: '0 10px 30px rgba(210, 41, 49, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                opacity: isCheckingOut ? 0.7 : 1,
                                cursor: isCheckingOut ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isCheckingOut ? (
                                <>
                                    <RefreshCw className="animate-spin" size={20} /> SECURING ORDER...
                                </>
                            ) : (
                                <>
                                    PROCEED TO CHECKOUT <ArrowRight size={20} />
                                </>
                            )}
                        </button>

                        <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
                            <p style={{ textAlign: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '20px', fontWeight: '1000', letterSpacing: '2px' }}>SECURE PAYMENT GATEWAYS</p>
                            <div className="flex justify-center gap-3">
                                {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL'].map(p => (
                                    <span key={p} style={{ fontSize: '8px', fontWeight: '1000', color: 'var(--color-gold)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '2px 6px', borderRadius: '3px', letterSpacing: '1px' }}>{p}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
