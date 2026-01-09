import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl overflow-hidden rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X size={24} className="text-white" />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image Section */}
                            <div className="md:w-1/2 relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-80 md:h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
                            </div>

                            {/* Content Section */}
                            <div className="md:w-1/2 p-8 flex flex-col justify-between">
                                {/* Category Badge */}
                                <div>
                                    <span 
                                        className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4"
                                        style={{
                                            background: 'var(--color-gold)',
                                            color: 'black'
                                        }}
                                    >
                                        {product.category}
                                    </span>

                                    <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                                        {product.title}
                                    </h2>

                                    <p className="text-white/60 mb-6">
                                        {product.description || 'Premium performance part for JDM & German vehicles.'}
                                    </p>

                                    <div className="text-3xl font-black text-red-500 mb-8">
                                        {product.price}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all"
                                        style={{
                                            background: 'var(--color-primary-red)',
                                            color: 'white'
                                        }}
                                        onClick={onClose}
                                    >
                                        <ExternalLink size={18} />
                                        View Full Details
                                    </Link>

                                    <div className="flex gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all"
                                            style={{
                                                background: 'transparent',
                                                border: '2px solid var(--color-gold)',
                                                color: 'var(--color-gold)'
                                            }}
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-3 rounded-xl transition-all"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <Heart size={20} className="text-white/60" />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
