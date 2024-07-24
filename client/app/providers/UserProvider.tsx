"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCurrentUser, User } from '../actions/getCurrentUser';

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserContextProvider');
    }
    return context;
}

export default function UserContextProvider({ children, user: initialUser }: { children: ReactNode; user: User | null }) {
    const [user, setUser] = useState<User | null>(null);
    console.log(user)
    useEffect(() => {

    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
