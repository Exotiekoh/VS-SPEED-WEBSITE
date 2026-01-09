/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { checkCredentials } from '../data/userDatabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('vsspeed_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('vsspeed_user');
    });

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
            {children}
        </AuthContext.Provider>
    );
};
