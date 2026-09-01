import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <MainLayout>
            <Head title="Trang chủ" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">

                {/* 1. KIỂM TRA ĐĂNG NHẬP BẰNG AUTH */}
                {auth.user ? (
                    <h1 className="text-2xl font-bold text-green-600 mb-4">
                        Xin chào, {auth.user.name}! Chào mừng anh quay lại.
                    </h1>
                ) : (
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Chào mừng Whammy Lessons Guitar!
                    </h1>
                )}


                {/* 2. HIỂN THỊ NÚT NẾU CHƯA ĐĂNG NHẬP */}
                {!auth.user && (
                    <div className="mb-8 space-x-4">
                        <Link
                            href={route('login')}
                            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded transition"
                        >
                            Đăng nhập ngay
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-5 py-2 rounded transition"
                        >
                            Đăng ký
                        </Link>
                    </div>
                )}

                <div className="p-4 bg-gray-50 rounded-md inline-block">
                    <h2 className="font-raleway text-sm font-medium text-gray-900 mb-2">Ảnh Logo đang test:</h2>
                    <img
                        src="/logo_website.png"
                        alt="Logo Whammy"
                        className="w-32 h-auto rounded shadow-sm"
                    />
                </div>

                <div className="mt-8 text-sm text-gray-400">
                    Hệ thống đang chạy trên Laravel v{laravelVersion} (PHP v{phpVersion})
                </div>
            </div>
        </MainLayout>
    );
}
