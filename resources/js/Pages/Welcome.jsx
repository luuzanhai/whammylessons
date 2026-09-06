import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Welcome() {
    return (
        /* Nền xám nhạt bao quanh bên ngoài */
        <div className="min-h-screen bg-[#e5e5e5] p-4 sm:p-8 flex items-center justify-center font-sans">
            <Head title="Cửa hàng tối giản" />

            {/* Khung trắng bo góc to chứa toàn bộ website */}
            <div className="bg-white rounded-[2rem] shadow-sm w-[95vw] max-w-none h-[95vh] flex overflow-hidden">

                {/* Gọi Sidebar tối giản vào đây */}
                <Sidebar activeMenu="Lớp học" />

                {/* Khu vực bên phải (Hiển thị lưới sản phẩm) */}
                <main className="flex-1 bg-white p-12 overflow-y-auto">

                    {/* Ví dụ 2 khối sản phẩm (Card) tối giản y hệt thiết kế */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

                        {/* Card Sản phẩm 1 */}
                        <div className="flex flex-col group cursor-pointer">
                            <div className="bg-[#f5f5f5] aspect-square rounded-xl flex items-center justify-center p-8 relative mb-4">
                                <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                                <img src="/logo_whammy.png" alt="Guitar 1" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex justify-between items-start px-1">
                                <div>
                                    <h3 className="font-sans font-bold text-black text-sm">Lớp Electric Guitar /2 Học Viên</h3>
                                    <p className="font-sans text-gray-500 text-xs mt-0.5">Electric</p>
                                </div>
                                <div className="border border-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-black">
                                    $1,299
                                </div>
                            </div>
                        </div>

                        {/* Card Sản phẩm 2 */}
                        <div className="flex flex-col group cursor-pointer">
                            <div className="bg-[#f5f5f5] aspect-square rounded-xl flex items-center justify-center p-8 relative mb-4">
                                <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                </button>
                                <img src="/logo_whammy.png" alt="Guitar 2" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex justify-between items-start px-1">
                                <div>
                                    <h3 className="font-sans font-bold text-black text-sm">Lớp Electric Guitar /2 Học Viên</h3>
                                    <p className="font-sans text-gray-500 text-xs mt-0.5">Acoustic</p>
                                </div>
                                <div className="border border-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-black">
                                    $899
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
}
