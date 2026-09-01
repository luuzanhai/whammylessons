import { Head } from '@inertiajs/react';
import Header from '@/Components/Header'; // Gọi Component Header vào đây

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-red-600 selection:text-white">
            <Head title="Trang chủ - Phong cách Fender" />

            {/* 1. HEADER 3 TẦNG VỪA TẠO */}
            <Header auth={auth} />

            



            {/* 5. FOOTER ĐƠN GIẢN */}
            <footer className="bg-[#111] text-gray-500 text-center py-12 font-raleway text-sm">
                <p>&copy; 2026 Whammy Lessons Guitar. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
