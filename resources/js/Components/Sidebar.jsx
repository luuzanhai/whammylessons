import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Tooltip from '@/Components/Tooltip';
import Grain from '@/Components/Grain';

const menuItems = [
    {
        href: '/home',
        label: 'Overview',
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 20V10m7 10V4m7 16v-7" />
            </svg>
        ),
    },
    {
        href: '/classes',
        label: 'Classes',
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 004 16.5v-11z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5.5v11M8 7h8m-8 4h8" />
            </svg>
        ),
    },
    {
        href: '/gallery',
        label: 'Gallery',
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h4" />
            </svg>
        ),
    },
];

export default function Sidebar({ isDarkMode = true, onDarkModeChange }) {
    let currentUrl = '';
    let authUser = null;
    try {
        const page = usePage();
        currentUrl = page?.url || '';
        authUser = page?.props?.auth?.user || null;
    } catch {
        currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    }

    const normalizedCurrentUrl = (currentUrl || '/').split('?')[0] || '/';
    const activeUrl = normalizedCurrentUrl === '/' ? '/home' : normalizedCurrentUrl;
    const isAdmin = Number(authUser?.role) === 1;
    const roleLabel = { 0: 'Khách', 1: 'Admin', 2: 'Học viên' }[Number(authUser?.role)] || 'Khách';

    const [isExpanded, setIsExpanded] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('whammy-sidebar-expanded');
            return savedState ? savedState === 'true' : true;
        }
        return true;
    });

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [avatarError, setAvatarError] = useState(false);

    const toggleSidebar = () => {
        const nextState = !isExpanded;
        setIsExpanded(nextState);
        try {
            localStorage.setItem('whammy-sidebar-expanded', String(nextState));
        } catch (e) {
            console.warn('Cannot write to localStorage', e);
        }
    };

    return (
        <aside
            className={`font-montserrat relative z-40 hidden h-screen flex-col border-r shadow-2xl transition-all duration-300 md:flex ${
                isExpanded ? 'w-64' : 'w-20'
            } ${
                isDarkMode
                    ? 'border-gray-800 bg-[#1a1a1a] text-gray-400'
                    : 'border-gray-200 bg-[#FBFBF9] text-gray-600'
            }`}
        >
            {/* ── Lớp phủ hạt mè (Grain Texture) ── */}
            <Grain
                opacity={isDarkMode ? 0.16 : 0.08}
                blend={isDarkMode ? 'screen' : 'multiply'}
            />

            {/* Khung nội dung chính */}
            <div className="relative z-10 flex h-full flex-col">
                {/* Logo Block */}
                <div className="relative mb-2 flex items-center justify-between p-5">
                    <div className="flex w-full items-center justify-center overflow-hidden">
                        <img
                            src={isExpanded ? '/logo-full.webp' : '/logo-small.webp'}
                            alt="Whammy"
                            className={`object-contain transition-all duration-300 ${
                                isExpanded ? 'h-12 w-full' : 'h-11 w-11'
                            }`}
                        />
                    </div>
                    <button
                        type="button"
                        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                        onClick={toggleSidebar}
                        className={`absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full p-1 shadow-md transition-transform duration-200 hover:scale-110 ${
                            isDarkMode
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-black text-white hover:bg-gray-800'
                        }`}
                    >
                        <svg
                            className={`h-4 w-4 transition-transform duration-300 ${
                                !isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* ── Search Box Nổi bật ── */}
                <div className="mb-5 px-3">
                    <div
                        className={`group flex items-center gap-3 rounded-xl p-2.5 shadow-sm transition-all duration-200 ${
                            isDarkMode
                                ? 'border border-gray-700/70 bg-[#242424] shadow-black/20 focus-within:border-white/40 focus-within:bg-[#2c2c2c] focus-within:ring-2 focus-within:ring-white/10 hover:border-gray-600'
                                : 'border border-gray-300/80 bg-white shadow-gray-200/50 focus-within:border-black/40 focus-within:ring-2 focus-within:ring-black/5 hover:border-gray-400'
                        } ${!isExpanded ? 'justify-center' : ''}`}
                    >
                        <svg
                            className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                                isDarkMode ? 'text-gray-400 group-focus-within:text-white' : 'text-gray-500 group-focus-within:text-black'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {isExpanded && (
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`w-full border-none bg-transparent p-0 text-sm font-normal normal-case tracking-normal focus:outline-none focus:ring-0 ${
                                    isDarkMode
                                        ? 'text-white placeholder-gray-500'
                                        : 'text-black placeholder-gray-400'
                                }`}
                            />
                        )}
                    </div>
                </div>

                {/* ── Danh sách Menu: Đã sửa overflow để không bị cắt tooltip khi thu gọn ── */}
                <div
                    className={`hide-scrollbar flex min-w-0 flex-1 flex-col gap-1.5 px-3 ${
                        isExpanded ? 'overflow-y-auto overflow-x-hidden' : 'overflow-visible'
                    }`}
                >
                    {isExpanded && (
                        <p className="mb-2 mt-1 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Menu
                        </p>
                    )}
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.href}
                            {...item}
                            active={activeUrl ? activeUrl.startsWith(item.href) : false}
                            isDarkMode={isDarkMode}
                            isExpanded={isExpanded}
                        />
                    ))}
                </div>

                {/* ── Footer User Profile ── */}
                <div className="relative mt-auto p-4">
                    {isSettingsOpen && (
                        <SettingsMenu
                            isDarkMode={isDarkMode}
                            isExpanded={isExpanded}
                            onThemeChange={onDarkModeChange}
                        />
                    )}
                    <div
                        className={`flex items-center gap-2 rounded-xl p-2 backdrop-blur-sm ${
                            !isExpanded ? 'flex-col-reverse' : ''
                        } ${isDarkMode ? 'bg-[#252525]/85' : 'bg-[#EBEBE8]/85'}`}
                    >
                        <Link
                            href={authUser ? (isAdmin ? '/dashboard' : '/home') : '/login'}
                            className={`flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1 transition-colors ${
                                !isExpanded ? 'justify-center' : ''
                            } ${isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-200'}`}
                        >
                            <div
                                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 ${
                                    isDarkMode
                                        ? 'border-gray-700 bg-[#303030] text-gray-300'
                                        : 'border-gray-300 bg-gray-100 text-gray-600'
                                }`}
                            >
                                {avatarError ? (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a7.5 7.5 0 0115 0" />
                                    </svg>
                                ) : (
                                    <img
                                        src="/logo_website.png"
                                        alt="Avatar"
                                        onError={() => setAvatarError(true)}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            {isExpanded && (
                                <div className="min-w-0 overflow-hidden text-left">
                                    <p className={`truncate text-sm font-semibold normal-case tracking-normal ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                        {authUser?.name || 'Log in'}
                                    </p>
                                    <p className="truncate text-xs font-normal normal-case tracking-normal text-gray-500">
                                        {authUser ? roleLabel : 'Role'}
                                    </p>
                                </div>
                            )}
                        </Link>
                        <button
                            type="button"
                            aria-label="Settings"
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={`flex ${
                                isExpanded ? 'h-9 w-9' : 'h-11 w-11'
                            } flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isSettingsOpen
                                    ? isDarkMode
                                        ? 'bg-white/15 text-white'
                                        : 'bg-gray-200 text-black'
                                    : isDarkMode
                                    ? 'text-gray-400 hover:bg-[#333] hover:text-white'
                                    : 'text-gray-600 hover:bg-gray-200 hover:text-black'
                            }`}
                        >
                            <svg className={isExpanded ? 'h-5 w-5' : 'h-7 w-7'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35A1.724 1.724 0 005.383 7.75c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active, href, isExpanded, isDarkMode }) {
    return (
        <Tooltip
            content={label}
            position="right"
            disabled={isExpanded} // Khi sidebar mở rộng thì tự tắt tooltip
        >
            <Link
                href={href}
                aria-label={label}
                className={`flex h-14 w-full items-center gap-3.5 rounded-xl px-3 transition-colors ${
                    !isExpanded ? 'justify-center' : ''
                } ${
                    active
                        ? isDarkMode
                            ? 'bg-[#2d2d2d] text-white'
                            : 'bg-gray-200 text-black'
                        : isDarkMode
                        ? 'text-gray-400 hover:bg-[#252525] hover:text-white'
                        : 'text-gray-600 hover:bg-[#EBEBE8] hover:text-black'
                }`}
            >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">{icon}</div>
                {isExpanded && (
                    <h1 className="truncate pr-1 font-montserrat text-lg font-black uppercase tracking-[-0.08em]">
                        {label}
                    </h1>
                )}
            </Link>
        </Tooltip>
    );
}

function SettingsMenu({ isDarkMode, isExpanded, onThemeChange }) {
    return (
        <div
            className={`absolute bottom-20 z-50 w-56 overflow-hidden rounded-xl border p-3 text-left font-normal normal-case tracking-normal shadow-2xl backdrop-blur-md ${
                isExpanded ? 'left-3' : 'left-full ml-2'
            } ${
                isDarkMode
                    ? 'border-gray-700 bg-[#222222]/95 text-white'
                    : 'border-gray-200 bg-white/95 text-black'
            }`}
        >
            <Grain
                opacity={isDarkMode ? 0.12 : 0.06}
                blend={isDarkMode ? 'screen' : 'multiply'}
            />
            <div className="relative z-10">
                <p className="px-2 pb-2 text-sm font-semibold">Settings</p>
                <div
                    className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                        isDarkMode ? 'bg-[#303030]' : 'bg-gray-100'
                    }`}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2M4.93 4.93l1.42 1.42m11.3 11.3l1.42 1.42M3 12h2m14 0h2M4.93 19.07l1.42-1.42m11.3-11.3l1.42-1.42M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="flex-1">Theme</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => onThemeChange?.(false)}
                        className={`rounded-lg px-2 py-2 text-sm font-semibold transition-colors ${
                            !isDarkMode
                                ? 'bg-gray-200 text-black'
                                : 'text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        Light
                    </button>
                    <button
                        type="button"
                        onClick={() => onThemeChange?.(true)}
                        className={`rounded-lg px-2 py-2 text-sm font-semibold transition-colors ${
                            isDarkMode
                                ? 'bg-white/15 text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        Dark
                    </button>
                </div>
            </div>
        </div>
    );
}

