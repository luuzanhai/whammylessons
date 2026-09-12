import { useEffect, useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import MobileNav from '@/Components/MobileNav';

export default function Layout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('whammy-theme');
        return savedTheme ? savedTheme === 'dark' : true;
    });

    useEffect(() => {
        localStorage.setItem('whammy-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#FBFBF9] text-black'}`}>
            <Sidebar isDarkMode={isDarkMode} onDarkModeChange={setIsDarkMode} />
            <MobileNav isDarkMode={isDarkMode} />

            <main className={`min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-16 md:pt-0 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {children}
            </main>
        </div>
    );
}
