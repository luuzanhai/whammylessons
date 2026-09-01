export default function Header({ onMenuClick }) {
    return (
        <header className="bg-white shadow h-16 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center">
                {/* Nút Hamburger chỉ hiện trên điện thoại (md:hidden) */}
                <button
                    onClick={onMenuClick}
                    className="mr-4 text-gray-500 hover:text-gray-700 md:hidden focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Quản trị</h2>
            </div>

            <div className="flex items-center">
                <span className="hidden sm:inline-block text-gray-600 mr-4">Xin chào, Admin</span>
                <img src="/logo_website.png" alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200" />
            </div>
        </header>
    );
}
