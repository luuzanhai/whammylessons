import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import CourseFeatures from '@/Components/CourseFeatures';
import FeaturedClasses from '@/Components/FeaturedClasses';

export default function Welcome({ banners = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = banners.length > 0 ? banners : [
        {
            id: 1,
            image_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070',
            title: 'GUITAR SV',
            subtitle: 'Khóa học đánh thức đam mê',
            text_position: 'center'
        },
        {
            id: 2,
            image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074',
            title: 'GÓC TRÁI DƯỚI',
            subtitle: 'Dành cho ảnh có điểm nhấn ở giữa',
            text_position: 'bottom-left'
        },
        {
            id: 3,
            image_url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070',
            title: 'GÓC PHẢI GIỮA',
            subtitle: 'Thiết kế bất đối xứng',
            text_position: 'center-right'
        },
    ];

    const getPositionClasses = (position) => {
        switch (position) {
            case 'bottom-left': return 'items-start justify-end pb-24 md:pb-32 px-8 md:px-20 text-left';
            case 'center-right': return 'items-end justify-center px-8 md:px-20 text-right';
            case 'top-left': return 'items-start justify-start pt-32 px-8 md:px-20 text-left';
            case 'center':
            default: return 'items-center justify-center p-4 text-center';
        }
    };

    const nextSlide = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    useEffect(() => {
        const timer = setInterval(() => nextSlide(), 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        /* Thêm một thẻ div bọc ngoài cùng với màu nền kem để trang web liền mạch khi cuộn xuống */
        <div className="w-full min-h-screen bg-[#F4F1EA] font-sans">
            <Head title="Trang Chủ" />

            {/* ==========================================
                PHẦN 1: CAROUSEL (Chiếm trọn màn hình đầu tiên)
                ========================================== */}
            <div className="relative w-full h-screen bg-[#1a1a1a] overflow-hidden group">
                <div
                    className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.3,1)]"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={slide.id || index} className="w-full h-full flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                            <img
                                src={slide.image_url}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 flex flex-col z-20 text-white ${getPositionClasses(slide.text_position)}`}>
                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl font-light text-gray-200 tracking-widest uppercase">
                                    {slide.subtitle}
                                </p>
                                <button className="mt-8 px-8 py-3 bg-[#E73919] hover:bg-[#c92f13] text-white font-bold rounded-full transition-colors shadow-lg pointer-events-auto">
                                    ĐĂNG KÝ NGAY
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={prevSlide} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextSlide} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {slides.map((_, idx) => (
                        <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-[#E73919] w-8' : 'bg-white/50 w-2 hover:bg-white'}`} />
                    ))}
                </div>
            </div>

            {/* ==========================================
                PHẦN 2: LỚP HỌC NỔI BẬT (Nằm bên dưới Carousel)
                ========================================== */}
            <FeaturedClasses />

            <CourseFeatures />

        </div>
    );
}

Welcome.layout = (page) => <Layout>{page}</Layout>;
