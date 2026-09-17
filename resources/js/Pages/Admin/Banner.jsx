import { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

// ==========================================
// HÀM PHỤ TRỢ: TÍNH TOÁN VỊ TRÍ CHỮ
// ==========================================
function getTextPositionStyle(position) {
    const positions = {
        "top-left": { justifyContent: "flex-start", alignItems: "flex-start", textAlign: "left" },
        "top-center": { justifyContent: "flex-start", alignItems: "center", textAlign: "center" },
        "top-right": { justifyContent: "flex-start", alignItems: "flex-end", textAlign: "right" },
        "middle-left": { justifyContent: "center", alignItems: "flex-start", textAlign: "left" },
        "middle-center": { justifyContent: "center", alignItems: "center", textAlign: "center" },
        "middle-right": { justifyContent: "center", alignItems: "flex-end", textAlign: "right" },
        "bottom-left": { justifyContent: "flex-end", alignItems: "flex-start", textAlign: "left" },
        "bottom-center": { justifyContent: "flex-end", alignItems: "center", textAlign: "center" },
        "bottom-right": { justifyContent: "flex-end", alignItems: "flex-end", textAlign: "right" },
    };
    return positions[position] || positions["bottom-left"];
}

export default function Dashboard({ auth, banners = [] }) {
    // ==========================================
    // 1. QUẢN LÝ STATE FORM CỦA INERTIA
    // ==========================================
    const { data, setData, post, processing, reset, clearErrors } = useForm({
        id: null, // Thêm id để theo dõi trạng thái Sửa hay Thêm mới
        image: null,
        title: 'Tiếng Đàn\nĐầu Tiên',
        subtitle: 'Từ những nốt nhạc đơn giản nhất,\nmột hành trình bắt đầu.',
        label: '01 / Mới',
        tag: 'Tin Tức',
        text_position: 'bottom-left'
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    // ==========================================
    // 2. KHAI BÁO THAM CHIẾU (REF) CHO KÉO THẢ
    // ==========================================
    const containerRef = useRef(null);
    const widgetRef = useRef(null);

    // ==========================================
    // 3. STATE VÀ LOGIC XỬ LÝ KÉO THẢ (CÓ RANH GIỚI)
    // ==========================================
    const [gridPos, setGridPos] = useState({ x: 16, y: 16 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, widgetX: 0, widgetY: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            mouseX: e.clientX,
            mouseY: e.clientY,
            widgetX: gridPos.x,
            widgetY: gridPos.y,
        });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging || !containerRef.current || !widgetRef.current) return;

            const deltaX = e.clientX - dragStart.mouseX;
            const deltaY = e.clientY - dragStart.mouseY;

            let newX = dragStart.widgetX + deltaX;
            let newY = dragStart.widgetY + deltaY;

            const containerRect = containerRef.current.getBoundingClientRect();
            const widgetRect = widgetRef.current.getBoundingClientRect();

            // Tính toán ranh giới chặn viền
            const maxX = containerRect.width - widgetRect.width;
            const maxY = containerRect.height - widgetRect.height;

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));

            setGridPos({ x: newX, y: newY });
        };

        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    // ==========================================
    // 4. XỬ LÝ FILE VÀ PREVIEW
    // ==========================================
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Dọn dẹp RAM khi hủy preview
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // ==========================================
    // 5. SUBMIT FORM
    // ==========================================
    const submit = () => {
        if (data.id) {
            // Dùng method spoofing để upload multipart/form-data bằng POST.
            router.post(`/admin/banners/${data.id}`, {
                ...data,
                _method: 'put',
            }, {
                forceFormData: true,
                onSuccess: () => {
                    alert('Cập nhật Banner thành công!');
                    reset();
                    setPreviewUrl(null);
                },
            });
        } else {
            post('/admin/banners', {
                onSuccess: () => {
                    alert('Tải ảnh và lưu Database thành công!');
                    reset();
                    setPreviewUrl(null);
                },
            });
        }
    };

    // Hủy trạng thái Sửa, quay về Tạo mới
    const cancelEdit = () => {
        reset();
        clearErrors();
        setPreviewUrl(null);
    }

    const positionGrid = [
        'top-left', 'top-center', 'top-right',
        'middle-left', 'middle-center', 'middle-right',
        'bottom-left', 'bottom-center', 'bottom-right'
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {data.id ? 'Sửa Banner' : 'Thêm Banner Mới'}
                    </h2>
                    <div className="flex items-center gap-3">
                        {data.id && (
                            <button
                                onClick={cancelEdit}
                                className="bg-gray-200 text-gray-700 px-6 py-2 uppercase tracking-widest font-mono text-sm hover:bg-gray-300 transition-colors"
                            >
                                Hủy Sửa
                            </button>
                        )}
                        <button
                            onClick={submit}
                            disabled={processing || (!data.image && !data.id)} // Sửa text thì có thể ko cần ảnh mới
                            className="bg-[#8b2e1a] text-[#f0e6c8] px-6 py-2 uppercase tracking-widest font-mono text-sm hover:bg-[#6a2213] disabled:opacity-50 transition-colors shadow-lg"
                        >
                            {processing ? 'Đang xuất bản...' : (data.id ? 'Cập Nhật' : 'Lưu Banner')}
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Quản Lý Banner" />

            {/* ==========================================
                KHU VỰC SOẠN THẢO (EDITOR)
                ========================================== */}
            <div className="py-8 overflow-hidden bg-gray-100">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">

                    {/* KHUNG HIỂN THỊ */}
                    <div ref={containerRef} className="relative w-full aspect-video bg-[#111] overflow-hidden rounded-xl shadow-xl border border-gray-300 group">

                        {/* Lớp Ảnh Nền */}
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-600 m-8 rounded-xl bg-gray-900/50">
                                <label className="cursor-pointer text-gray-400 hover:text-white flex flex-col items-center pointer-events-auto">
                                    <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    <span className="font-mono uppercase tracking-widest text-sm">Nhấn để chọn ảnh nền</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                        )}

                        {previewUrl && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60 pointer-events-none" />
                                <label className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 font-mono text-xs cursor-pointer hover:bg-black/80 border border-white/20 z-50 transition-colors rounded pointer-events-auto shadow">
                                    Đổi Ảnh Khác
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </>
                        )}

                        {/* Widget Căn Chỉnh Vị Trí Kéo Thả */}
                        <div
                            ref={widgetRef}
                            className="absolute z-50 bg-black/70 p-2 rounded-lg border border-white/30 backdrop-blur-md cursor-move shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow hover:bg-black/80"
                            style={{
                                left: `${gridPos.x}px`,
                                top: `${gridPos.y}px`,
                                userSelect: 'none'
                            }}
                            onMouseDown={handleMouseDown}
                        >
                            <div className="text-[0.6rem] font-mono text-white/80 text-center mb-2 uppercase tracking-wider pointer-events-none select-none">
                                BỐ CỤC
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                                {positionGrid.map((pos) => (
                                    <button
                                        key={pos}
                                        type="button"
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={() => setData('text_position', pos)}
                                        title={pos}
                                        className={`w-8 h-8 rounded-sm border transition-all ${data.text_position === pos
                                                ? 'bg-[#8b2e1a] border-[#8b2e1a] shadow-[0_0_10px_rgba(139,46,26,0.8)]'
                                                : 'bg-white/10 border-white/20 hover:bg-white/40 cursor-pointer'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Lớp Form Nhập Liệu Trực Tiếp Chồng Lên Ảnh */}
                        <div
                            className="absolute inset-0 z-10 flex flex-col p-8 md:p-16 pointer-events-none transition-all duration-500 ease-in-out"
                            style={getTextPositionStyle(data.text_position)}
                        >
                            <input
                                type="text"
                                value={data.label}
                                onChange={e => setData('label', e.target.value)}
                                style={{ textAlign: 'inherit' }}
                                className="pointer-events-auto font-mono text-[0.7rem] tracking-[0.3em] uppercase text-[#8b2e1a] mb-4 bg-transparent border-none outline-none focus:ring-1 focus:ring-white/30 w-full max-w-[400px] placeholder-gray-600 p-0"
                            />

                            <div className="inline-block mb-6 pointer-events-auto">
                                <input
                                    type="text"
                                    value={data.tag}
                                    onChange={e => setData('tag', e.target.value)}
                                    style={{ textAlign: 'inherit' }}
                                    className="border border-[#8b2e1a]/60 px-2 py-1 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#f0e6c8]/70 bg-transparent outline-none focus:bg-white/10 transition-colors w-[150px] placeholder-gray-600"
                                />
                            </div>

                            <textarea
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                style={{ fontFamily: "'Playfair Display', serif", textAlign: 'inherit' }}
                                className="pointer-events-auto font-serif italic text-4xl md:text-6xl text-[#f5efe0] leading-[1.1] mb-6 bg-transparent border-none outline-none focus:ring-1 focus:ring-white/30 resize-none overflow-hidden placeholder-gray-600 drop-shadow-2xl p-0 w-full max-w-[700px]"
                                rows={2}
                            />

                            <div className="w-[48px] h-[1px] bg-[#8b2e1a] mb-6" />

                            <textarea
                                value={data.subtitle}
                                onChange={e => setData('subtitle', e.target.value)}
                                style={{ fontFamily: "'Lora', serif", textAlign: 'inherit' }}
                                className="pointer-events-auto font-serif text-[0.95rem] leading-[1.8] text-[#f0e6c8]/75 bg-transparent border-none outline-none focus:ring-1 focus:ring-white/30 resize-none w-full max-w-[450px] placeholder-gray-600 p-0"
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                {/* ==========================================
                    BẢNG DANH SÁCH BANNERS
                    ========================================== */}
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 mt-12 pb-12">
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg border border-gray-200">
                        <div className="p-6 text-gray-900 font-semibold text-lg border-b bg-gray-50 flex justify-between items-center">
                            <span>Danh Sách Banner Hoạt Động</span>
                            <span className="text-sm font-normal text-gray-500">Tổng cộng: {banners.length} banner</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Hình ảnh</th>
                                        <th className="px-6 py-4 font-medium">Nội dung (Title & Tag)</th>
                                        <th className="px-6 py-4 font-medium text-center">Trạng thái</th>
                                        <th className="px-6 py-4 font-medium text-right">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {banners.map((item) => (
                                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 w-[200px]">
                                                <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden shadow-sm border">
                                                    <img
                                                        src={item.image_url.startsWith('http') ? item.image_url : `${import.meta.env.VITE_IMAGE_BASE_URL || '/storage'}/${item.image_url}`}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 text-base mb-2 whitespace-pre-line leading-tight">{item.title}</div>
                                                <div className="text-[0.65rem] font-mono bg-gray-100 text-gray-600 px-2 py-1 inline-block rounded border border-gray-200">{item.tag}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => router.put(`/admin/banners/${item.id}/toggle`)}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${item.is_active
                                                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200'
                                                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {item.is_active ? 'Đang Hiển Thị' : 'Đang Ẩn'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => {
                                                        // Đẩy dữ liệu ngược lên khung Editor để sửa
                                                        setData({
                                                            id: item.id,
                                                            title: item.title,
                                                            subtitle: item.subtitle,
                                                            label: item.label,
                                                            tag: item.tag,
                                                            text_position: item.text_position,
                                                            image: null
                                                        });
                                                        setPreviewUrl(item.image_url.startsWith('http') ? item.image_url : `${import.meta.env.VITE_IMAGE_BASE_URL || '/storage'}/${item.image_url}`);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    Sửa Text
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn banner này? (Ảnh cũng sẽ bị xóa khỏi hệ thống)')) {
                                                            router.delete(`/admin/banners/${item.id}`);
                                                        }
                                                    }}
                                                    className="font-medium text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {banners.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                                <div className="text-lg mb-1">Chưa có banner nào trong hệ thống.</div>
                                                <div className="text-sm">Hãy tải lên một tấm ảnh và thiết kế ở khung phía trên nhé!</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nhúng Font Chữ Tạp Chí */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,600&family=Lora:ital,wght@0,400;1,400&family=Courier+Prime&display=swap');
            `}</style>
        </AuthenticatedLayout>
    );
}
