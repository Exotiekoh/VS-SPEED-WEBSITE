import React, { createContext, useState, useContext, useEffect } from 'react';

const VehicleContext = createContext();

export const useVehicle = () => useContext(VehicleContext);

export const VehicleProvider = ({ children }) => {
    const [vehicle, setVehicle] = useState({
        year: '',
        make: '',
        model: ''
    });

    // Generate years 1941-2026 (full range for all vehicles)
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: currentYear - 1940}, (_, i) => currentYear - i);

    // Comprehensive list - ALL makes supported
    const makes = [
        "AC", "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", 
        "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroen", "Datsun",
        "DeLorean", "Dodge", "Edsel", "Ferrari", "Fiat", "Ford", "Genesis", "GMC",
        "Honda", "Hummer", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia",
        "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", 
        "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "Mercury", "MG",
        "Mini", "Mitsubishi", "Nissan", "Oldsmobile", "Opel", "Packard", "Pagani",
        "Peugeot", "Plymouth", "Pontiac", "Porsche", "Ram", "Renault", "Rivian",
        "Rolls-Royce", "Saab", "Saturn", "Scion", "Seat", "Skoda", "Smart", 
        "Studebaker", "Subaru", "Suzuki", "Tesla", "Toyota", "Triumph", "Volkswagen",
        "Volvo", "Other"
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
