import React from 'react';

export default function CourseFeatures() {
    // Dữ liệu mô phỏng 5 đặc điểm nổi bật của khóa học Guitar
    const features = [
        {
            id: '1',
            title: 'THỰC HÀNH LIÊN TỤC',
            description: '— Mỗi bài tập đều hướng tới việc hoàn thiện một ca khúc thực tế vào danh mục biểu diễn của bạn.'
        },
        {
            id: '2',
            title: 'GIẢNG VIÊN THỰC CHIẾN',
            description: '— Học trực tiếp từ những nhạc công có kinh nghiệm biểu diễn tại các phòng trà và sự kiện lớn.'
        },
        {
            id: '3',
            title: 'SỬA LỖI CHI TIẾT',
            description: '— Không chỉ là "làm tốt lắm", giảng viên sẽ phân tích từng lỗi sai về tư thế tay và nhịp điệu.'
        },
        {
            id: '4',
            title: 'CỘNG ĐỒNG CẢM HỨNG',
            description: '— Môi trường sinh hoạt âm nhạc sôi nổi, nơi mọi người cùng chung đam mê và giúp nhau tiến bộ.'
        },
        {
            id: '5',
            title: 'DỰ ÁN CUỐI KHÓA',
            description: '— Tự tin cầm đàn biểu diễn một tiết mục trọn vẹn trên sân khấu như một minh chứng cho kỹ năng mới.'
        }
    ];

    return (
        /* Nền màu kem nhạt liền mạch với khối ở trên */
        <section className="w-full bg-[#F4F1EA] py-16 md:py-24 px-4 md:px-12">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

                {/* ==========================================
                    CỘT TRÁI: HÌNH ẢNH MINH HỌA
                    ========================================== */}
                <div className="w-full md:w-5/12 flex flex-col items-center md:items-start justify-center">
                    <div className="relative w-full max-w-sm">
                        {/* Ảnh được làm hiệu ứng vintage, có bóng đổ để nổi bật trên nền kem */}
                        <img
                            src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800"
                            alt="Guitar SV Training"
                            className="w-full object-cover grayscale-[30%] contrast-125 sepia-[20%] shadow-[8px_8px_0px_rgba(0,0,0,0.1)] border-2 border-[#1a1a1a]/10"
                        />
                        {/* Lớp nhiễu hạt mỏng phủ lên riêng tấm ảnh */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
                            style={{ backgroundImage: `url('/noise.png')`, backgroundRepeat: 'repeat' }}
                        ></div>
                    </div>
                </div>


                {/* ==========================================
                    CỘT PHẢI: NỘI DUNG CHI TIẾT LỚP HỌC
                    ========================================== */}
                <div className="w-full md:w-7/12 flex flex-col">

                    {/* Tiêu đề góc trên cùng */}
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1a1a1a] mb-12 text-center md:text-left">
                        VỀ KHÓA HỌC
                    </h2>

                    {/* Danh sách các đặc điểm */}
                    <div className="flex flex-col">

                        {/* Đường kẻ ngang trên cùng cùng */}
                        <div className="w-full border-t border-[#E73919]/30"></div>

                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="flex items-start gap-4 md:gap-8 py-6 border-b border-[#E73919]/30 group hover:bg-[#E73919]/5 transition-colors duration-300"
                            >
                                {/* Số thứ tự (Font thanh mảnh, nghiêng nhẹ theo mẫu) */}
                                <span className="text-[#E73919] font-serif text-lg md:text-xl italic mt-1 w-6 text-right shrink-0">
                                    {feature.id}
                                </span>

                                {/* Khối chữ: Tiêu đề đỏ và Mô tả đen */}
                                <div className="flex flex-col">
                                    <h3 className="text-[#E73919] text-xl md:text-2xl font-black uppercase tracking-tight mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#1a1a1a] text-sm md:text-[15px] font-medium opacity-80 leading-snug">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
