import React, { createContext, useState, useContext, useEffect } from 'react';

const VehicleContext = createContext();

export const useVehicle = () => useContext(VehicleContext);

export const VehicleProvider = ({ children }) => {
    const [vehicle, setVehicle] = useState({
        year: '',
        make: '',
        model: ''
    });

    // Generate years 1950-2026
    const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 2026 - i);

    // Comprehensive list of exotic and standard makes
    const makes = [
        "Audi", "BMW", "Mercedes-Benz", "Porsche", "Volkswagen", "Ferrari", "Lamborghini", 
        "McLaren", "Aston Martin", "Bugatti", "Pagani", "Koenigsegg", "Maserati", "Alfa Romeo",
        "Rolls-Royce", "Bentley", "Jaguar", "Land Rover", "Lotus", "Toyota", "Honda", "Nissan", 
        "Mazda", "Subaru", "Lexus", "Acura", "Infiniti", "Ford", "Chevrolet", "Dodge", "Tesla", "Other"
    ].sort();

    const updateVehicle = (field, value) => {
        setVehicle(prev => ({ ...prev, [field]: value }));
    };

    return (
        <VehicleContext.Provider value={{ vehicle, updateVehicle, years, makes }}>
            {children}
        </VehicleContext.Provider>
    );
};
