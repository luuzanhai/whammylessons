import { Link } from '@inertiajs/react';

export default function Header({ auth }) {
    return (
        <header className="w-full flex flex-col font-sans">

            {/* 1. THANH MÀU ĐEN TRÊN CÙNG (TOP BAR) */}
            <div className="bg-[#111111] text-white text-xs flex items-center justify-between px-4 md:px-8 py-2.5 font-montserrat tracking-wide">
                <div className="flex space-x-6">
                    <a href="#" className="font-bold border-b-2 border-white pb-0.5">Whammy</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Guitar SV Shop</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hidden sm:inline-block">SV Studio</a>
                </div>
                <div className="hidden lg:block text-gray-300">
                    Play now <span className="font-bold text-white"></span> - <a href="#" className="underline hover:text-white transition-colors duration-200">Learn More</a>
                </div>
            </div>

            {/* 2. THANH Ở GIỮA (LOGO - TÌM KIẾM - ICONS) */}
            <div className="bg-white flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-100">
                {/* Logo bên trái */}
                <Link href="/" className="flex-shrink-0 mr-4">
                    <img src="/logo_whammy.png" alt="Whammy Logo" className="h-10 w-auto" />
                </Link>

                {/* Thanh tìm kiếm ở giữa (Ẩn trên mobile, hiện trên màn hình lớn) */}
                <div className="flex-1 max-w-4xl mx-4 lg:mx-12 relative hidden md:block">
                    <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="What can we help you find?"
                        className="w-full bg-[#f4f4f4] text-sm text-gray-900 rounded-full py-3.5 pl-12 pr-6 border-transparent focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
                    />
                </div>

                {/* Cụm Icon bên phải (Vị trí, Đăng nhập, Giỏ hàng) */}
                <div className="flex items-center space-x-5 flex-shrink-0 text-gray-800">
                    {/* Icon Vị trí */}
                    <button className="hover:text-red-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    {/* Icon Tài khoản / Đăng nhập */}
                    <Link href={route('login')} className="hover:text-red-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Link>

                    {/* Icon Giỏ hàng */}
                    <button className="hover:text-red-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 3. THANH ĐIỀU HƯỚNG DƯỚI CÙNG (NAVIGATION BARS) */}
            <nav className="bg-white px-4 md:px-8 py-3 flex items-center justify-between text-[13.5px] font-bold text-gray-900 border-b border-gray-200 overflow-x-auto hide-scrollbar hidden lg:flex">
                {/* Menu chính bên trái */}
                <div className="font-montserrat font-semibold flex space-x-7 whitespace-nowrap tracking-wide">
                    <a href="#" className="hover:text-red-600 transition-colors">New</a>
                    <a href="#" className="hover:text-red-600 transition-colors">Electric Guitars</a>
                    <a href="#" className="hover:text-red-600 transition-colors">Acoustics</a>
                    <a href="#" className="hover:text-red-600 transition-colors">Amps & Effects</a>

                </div>

                {/* Dropdown Menu bên phải */}
                <div className="flex space-x-7 whitespace-nowrap ml-8 tracking-wide">
                    <a href="#" className="flex items-center hover:text-red-600 transition-colors group">
                        Learn
                        <svg className="w-4 h-4 ml-1 text-gray-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </a>
                    <a href="#" className="flex items-center hover:text-red-600 transition-colors group">
                        Articles
                        <svg className="w-4 h-4 ml-1 text-gray-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </a>
                    <a href="#" className="flex items-center hover:text-red-600 transition-colors group">
                        Guides
                        <svg className="w-4 h-4 ml-1 text-gray-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </a>
                    <a href="#" className="hover:text-red-600 transition-colors">Help</a>
                </div>
            </nav>

        </header>
    );
}
