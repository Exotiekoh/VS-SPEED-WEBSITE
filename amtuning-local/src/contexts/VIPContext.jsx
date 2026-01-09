import React, { createContext, useState, useContext, useEffect } from 'react';

const VIPContext = createContext();

export const useVIP = () => {
    const context = useContext(VIPContext);
    if (!context) {
        throw new Error('useVIP must be used within a VIPProvider');
    }
    return context;
};

// Trial duration: 1 hour (3600000 milliseconds)
const TRIAL_DURATION = 3600000;

// Device fingerprint for IP-based tracking
const getDeviceFingerprint = () => {
    return `${navigator.userAgent}_${screen.width}x${screen.height}_${navigator.language}`;
};

// Monthly promotions rotation
const getMonthlyPromo = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const promos = [
        { code: 'VIPJAN2026', dealerDiscount: 15, shopBonus: '$50 off $300+' },
        { code: 'VIPFEB2026', dealerDiscount: 12, shopBonus: '$40 off $250+' },
        { code: 'VIPMAR2026', dealerDiscount: 18, shopBonus: '$60 off $350+' },
        { code: 'VIPAPR2026', dealerDiscount: 15, shopBonus: '$55 off $300+' },
        { code: 'VIPMAY2026', dealerDiscount: 20, shopBonus: '$75 off $400+' },
        { code: 'VIPJUN2026', dealerDiscount: 15, shopBonus: '$50 off $300+' },
        { code: 'VIPJUL2026', dealerDiscount: 17, shopBonus: '$65 off $350+' },
        { code: 'VIPAUG2026', dealerDiscount: 15, shopBonus: '$50 off $300+' },
        { code: 'VIPSEP2026', dealerDiscount: 16, shopBonus: '$60 off $325+' },
        { code: 'VIPOCT2026', dealerDiscount: 20, shopBonus: '$80 off $450+' },
        { code: 'VIPNOV2026', dealerDiscount: 22, shopBonus: '$90 off $500+' },
        { code: 'VIPDEC2026', dealerDiscount: 25, shopBonus: '$100 off $500+' }
    ];
    return promos[month];
};

export const VIPProvider = ({ children }) => {
    const [vipData, setVipData] = useState(() => {
        const saved = localStorage.getItem('vss_vip_data');
        return saved ? JSON.parse(saved) : {
            isVIP: false,
            trialStartTime: null,
            trialUsed: false,
            subscriptionExpiry: null,
            email: null
        };
    });

    const [showVIPModal, setShowVIPModal] = useState(false);
    const [trialTimeRemaining, setTrialTimeRemaining] = useState(null);

    // Check if trial has been used on this device
    useEffect(() => {
        const fingerprint = getDeviceFingerprint();
        const usedTrials = JSON.parse(localStorage.getItem('vss_used_trials') || '[]');
        
        if (usedTrials.includes(fingerprint) && !vipData.isVIP) {
            setVipData(prev => ({ ...prev, trialUsed: true }));
        }
    }, []);

    // Trial timer
    useEffect(() => {
        if (!vipData.isVIP && vipData.trialStartTime) {
            const updateTimer = () => {
                const elapsed = Date.now() - vipData.trialStartTime;
                const remaining = Math.max(0, TRIAL_DURATION - elapsed);
                
                setTrialTimeRemaining(remaining);
                
                if (remaining <= 0) {
                    // Trial expired
                    setShowVIPModal(true);
                }
            };
            
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        }
    }, [vipData.trialStartTime, vipData.isVIP]);

    // Save VIP data to localStorage
    useEffect(() => {
        localStorage.setItem('vss_vip_data', JSON.stringify(vipData));
    }, [vipData]);

    const startTrial = () => {
        const fingerprint = getDeviceFingerprint();
        const usedTrials = JSON.parse(localStorage.getItem('vss_used_trials') || '[]');
        
        if (!usedTrials.includes(fingerprint)) {
            usedTrials.push(fingerprint);
            localStorage.setItem('vss_used_trials', JSON.stringify(usedTrials));
            
            setVipData(prev => ({
                ...prev,
                trialStartTime: Date.now(),
                trialUsed: false
            }));
        }
    };

    const activateVIP = (email, subscriptionMonths = 1) => {
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + subscriptionMonths);
        
        setVipData({
            isVIP: true,
            trialStartTime: null,
            trialUsed: true,
            subscriptionExpiry: expiry.getTime(),
            email: email
        });
    };

    const cancelVIP = () => {
        setVipData({
            isVIP: false,
            trialStartTime: null,
            trialUsed: true,
            subscriptionExpiry: null,
            email: vipData.email
        });
    };

    const hasAIAccess = () => {
        // VIP members always have access
        if (vipData.isVIP) {
            return { hasAccess: true, reason: 'vip' };
        }
        
        // Check if trial is active
        if (vipData.trialStartTime && !vipData.trialUsed) {
            const elapsed = Date.now() - vipData.trialStartTime;
            if (elapsed < TRIAL_DURATION) {
                return { hasAccess: true, reason: 'trial', timeRemaining: trialTimeRemaining };
            }
        }
        
        return { hasAccess: false, reason: 'expired' };
    };

    const formatTimeRemaining = (ms) => {
        if (!ms) return '0:00';
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const monthlyPromo = getMonthlyPromo();

    const value = {
        isVIP: vipData.isVIP,
        vipData,
        showVIPModal,
        setShowVIPModal,
        trialTimeRemaining,
        monthlyPromo,
        startTrial,
        activateVIP,
        cancelVIP,
        hasAIAccess,
        formatTimeRemaining
    };

    return (
        <VIPContext.Provider value={value}>
            {children}
        </VIPContext.Provider>
    );
};
