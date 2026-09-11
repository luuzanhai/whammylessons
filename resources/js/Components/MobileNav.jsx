import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function MobileNav({ isDarkMode = true }) {
    // State quản lý Đóng/Mở toàn bộ menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // State quản lý việc xổ xuống của từng dòng trong To-do list
    const [activeAccordion, setActiveAccordion] = useState('CLASSES');

    const menuItems = [
        { id: 'HOME', label: 'Home' },
        { id: 'CLASSES', label: 'Classes' },
        { id: 'ALERTS', label: 'Schedule Alerts' },
        { id: 'SETTINGS', label: 'Settings' },
    ];

    // Lấy ngày tháng hiện tại (Mô phỏng theo ảnh mẫu)
    const currentDate = "September 11, 2026 - 10:07am";

    return (
        /* Vỏ bọc ngoài cùng: Chỉ hiện trên Mobile (md:hidden) */
        <div className="md:hidden">

            {/* --- 1. MOBILE HEADER (Luôn cố định trên cùng) --- */}
            <header className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 z-50 transition-colors duration-300 ${
                isMenuOpen ? 'bg-[#222222] border-b-transparent' : 'bg-[#1a1a1a] border-b border-gray-800'
            }`}>

                {/* Nút 3 gạch (Hamburger) / Nút X */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-white focus:outline-none"
                >
                    <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Logo ở giữa */}
                <Link href="/" className="flex items-center justify-center w-32 h-10">
                    <img
                        src="/logo-full.webp"
                        alt="Whammy"
                        className="w-full h-full object-contain"
                    />
                </Link>

                {/* Nút Tìm kiếm */}
                <button className="p-2 text-white focus:outline-none hover:bg-white/10 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </header>


            {/* --- 2. MENU TO-DO LIST (Trượt từ trái sang) --- */}
            <div className={`fixed inset-0 bg-[#222222] text-white z-40 pt-16 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>

                {/* Khu vực ngày tháng */}
                <div className="px-6 pt-6 pb-8">
                    <h2 className="font-sans text-sm font-medium opacity-50 mb-1 tracking-widest uppercase">
                        Whammy Dashboard
                    </h2>
                    <p className="font-sans text-xs opacity-40">
                        {currentDate}
                    </p>
                </div>

                {/* Danh sách Stacked/Accordion */}
                <div className="flex flex-col w-full border-t border-gray-500/30">
                    {menuItems.map((item) => {
                        const isActive = activeAccordion === item.id;

                        return (
                            <div key={item.id} className="w-full border-b border-gray-500/30 flex flex-col">

                                {/* Dòng tiêu đề */}
                                <button
                                    onClick={() => setActiveAccordion(isActive ? null : item.id)}
                                    className="w-full text-left px-6 py-6 flex justify-between items-center group"
                                >
                                    <h1 className={`font-montserrat text-4xl sm:text-5xl font-black uppercase tracking-tighter transition-opacity duration-300 ${
                                        isActive ? 'opacity-100' : 'opacity-40'
                                    }`}>
                                        {item.label}
                                    </h1>
                                </button>

                                {/* Ruột bên trong (Xổ xuống) */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out px-6 ${
                                    isActive ? 'max-h-[400px] pb-8 opacity-100' : 'max-h-0 opacity-0'
                                }`}>

                                    {item.id === 'CLASSES' && (
                                        <div className="flex flex-col gap-4 font-raleway mt-2">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-2 border-gray-400 text-[#FF7700] focus:ring-0 bg-transparent cursor-pointer" />
                                                <span className="text-lg transition-colors line-through opacity-50 text-gray-300 group-hover:text-white">
                                                    Acoustic Beginners
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-400 text-[#FF7700] focus:ring-0 bg-transparent cursor-pointer" />
                                                <span className="text-lg transition-colors text-gray-300 group-hover:text-white">
                                                    Electric Lead Masterclass
                                                </span>
                                            </label>
                                            <button className="text-sm text-left opacity-40 hover:opacity-100 mt-4 transition-opacity">
                                                + Add a new class...
                                            </button>
                                        </div>
                                    )}

                                    {item.id !== 'CLASSES' && (
                                        <p className="opacity-50 text-sm font-raleway italic">
                                            No items to display.
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
