import { createContext, useContext } from 'react';
import { AuthContext } from '@/contexts/JWTAuthContext';


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
