// MOCK SECURE DATABASE
// In a real production environment, this would be a secure backend database (SQL/NoSQL).
// For this local simulation, we use a hashed-style structure.

export const authorizedUsers = [
    {
        id: 'admin_001',
        username: 'admin',
        password: 'password123',
        role: 'admin',
        accessLevel: 'CLEARANCE_LEVEL_5',
        name: 'Commander',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        joinDate: 'Jan 2024',
        reputation: 9999
    },
    {
        id: 'user_001',
        username: 'driver',
        password: 'speed',
        role: 'user',
        accessLevel: 'CLEARANCE_LEVEL_1',
        name: 'Test Driver',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Driver',
        joinDate: 'Feb 2024',
        reputation: 450
    }
];

export const checkCredentials = (username, password) => {
    const user = authorizedUsers.find(u => u.username === username && u.password === password);
    if (user) {
        // Return user without password
        const { password, ...safeUser } = user;
        return safeUser;
    }
    return null;
};
