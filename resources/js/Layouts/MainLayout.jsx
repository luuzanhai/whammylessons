import { useState } from 'react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export default function MainLayout({ children }) {
    // State quản lý trạng thái đóng/mở menu trên mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

            {/* Lớp phủ đen làm mờ nền khi mở menu trên điện thoại */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)} // Bấm ra ngoài sẽ tự đóng menu
                ></div>
            )}

            {/* Cột Sidebar */}
            {/* Trên điện thoại: Trượt vào/ra nhờ transform. Trên máy tính (md): Luôn hiển thị cứng */}
            <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar />
            </div>

            {/* Khu vực nội dung chính */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Truyền hàm mở menu xuống Header */}
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Khung chứa nội dung tự động cuộn (scroll) nếu nội dung quá dài */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
