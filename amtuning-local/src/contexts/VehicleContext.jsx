/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const VehicleContext = createContext();

export const useVehicle = () => useContext(VehicleContext);

export const VehicleProvider = ({ children }) => {
    const [vehicle, setVehicle] = useState(() => {
        const saved = localStorage.getItem('vsspeed_vehicle');
        return saved ? JSON.parse(saved) : { year: '', make: '', model: '' };
    });

    const [installedParts, setInstalledParts] = useState(() => {
        const saved = localStorage.getItem('vsspeed_installed_parts');
        return saved ? JSON.parse(saved) : [];
    });

    const [engineImages, setEngineImages] = useState(() => {
        const saved = localStorage.getItem('vsspeed_engine_images');
        return saved ? JSON.parse(saved) : [null, null, null, null];
    });

    const [aiUsageCount, setAiUsageCount] = useState(() => {
        const saved = localStorage.getItem('vsspeed_ai_usage');
        return saved ? parseInt(saved) : 0;
    });

    const [hasSubscription, setHasSubscription] = useState(() => {
        const saved = localStorage.getItem('vsspeed_subscription');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('vsspeed_vehicle', JSON.stringify(vehicle));
    }, [vehicle]);

    useEffect(() => {
        localStorage.setItem('vsspeed_installed_parts', JSON.stringify(installedParts));
    }, [installedParts]);

    useEffect(() => {
        localStorage.setItem('vsspeed_engine_images', JSON.stringify(engineImages));
    }, [engineImages]);

    useEffect(() => {
        localStorage.setItem('vsspeed_ai_usage', aiUsageCount.toString());
    }, [aiUsageCount]);

    useEffect(() => {
        localStorage.setItem('vsspeed_subscription', hasSubscription.toString());
    }, [hasSubscription]);

    // Generate years 1950-2026
    const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

    // Comprehensive list of exotic and standard makes
    const makes = [
        "Audi", "BMW", "Mercedes-Benz", "Porsche", "Volkswagen", "Ferrari", "Lamborghini", 
        "McLaren", "Aston Martin", "Bugatti", "Pagani", "Koenigsegg", "Maserati", "Alfa Romeo",
        "Rolls-Royce", "Bentley", "Jaguar", "Land Rover", "Lotus", "Toyota", "Honda", "Nissan", 
        "Mazda", "Subaru", "Lexus", "Acura", "Infiniti", "Ford", "Chevrolet", "Dodge", "Tesla", "Other"
    ].sort();

    // Part categories
    const partCategories = [
        "Engine", "Brakes", "Suspension", "Exhaust", "Intake", "Turbo/Supercharger",
        "Fuel System", "Cooling", "Drivetrain", "Interior", "Exterior", "Electronics", "Other"
    ];

    const updateVehicle = (field, value) => {
        setVehicle(prev => ({ ...prev, [field]: value }));
    };

    const addPart = (part) => {
        const newPart = {
            id: Date.now(),
            ...part,
            dateAdded: new Date().toISOString()
        };
        setInstalledParts(prev => [...prev, newPart]);
    };

    const removePart = (partId) => {
        setInstalledParts(prev => prev.filter(p => p.id !== partId));
    };

    const updatePart = (partId, updates) => {
        setInstalledParts(prev => prev.map(p => p.id === partId ? { ...p, ...updates } : p));
    };

    const addEngineImage = (index, imageData) => {
        setEngineImages(prev => {
            const newImages = [...prev];
            newImages[index] = imageData;
            return newImages;
        });
    };

    const removeEngineImage = (index) => {
        setEngineImages(prev => {
            const newImages = [...prev];
            newImages[index] = null;
            return newImages;
        });
    };

    const incrementAiUsage = () => {
        setAiUsageCount(prev => prev + 1);
    };

    const activateSubscription = () => {
        setHasSubscription(true);
    };

    const getVehicleSummary = () => {
        if (!vehicle.make) return null;
        return {
            vehicle: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            partsCount: installedParts.length,
            hasImages: engineImages.some(img => img !== null),
            imageCount: engineImages.filter(img => img !== null).length,
            // Return actual images for AI consumption
            images: engineImages.filter(img => img !== null) 
        };
    };

    return (
        <VehicleContext.Provider value={{ 
            vehicle, 
            updateVehicle, 
            years, 
            makes,
            installedParts,
            addPart,
            removePart,
            updatePart,
            partCategories,
            engineImages,
            addEngineImage,
            removeEngineImage,
            aiUsageCount,
            hasSubscription,
            incrementAiUsage,
            activateSubscription,
            getVehicleSummary
        }}>
            {children}
        </VehicleContext.Provider>
    );
};
