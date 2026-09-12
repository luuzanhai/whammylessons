import React from 'react';

export default function FeaturedClasses() {
    // Dữ liệu mô phỏng các lộ trình học Guitar
    const classes = [
        {
            id: 1,
            subtitle: 'Dành cho người mới, từ con số 0',
            title: 'BEGINNER',
            image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800',
        },
        {
            id: 2,
            subtitle: 'Dành cho người đã biết chơi cơ bản',
            title: 'ADVANCED',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',
        },
        {
            id: 3,
            subtitle: 'Dành cho biểu diễn chuyên nghiệp',
            title: 'PROFI',
            image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800',
        }
    ];

    return (
        /* Nền màu kem nhạt đồng nhất với tổng thể Brutalism */
        <section className="w-full bg-[#F4F1EA] py-16 px-4 md:px-12">

            {/* Tiêu đề chính (Mỏng, thanh lịch) */}
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1a1a1a] mb-12 text-center md:text-left">
                LỘ TRÌNH HỌC 
            </h2>

            {/* Bố cục Grid 3 cột */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {classes.map((cls) => (
                    <div key={cls.id} className="flex flex-col group cursor-pointer">

                        {/* 1. Đường kẻ ngang và Text mô tả nhỏ màu đỏ */}
                        <div className="border-t border-[#E73919]/50 pt-2 mb-3">
                            <p className="text-[#E73919] text-sm md:text-[15px] font-medium tracking-tight">
                                {cls.subtitle}
                            </p>
                        </div>

                        {/* 2. Khu vực Hình ảnh và Chữ vàng */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden">

                            {/* Hình ảnh với hiệu ứng vintage (giảm màu, tăng tương phản, ám vàng) */}
                            <img
                                src={cls.image}
                                alt={cls.title}
                                className="w-full h-full object-cover grayscale-[30%] contrast-125 sepia-[20%] transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Lớp phủ mờ màu đen nhẹ để đảm bảo chữ vàng luôn đọc được */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                            {/* 3. Chữ Serif vàng óng (Golden Serif Text) */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <h3 className="text-[#E4B363] font-serif text-5xl md:text-5xl lg:text-6xl tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500">
                                    {cls.title}
                                </h3>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
