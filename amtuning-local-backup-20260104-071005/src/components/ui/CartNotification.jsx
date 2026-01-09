import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Cart context for global cart management
export const useCart = () => {
    const [items, setItems] = useState([]);
    const [notification, setNotification] = useState(null);

    const addToCart = (product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        setNotification({
            type: 'add',
            product,
            message: 'Added to cart!'
        });

        setTimeout(() => setNotification(null), 3000);
    };

    const removeFromCart = (productId) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const getTotal = () => {
        return items.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
            return sum + (price * item.quantity);
        }, 0);
    };

    const getItemCount = () => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    };

    return { items, addToCart, removeFromCart, getTotal, getItemCount, notification, setNotification };
};

// Toast notification component
const CartNotification = ({ notification, onClose }) => {
    if (!notification) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <div 
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                    }}
                >
                    {/* Success Icon */}
                    <div 
                        className="p-2 rounded-full"
                        style={{ background: 'var(--color-primary-red)' }}
                    >
                        <Check size={20} className="text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <p className="text-white font-bold text-sm">
                            {notification.message}
                        </p>
                        <p className="text-white/60 text-xs">
                            {notification.product?.title?.substring(0, 30)}...
                        </p>
                    </div>

                    {/* View Cart Button */}
                    <Link 
                        to="/cart"
                        className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                        style={{
                            background: 'var(--color-gold)',
                            color: 'black'
                        }}
                    >
                        View Cart
                    </Link>

                    {/* Close */}
                    <button 
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CartNotification;
