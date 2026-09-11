import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const menuItems = [
    {
        href: '/home',
        label: 'Overview',
        icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 20V10m7 10V4m7 16v-7" /></svg>,
    },
    {
        href: '/classes',
        label: 'Classes',
        icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 004 16.5v-11z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5.5v11M8 7h8m-8 4h8" /></svg>,
    },
    {
        href: '/alerts',
        label: 'Schedule Alerts',
        icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h4" /></svg>,
    },
];

export default function Sidebar({ isDarkMode = true, onDarkModeChange }) {
    const { url } = usePage();
    const [isExpanded, setIsExpanded] = useState(() => {
        const savedState = localStorage.getItem('whammy-sidebar-expanded');
        return savedState ? savedState === 'true' : true;
    });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [avatarError, setAvatarError] = useState(false);

    const toggleSidebar = () => {
        const nextState = !isExpanded;
        setIsExpanded(nextState);
        localStorage.setItem('whammy-sidebar-expanded', String(nextState));
    };

    return (
        <aside className={`relative hidden h-screen flex-col border-r shadow-2xl transition-colors duration-300 md:flex ${isExpanded ? 'w-64' : 'w-20'} ${isDarkMode ? 'border-gray-800 bg-[#1a1a1a] text-gray-400' : 'border-gray-200 bg-[#FBFBF9] text-gray-600'}`}>
            <div className="relative mb-2 flex items-center justify-between p-5">
                <div className="flex w-full items-center justify-center overflow-hidden">
                    <img src={isExpanded ? '/logo-full.webp' : '/logo-small.webp'} alt="Whammy" className={`object-contain transition-all duration-300 ${isExpanded ? 'h-12 w-full' : 'h-11 w-11'}`} />
                </div>
                <button type="button" aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'} onClick={toggleSidebar} className={`absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full p-1 shadow-md ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                    <svg className={`h-4 w-4 transition-transform duration-300 ${!isExpanded && 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </button>
            </div>

            <div className="mb-6 px-4">
                <div className={`flex items-center gap-3 rounded-xl p-2.5 ${isDarkMode ? 'bg-[#252525] hover:bg-[#333]' : 'bg-[#EBEBE8] hover:bg-[#E0E0DB]'} ${!isExpanded && 'justify-center'}`}>
                    <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    {isExpanded && <input type="text" placeholder="Search" className={`w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0 ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-black placeholder-gray-500'}`} />}
                </div>
            </div>

            <div className="hide-scrollbar flex min-w-0 flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto px-3">
                {isExpanded && <p className="mb-2 mt-2 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">Menu</p>}
                {menuItems.map((item) => <NavItem key={item.href} {...item} active={url.startsWith(item.href)} isDarkMode={isDarkMode} isExpanded={isExpanded} />)}
            </div>

            <div className="relative mt-auto p-4">
                {isSettingsOpen && <SettingsMenu isDarkMode={isDarkMode} isExpanded={isExpanded} onThemeChange={onDarkModeChange} />}
                <div className={`flex items-center gap-2 rounded-xl p-2 ${isDarkMode ? 'bg-[#252525]' : 'bg-[#EBEBE8]'}`}>
                    <Link href="/login" className={`flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1 transition-colors ${!isExpanded && 'justify-center'} ${isDarkMode ? 'hover:bg-[#333]' : 'hover:bg-gray-200'}`}>
                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 ${isDarkMode ? 'border-gray-700 bg-[#303030] text-gray-300' : 'border-gray-300 bg-gray-100 text-gray-600'}`}>
                            {avatarError ? (
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="User avatar">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a7.5 7.5 0 0115 0" />
                                </svg>
                            ) : (
                                <img src="/logo_website.png" alt="Avatar" onError={() => setAvatarError(true)} className="h-full w-full object-cover" />
                            )}
                        </div>
                        {isExpanded && <div className="min-w-0 overflow-hidden"><p className={`truncate whitespace-nowrap text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Username</p><p className="truncate whitespace-nowrap text-xs text-gray-500">Role</p></div>}
                    </Link>
                    <button type="button" aria-label="Settings" onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${isSettingsOpen ? (isDarkMode ? 'bg-white/15 text-white' : 'bg-gray-200 text-black') : (isDarkMode ? 'text-gray-400 hover:bg-[#333] hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-black')}`}>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35A1.724 1.724 0 005.383 7.75c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active, href, isExpanded, isDarkMode }) {
    return (
        <div className="group relative">
            <Link href={href} className={`flex h-12 items-center gap-3 rounded-xl px-3 transition-colors ${!isExpanded && 'justify-center'} ${active ? (isDarkMode ? 'bg-[#2d2d2d] text-white' : 'bg-gray-200 font-semibold text-black') : (isDarkMode ? 'hover:bg-[#252525] hover:text-white' : 'hover:bg-[#EBEBE8] hover:text-black')}`}>
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">{icon}</div>
                {isExpanded && <span className="flex-1 text-sm">{label}</span>}
            </Link>
            {!isExpanded && <div className={`invisible absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-bold opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 ${isDarkMode ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'}`}>{label}</div>}
        </div>
    );
}

function SettingsMenu({ isDarkMode, isExpanded, onThemeChange }) {
    return (
        <div className={`absolute bottom-20 z-50 w-56 rounded-xl border p-3 shadow-2xl ${isExpanded ? 'left-3' : 'left-full ml-2'} ${isDarkMode ? 'border-gray-700 bg-[#222222] text-white' : 'border-gray-200 bg-white text-black'}`}>
            <p className="px-2 pb-2 text-sm font-semibold">Settings</p>
            <div className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${isDarkMode ? 'bg-[#303030]' : 'bg-gray-100'}`}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2M4.93 4.93l1.42 1.42m11.3 11.3l1.42 1.42M3 12h2m14 0h2M4.93 19.07l1.42-1.42m11.3-11.3l1.42-1.42M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <span className="flex-1">Giao diện</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => onThemeChange?.(false)} className={`rounded-lg px-2 py-2 text-sm ${!isDarkMode ? 'bg-gray-200 text-black' : 'text-gray-400 hover:bg-white/10'}`}>Sáng</button>
                <button type="button" onClick={() => onThemeChange?.(true)} className={`rounded-lg px-2 py-2 text-sm ${isDarkMode ? 'bg-white/15 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Tối</button>
            </div>
        </div>
    );
}
