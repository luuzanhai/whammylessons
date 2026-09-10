import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import MobileBottomNav from '@/Components/MobileBottomNav';


export default function Welcome() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        /* Lớp 1: Khung ngoài cùng khóa cứng màn hình (overflow-hidden) */
            <div className={`flex h-screen w-full overflow-hidden font-sans relative transition-colors duration-300 ${
                isDarkMode ? 'bg-[#1a1a1a] text-gray-400' : 'bg-[#FBFBF9] text-gray-600'
            }`}>
                <Head title="Trang chủ" />

                {/* Lớp 2: Sidebar cho PC */}
                <Sidebar onDarkModeChange={setIsDarkMode} />

                {/* Lớp 4: Thanh Nav nổi ĐỘC LẬP bên ngoài thẻ main */}
                <MobileBottomNav active="home" />

            </div>
    );
}
