import { useEffect, useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import MobileNav from '@/Components/MobileNav';

export default function MainLayout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('whammy-theme');
        return savedTheme ? savedTheme === 'dark' : true;
    });

    useEffect(() => {
        localStorage.setItem('whammy-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#FBFBF9] text-black'}`}>

            {/* Thanh điều hướng cố định */}
            <Sidebar isDarkMode={isDarkMode} onDarkModeChange={setIsDarkMode} />
            <MobileNav isDarkMode={isDarkMode} />

            {/* Khu vực nội dung sẽ được Inertia tự động "bơm" vào biến children */}
            <main className={`min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-20 md:pt-10 p-4 md:p-10 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <div className={`border rounded-2xl p-8 min-h-[50vh] ${isDarkMode ? 'bg-[#1E1E1E] border-[#333]' : 'bg-white border-gray-200'}`}>
                    {children}
                </div>
            </main>

        </div>
    );
}
