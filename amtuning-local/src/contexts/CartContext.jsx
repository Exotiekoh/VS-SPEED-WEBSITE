import React, { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('vsspeed_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('vsspeed_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const qtyToAdd = product.quantity || 1;
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item
                );
            }
            // Remove quantity from product if it exists to avoid confusion, then add it back with qtyToAdd
            const { quantity: _quantity, ...productData } = product;
            return [...prevItems, { ...productData, quantity: qtyToAdd }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const totalPrice = cartItems.reduce((total, item) => {
        const price = typeof item.price === 'string' 
            ? parseFloat(item.price.replace(/[$, CAD, USD]/g, '')) 
            : item.price;
        return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
