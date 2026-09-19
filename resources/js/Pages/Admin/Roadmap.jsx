import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

import Grain from '@/Components/Grain';

export default function RoadmapAdmin({ auth, roadmaps = [] }) {
    const initialData = roadmaps.map(r => ({
        ...r,
        tags: Array.isArray(r.tags) ? r.tags.join(', ') : (r.tags || '')
    }));

    const { data, setData, post, processing } = useForm({
        roadmaps: initialData
    });

    const handleChange = (index, field, value) => {
        const newData = [...data.roadmaps];
        newData[index][field] = value;
        setData('roadmaps', newData);
    };

    const handleImageChange = (index, file) => {
        if (!file) return;

        const newData = [...data.roadmaps];
        newData[index] = {
            ...newData[index],
            img: URL.createObjectURL(file),
            image_file: file,
        };
        setData('roadmaps', newData);
    };

    // Hàm Thêm Card Mới (Nút Dấu Cộng)
    const handleAdd = () => {
        setData('roadmaps', [...data.roadmaps, {
            id: null, num: 'IV', label: 'Tên Tiếng Việt', sublabel: 'Phụ đề mô tả đối tượng', eng: 'New Level',
            img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&fit=crop', image_file: null,
            weeks: '0 tuần', lessons: '0 bài', desc: 'Nhập mô tả chi tiết chương trình học vào đây...', tags: 'Nhạc Lý, Cơ Bản', is_active: true
        }]);
    };

    const handleRemove = (index) => {
        if(confirm('Bạn muốn xóa lộ trình này khỏi danh sách? (Sẽ xóa vĩnh viễn khi bấm Lưu Tất Cả)')) {
            const newData = [...data.roadmaps];
            newData.splice(index, 1);
            setData('roadmaps', newData);
        }
    };

    const saveAll = () => {
        post('/admin/roadmaps/batch', {
            forceFormData: true,
            onSuccess: () => alert('Đã lưu toàn bộ Lộ Trình Học thành công!')
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Thiết Kế Lộ Trình</h2>
                    <button
                        onClick={saveAll} disabled={processing}
                        className="bg-[#8b2e1a] text-[#f0e6c8] px-8 py-2 uppercase tracking-widest font-mono text-sm hover:bg-[#6a2213] disabled:opacity-50 transition rounded shadow-lg"
                    >
                        {processing ? 'Đang Lưu...' : 'Lưu Tất Cả'}
                    </button>
                </div>
            }
        >
            <Head title="Quản Lý Lộ Trình" />

            <div className="roadmap-admin-page">
                <Grain opacity={0.06} blend="multiply" zIndex={1} />
                <div className="roadmap-section__ruled-lines" />

                <div className="roadmap-admin-content">
                    <p className="roadmap-admin-hint">
                        * Chạm vào văn bản hoặc ảnh để chỉnh sửa trực tiếp
                    </p>

                    {/* ==========================================
                        DANH SÁCH CARD LỘ TRÌNH (MAP)
                        ========================================== */}
                    <div className="roadmap-admin-grid">

                        {data.roadmaps.map((lvl, i) => (
                            <div key={i} className="roadmap-admin-card roadmap-card group">
                                {/* Nút Xóa (Góc phải trên) */}
                                <button onClick={() => handleRemove(i)} className="roadmap-admin-remove">✕</button>

                                {/* Phụ đề trên cùng (Dành cho người mới...) */}
                                <div className="roadmap-card__sublabel">
                                    <input
                                        value={lvl.sublabel} onChange={(e) => handleChange(i, 'sublabel', e.target.value)}
                                        className="roadmap-admin-input roadmap-card__sublabel-text"
                                    />
                                </div>

                                {/* KHỐI HÌNH ẢNH */}
                                <div className="roadmap-card__image roadmap-admin-image">

                                    {/* Ảnh Nền */}
                                    <img src={toRoadmapImageUrl(lvl.img)} alt="bg" className="roadmap-card__photo roadmap-admin-photo" />
                                    <div className="roadmap-card__overlay" />

                                    {/* Hàm Grain nếu có lỗi anh thay bằng class bg-noise nhé */}
                                    <Grain opacity={0.2} />

                                    {/* 4 Góc Nhắm (Corner Marks) */}
                                    {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
                                        <div key={corner} className={`roadmap-card__corner roadmap-card__corner--${corner}`} />
                                    ))}

                                    {/* Input Đổi Ảnh Mờ (Hiện khi hover) */}
                                    <div className="roadmap-admin-image-input">
                                        <label className="roadmap-admin-upload-button">
                                            Tải ảnh từ thiết bị
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                                onChange={(e) => handleImageChange(i, e.target.files[0])}
                                            />
                                        </label>
                                        <input
                                            value={lvl.img} onChange={(e) => handleChange(i, 'img', e.target.value)}
                                            placeholder="Dán link ảnh Unsplash vào đây..."
                                            className="roadmap-admin-input roadmap-admin-image-url"
                                        />
                                    </div>

                                    {/* Nội Dung Nổi Trên Ảnh */}
                                    <div className="roadmap-card__content roadmap-admin-content-overlay">

                                        {/* Số La Mã */}
                                        <div className="roadmap-admin-level-row">
                                            <span className="roadmap-card__level">Cấp</span>
                                            <input
                                                value={lvl.num} onChange={(e) => handleChange(i, 'num', e.target.value)}
                                                className="roadmap-admin-input roadmap-admin-num"
                                            />
                                        </div>

                                        {/* Tên Tiếng Anh (Playfair) */}
                                        <input
                                            value={lvl.eng} onChange={(e) => handleChange(i, 'eng', e.target.value)}
                                            className="roadmap-admin-input roadmap-card__english-title roadmap-admin-title-input"
                                        />

                                        <div className="roadmap-card__divider" />

                                        {/* Tên Tiếng Việt (Lora) */}
                                        <input
                                            value={lvl.label} onChange={(e) => handleChange(i, 'label', e.target.value)}
                                            className="roadmap-admin-input roadmap-card__label roadmap-admin-label-input"
                                        />

                                        {/* Thời gian & Số Bài (Courier) */}
                                        <div className="roadmap-card__stats">
                                            <input value={lvl.weeks} onChange={(e) => handleChange(i, 'weeks', e.target.value)} className="roadmap-admin-input roadmap-card__stat roadmap-admin-weeks" />
                                            <input value={lvl.lessons} onChange={(e) => handleChange(i, 'lessons', e.target.value)} className="roadmap-admin-input roadmap-card__stat roadmap-admin-lessons" />
                                        </div>
                                    </div>
                                </div>

                                {/* KHỐI MÔ TẢ BÊN DƯỚI */}
                                <div className="roadmap-card__details roadmap-admin-details">
                                    <textarea
                                        value={lvl.desc} onChange={(e) => handleChange(i, 'desc', e.target.value)}
                                        rows="3"
                                        className="roadmap-admin-input roadmap-card__description roadmap-admin-description"
                                    />

                                    <div className="roadmap-admin-tags-editor">
                                        <span className="roadmap-admin-tags-label">Thẻ phân loại (cách nhau dấu phẩy):</span>
                                        <input
                                            value={lvl.tags} onChange={(e) => handleChange(i, 'tags', e.target.value)}
                                            className="roadmap-admin-input roadmap-card__tag roadmap-admin-tags-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ==========================================
                            Ô GRID DẤU CỘNG (THÊM LỘ TRÌNH MỚI)
                            ========================================== */}
                        <div
                            onClick={handleAdd}
                            className="roadmap-admin-add"
                        >
                            <svg className="roadmap-admin-add-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="roadmap-admin-add-label">
                                Thêm Lộ Trình
                            </span>
                        </div>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}

function toRoadmapImageUrl(imageUrl) {
    if (!imageUrl || imageUrl.startsWith('data:') || imageUrl.startsWith('blob:') || imageUrl.startsWith('http')) {
        return imageUrl;
    }

    if (imageUrl.startsWith('/')) {
        return imageUrl;
    }

    return `/storage/${imageUrl}`;
}
