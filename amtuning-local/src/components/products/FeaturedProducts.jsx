import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, ArrowRight } from 'lucide-react';
import e9xWidebody from '../../assets/e9x-widebody.jpg';
import lpfpE9x from '../../assets/lpfp-e9x.jpg';

const FeaturedProducts = () => {
    const featuredProducts = [
        {
            id: 101,
            title: 'BMW E9X Widebody Kit',
            price: 'Inquire',
            image: e9xWidebody,
            category: 'Body Kits',
            badge: 'NEW'
        },
        {
            id: 102,
            title: 'E9X/E8X In-Tank Fuel Filter',
            price: '$614.99 CAD',
            image: lpfpE9x,
            category: 'LPFP',
            badge: 'HOT'
        }
    ];

    return (
        <section className="py-20" style={{ background: 'var(--color-bg-deep)' }}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 
                        className="text-4xl font-black mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #fff 0%, var(--color-gold) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        FEATURED PARTS
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Hand-picked performance upgrades for JDM & German enthusiasts
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Link 
                                to={`/products/${product.id}`}
                                className="block group"
                            >
                                <div 
                                    className="relative overflow-hidden rounded-2xl"
                                    style={{
                                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {/* Badge */}
                                    {product.badge && (
                                        <div 
                                            className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full"
                                            style={{
                                                background: product.badge === 'NEW' 
                                                    ? 'var(--color-primary-red)' 
                                                    : 'var(--color-gold)',
                                                color: product.badge === 'NEW' ? 'white' : 'black'
                                            }}
                                        >
                                            {product.badge}
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="relative h-80 overflow-hidden">
                                        <img 
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div 
                                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className="text-xs text-gold uppercase tracking-widest font-bold">
                                            {product.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mt-2 mb-4 group-hover:text-gold transition-colors">
                                            {product.title}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-black text-red-500">
                                                {product.price}
                                            </span>
                                            <motion.div
                                                whileHover={{ x: 5 }}
                                                className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors"
                                            >
                                                View Details
                                                <ArrowRight size={16} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link 
                        to="/products"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all"
                        style={{
                            background: 'transparent',
                            border: '2px solid var(--color-gold)',
                            color: 'var(--color-gold)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-gold)';
                            e.currentTarget.style.color = 'black';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--color-gold)';
                        }}
                    >
                        <ShoppingBag size={20} />
                        View All Products
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
