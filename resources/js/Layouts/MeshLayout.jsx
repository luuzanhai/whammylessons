import { useState } from 'react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export default function MeshLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="relative flex h-screen bg-[#060605] overflow-hidden text-white font-sans">

            {/* LỚP 1: CÁC ĐỐM SÁNG (z-0, pointer-events-none để không cản trở click chuột) */}
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#FFB000] rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] opacity-40 animate-pulse pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#FF7700] rounded-full mix-blend-screen filter blur-[150px] md:blur-[200px] opacity-40 pointer-events-none z-0"></div>
            <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-[#FFD985] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none z-0"></div>

            {/* LỚP 2: LỚP PHỦ KHI MỞ MENU TRÊN ĐIỆN THOẠI */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* LỚP 3: SIDEBAR (z-50) */}
            <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar />
            </div>

            {/* LỚP 4: HEADER VÀ NỘI DUNG CHÍNH (z-10) */}
            <div className="relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>

        </div>
    );
}
