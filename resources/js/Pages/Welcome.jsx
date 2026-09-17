import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import CourseFeatures from '@/Components/CourseFeatures';
import RoadmapSection from '@/Components/RoadmapSection';
import Carousel from '@/Components/Carousel';

export default function Welcome({ banners = [] }) {
    // Dữ liệu dự phòng với phong cách Vintage mới (Kết hợp với cấu trúc Database cũ)
    const defaultSlides = [
        {
            image_url: "carousel-1.webp",
            label: "01 / Khởi Đầu",
            title: "Tiếng Đàn\nĐầu Tiên",
            subtitle: "Từ những nốt nhạc đơn giản nhất,\nmột hành trình bắt đầu.",
            tag: "Nhập Môn Guitar",
        },
        {
            image_url: "carousel-2.webp",
            label: "02 / Lớp Học",
            title: "Lớp Học\nNăm Xưa",
            subtitle: "Không gian học tập ấm áp —\nnơi âm nhạc gặp gỡ tâm hồn.",
            tag: "Giáo Trình Bao Cấp",
        },
        {
            image_url: "carousel-3.webp",
            label: "03 / Không Gian",
            title: "Thanh Âm\nĐường Phố",
            subtitle: "Âm thanh guitar vang vọng\nqua từng con phố mùa thu.",
            tag: "Văn Hoá Đường Phố",
        },
    ];

    // Ưu tiên dùng dữ liệu từ Database, nếu không có thì dùng defaultSlides
    const slides = banners.length > 0
        ? banners.map((banner) => ({
            ...banner,
            image_url: toBannerImageUrl(banner.image_url),
            text_position: banner.text_position || "bottom-left",
        }))
        : defaultSlides;

    return (
        <div className="w-full min-h-screen bg-[#F4F1EA] font-sans">
            <Head title="Trang Chủ" />

            {/* ==========================================
                PHẦN 1: CAROUSEL ĐIỆN ẢNH CỔ ĐIỂN
                ========================================== */}
            <div className="relative w-full h-screen overflow-hidden">
                <Carousel slides={slides} />
            </div>

            {/* ==========================================
                PHẦN 2 & 3: CÁC KHỐI NỘI DUNG BÊN DƯỚI
                ========================================== */}
            <RoadmapSection />
            <CourseFeatures />


        </div>
    );
}

function toBannerImageUrl(imageUrl) {
    if (!imageUrl || imageUrl.startsWith('data:') || imageUrl.startsWith('http')) {
        return imageUrl;
    }

    if (imageUrl.startsWith('/')) {
        return imageUrl;
    }

    return `/storage/${imageUrl}`;
}

Welcome.layout = (page) => <Layout>{page}</Layout>;
