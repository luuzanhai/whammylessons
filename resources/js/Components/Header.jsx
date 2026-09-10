import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="w-full h-12 bg-[#1E1E1E] border-b border-[#333333] flex items-center justify-between px-4">

            {/* Cụm bên trái: Menu phụ (Giống mẫu Recents trong ảnh) */}
            <div className="flex items-center gap-1">
                <button className="text-white text-[13px] font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
                    Recents
                </button>
            </div>

            {/* Cụm bên phải: Nút Login & Sign Up */}
            <div className="flex items-center gap-2">

                {/* Nút Log in (Chỉ hiện nền mờ khi hover) */}
                <Link
                    href={route('login')}
                    className="flex items-center px-4 py-1.5 text-[13px] font-medium text-gray-200 bg-transparent hover:bg-white/10 hover:text-white rounded-full transition-colors border border-transparent"
                >
                    Log in
                </Link>

                {/* Nút Sign up (Có nền xám và icon màu giống hệt ảnh mẫu) */}
                <Link
                    href={route('register')}
                    className="flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium text-white bg-[#2C2C2C] hover:bg-[#3A3A3A] rounded-full transition-colors border border-[#3E3E3E] shadow-sm"
                >
                    {/* Icon bút vẽ màu xanh (Design) giả lập theo ảnh */}
                    <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 22l10-4 10 4L12 2zm0 6l5 10-5-2-5 2 5-10z" />
                    </svg>
                    Sign up
                </Link>

            </div>
        </header>
    );
}
