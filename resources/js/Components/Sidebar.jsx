import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ onDarkModeChange }) {
    // State quản lý việc mở rộng (true) hay thu gọn (false)
    const [isExpanded, setIsExpanded] = useState(true);
    // State quản lý chế độ Giao diện Tối/Sáng
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <aside
            className={`hidden md:flex relative flex-col h-screen transition-colors duration-300 ease-in-out border-r shadow-2xl ${
                isExpanded ? 'w-64' : 'w-20'
            } ${
                isDarkMode
                    ? 'bg-[#1a1a1a] text-gray-400 border-gray-800'
                    : 'bg-[#FBFBF9] text-gray-600 border-gray-200'
            }`}
        >
            {/* --- 1. HEADER (LOGO & NÚT TOGGLE) --- */}
            <div className="flex items-center justify-between p-5 mb-2">
                <div className="flex items-center justify-center w-full overflow-hidden">
                    <img
                        src={isExpanded ? '/logo-full.png' : '/logo-small.png'}
                        alt="Whammy"
                        className={`object-contain transition-all duration-300 ${isExpanded ? 'w-full h-12' : 'w-9 h-9'}`}
                    />
                </div>

                {/* Nút Toggle Cửa sổ (< / >) */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`absolute -right-3 top-6 rounded-full p-1 shadow-md transition-transform z-50 flex items-center justify-center w-6 h-6 ${
                        isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${!isExpanded && 'rotate-180'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* --- 2. THANH TÌM KIẾM --- */}
            <div className="px-4 mb-6">
                <div className={`flex items-center gap-3 rounded-xl p-2.5 transition-all ${
                    isDarkMode ? 'bg-[#252525] hover:bg-[#333]' : 'bg-[#EBEBE8] hover:bg-[#E0E0DB]'
                } ${!isExpanded && 'justify-center cursor-pointer'}`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {isExpanded && (
                        <input
                            type="text"
                            placeholder="Search"
                            className={`bg-transparent border-none text-sm w-full focus:outline-none focus:ring-0 p-0 ${
                                isDarkMode ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-500'
                            }`}
                        />
                    )}
                </div>
            </div>

            {/* --- 3. MENU CHÍNH --- */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar flex flex-col gap-1 px-3">
                {isExpanded && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2 mt-2">Menu</p>}

                <NavItem isDarkMode={isDarkMode} isExpanded={isExpanded} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} label="Home" />
                <NavItem isDarkMode={isDarkMode} isExpanded={isExpanded} active icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>} label="Classes" />
                <NavItem isDarkMode={isDarkMode} isExpanded={isExpanded} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="Schedule Alerts" />

                </div>

            {/* --- 4. PROFILE, THEME TOGGLE & LOGOUT --- */}
            <div className="p-4 mt-auto">
                {isExpanded && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-3">Profile</p>}

                {/* Thông tin User */}
                <div className={`flex items-center gap-3 mb-4 ${!isExpanded && 'justify-center'}`}>
                    <img src="/logo_website.png" alt="Avatar" className={`w-9 h-9 rounded-full object-cover border-2 flex-shrink-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                    {isExpanded && (
                        <div className="flex-1 overflow-hidden">
                            <p className={`text-sm font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-black'}`}>Username</p>
                            <p className="text-gray-500 text-xs whitespace-nowrap">Role</p>
                        </div>
                    )}
                </div>

                {/* Nút Đổi màu Giao diện (Theme Toggle) */}
                <button
                    onClick={() => {
                        const nextDarkMode = !isDarkMode;
                        setIsDarkMode(nextDarkMode);
                        onDarkModeChange?.(nextDarkMode);
                    }}
                    className={`w-full flex items-center gap-3 transition-colors rounded-xl p-3 mb-2 text-sm font-medium ${!isExpanded && 'justify-center'} ${
                        isDarkMode
                            ? 'bg-[#252525] hover:bg-[#333] text-gray-400 hover:text-white'
                            : 'bg-[#EBEBE8] hover:bg-[#E0E0DB] text-gray-600 hover:text-black'
                    }`}
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    ) : (
                        <svg className="w-5 h-5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    )}
                    {isExpanded && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
                </button>

                {/* Nút Log out */}
                <button className={`w-full flex items-center gap-3 hover:bg-red-500 hover:text-white transition-colors rounded-xl p-3 text-sm font-medium ${!isExpanded && 'justify-center'} ${
                    isDarkMode ? 'bg-[#252525] text-gray-400' : 'bg-[#EBEBE8] text-gray-600'
                }`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    {isExpanded && <span>Log out</span>}
                </button>
            </div>
        </aside>
    );
}

// Component con xử lý mục Menu & Tooltip
function NavItem({ icon, label, active, badge, isExpanded, isDarkMode }) {
    return (
        <div className="relative group">
            <a
                href="#"
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${!isExpanded && 'justify-center'} ${
                    active
                        ? (isDarkMode ? 'bg-[#2d2d2d] text-white' : 'bg-gray-200 text-black font-semibold')
                        : (isDarkMode ? 'hover:bg-[#252525] hover:text-white' : 'hover:bg-[#EBEBE8] hover:text-black')
                }`}
            >
                <div className="flex-shrink-0">{icon}</div>

                {isExpanded && (
                    <div className="flex-1 flex justify-between items-center whitespace-nowrap overflow-hidden">
                        <span className="text-sm">{label}</span>
                        {badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                            }`}>{badge}</span>
                        )}
                    </div>
                )}
            </a>

            {/* Tooltip phong cách bong bóng */}
            {!isExpanded && (
                <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 text-sm font-bold px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl z-50 ${
                    isDarkMode ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'
                }`}>
                    {label}
                    {/* Hình tam giác nhỏ thò ra bên trái */}
                    <div className={`absolute top-1/2 -left-1.5 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-[6px] ${
                        isDarkMode ? 'border-r-white' : 'border-r-[#1a1a1a]'
                    }`}></div>
                </div>
            )}
        </div>
    );
}
