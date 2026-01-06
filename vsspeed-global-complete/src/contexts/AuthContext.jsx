import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkCredentials } from '../data/userDatabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('vsspeed_user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        const user = checkCredentials(username, password);
        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            localStorage.setItem('vsspeed_user', JSON.stringify(user));
            return { success: true };
        } else {
            return { success: false, error: 'Invalid Credentials / Access Denied' };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('vsspeed_user');
    };

    const value = {
        currentUser,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
