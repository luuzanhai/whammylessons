import { Link } from '@inertiajs/react';

export default function Sidebar({ activeMenu = 'Guitars' }) {
    // Danh sách menu (tùy chỉnh theo shop của anh)
    const menus = [
        'Trang chủ',
        'Lớp học',
        'Bài học',
        'Đăng nhập'
    ];

    return (
        <aside className="w-64 bg-white flex-shrink-0 py-12 px-10 flex flex-col">

            {/* Logo tối giản */}
            <div className="mb-16 ml-3">
                <Link href="/" className="font-montserrat text-2xl font-extrabold tracking-tighter text-black lowercase">
                    whammy.
                </Link>
            </div>

            {/* Menu Navigation */}
            <nav className="flex flex-col space-y-5">
                {menus.map((menu, index) => {
                    const isActive = menu === activeMenu;

                    return (
                        <Link
                            key={index}
                            href="#"
                            className="flex items-center group cursor-pointer"
                        >
                            {/* Dấu chấm tròn (Bullet) */}
                            <span
                                className={`w-4 text-2xl leading-none -mt-1 transition-opacity duration-200 ${
                                    isActive ? 'text-black opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100'
                                }`}
                            >
                                •
                            </span>

                            {/* Tên danh mục */}
                            <span
                                className={`font-raleway text-[15px] transition-colors duration-200 ${
                                    isActive ? 'font-bold text-black' : 'font-medium text-gray-400 group-hover:text-gray-600'
                                }`}
                            >
                                {menu}
                            </span>
                        </Link>
                    );
                })}
            </nav>

        </aside>
    );
}
