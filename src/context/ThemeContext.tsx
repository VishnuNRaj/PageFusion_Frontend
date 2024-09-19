import { useContext, useEffect, useState } from 'preact/hooks';
import { createContext, ReactNode } from "preact/compat"

interface DarkModeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        localStorage.setItem("theme", darkMode === true ? false.toString() : true.toString())
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        setDarkMode(localStorage.getItem("theme") === "true")
    }, [])

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};
