import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback(({ message, type = 'info', duration = 3000 }) => {
        const id = Date.now() + Math.random();
        const newToast = { id, message, type, duration };
        
        setToasts(prev => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(toast => toast.id !== id));
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message, duration) => {
        return showToast({ message, type: 'success', duration });
    }, [showToast]);

    const error = useCallback((message, duration) => {
        return showToast({ message, type: 'error', duration });
    }, [showToast]);

    const info = useCallback((message, duration) => {
        return showToast({ message, type: 'info', duration });
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ showToast, removeToast, success, error, info }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            pointerEvents: 'none'
        }}>
            <AnimatePresence>
                {toasts.map(toast => (
                    <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const Toast = ({ toast, onClose }) => {
    const { message, type } = toast;

    const config = {
        success: {
            icon: CheckCircle,
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'rgba(16, 185, 129, 0.5)',
            iconColor: '#10b981'
        },
        error: {
            icon: AlertCircle,
            gradient: 'linear-gradient(135deg, #ff3c3c 0%, #d2232a 100%)',
            border: 'rgba(255, 60, 60, 0.5)',
            iconColor: '#ff3c3c'
        },
        info: {
            icon: Info,
            gradient: 'linear-gradient(135deg, #d4af37 0%, #fccf31 100%)',
            border: 'rgba(212, 175, 55, 0.5)',
            iconColor: '#d4af37'
        }
    };

    const { icon: Icon, gradient, border } = config[type] || config.info;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
                background: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${border}`,
                borderRadius: '12px',
                padding: '16px 20px',
                minWidth: '300px',
                maxWidth: '400px',
                boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px ${border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                pointerEvents: 'auto'
            }}
        >
            <div style={{
                minWidth: '40px',
                height: '40px',
                borderRadius: '50%',
                background: gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 15px ${border}`
            }}>
                <Icon size={20} color="white" />
            </div>

            <div style={{ flex: 1 }}>
                <p style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '1.5',
                    margin: 0
                }}>
                    {message}
                </p>
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#888',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <X size={16} />
            </motion.button>
        </motion.div>
    );
};

export default ToastProvider;
