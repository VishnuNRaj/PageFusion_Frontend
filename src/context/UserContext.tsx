import { IUser } from '@/hooks/useEssentials';
import { createContext } from 'preact';
import { ReactNode } from 'preact/compat';
import { useContext, useState } from 'preact/hooks';
import Cookies from 'js-cookie';

interface UserContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const logout = () => {
        setUser(null);
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
