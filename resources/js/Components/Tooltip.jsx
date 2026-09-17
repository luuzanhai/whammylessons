import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Tooltip({
    children,
    content,
    position = 'right', // 'right' | 'left' | 'top' | 'bottom'
    isDarkMode = null,  // null: tự nhận theo class 'dark' của <html> | true: Dark | false: Light
    disabled = false,
    delay = 80,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const timeoutRef = useRef(null);

    // Xác định theme thực tế: ưu tiên props `isDarkMode`, nếu null thì đọc class trên <html>
    const [darkTheme, setDarkTheme] = useState(() => {
        if (isDarkMode !== null) return isDarkMode;
        if (typeof document !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return true;
    });

    useEffect(() => {
        if (isDarkMode !== null) {
            setDarkTheme(isDarkMode);
        } else if (typeof document !== 'undefined') {
            setDarkTheme(document.documentElement.classList.contains('dark'));
        }
    }, [isDarkMode]);

    const updatePosition = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const offset = 8; // Khoảng cách giữa trigger và tooltip

        let top = 0;
        let left = 0;

        switch (position) {
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right + offset;
                break;
            case 'left':
                top = rect.top + rect.height / 2;
                left = rect.left - offset;
                break;
            case 'top':
                top = rect.top - offset;
                left = rect.left + rect.width / 2;
                break;
            case 'bottom':
                top = rect.bottom + offset;
                left = rect.left + rect.width / 2;
                break;
            default:
                break;
        }

        setCoords({ top, left });
    };

    const handleMouseEnter = () => {
        if (disabled || !content) return;
        timeoutRef.current = setTimeout(() => {
            updatePosition();
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    // Class căn chỉnh vị trí hộp chứa
    const positionStyles = {
        right: '-translate-y-1/2',
        left: '-translate-x-full -translate-y-1/2',
        top: '-translate-x-1/2 -translate-y-full',
        bottom: '-translate-x-1/2',
    };

    // Class vị trí các cạnh viền cho mũi tên xoay 45 độ
    const arrowEdgeStyles = {
        right: '-left-[5px] top-1/2 -translate-y-1/2 border-b border-l',
        left: '-right-[5px] top-1/2 -translate-y-1/2 border-t border-r',
        top: '-bottom-[5px] left-1/2 -translate-x-1/2 border-b border-r',
        bottom: '-top-[5px] left-1/2 -translate-x-1/2 border-t border-l',
    };

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-flex w-full"
            >
                {children}
            </div>

            {isVisible &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        style={{
                            position: 'fixed',
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                            zIndex: 99999,
                        }}
                        className={`pointer-events-none transition-all duration-150 ease-out ${positionStyles[position]}`}
                    >
                        <div
                            className={`relative flex items-center rounded-lg px-3 py-1.5 transition-colors duration-200 ${
                                darkTheme
                                    ? 'border border-white/10 bg-[#1e1e1e] text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)]'
                                    : 'border border-black/10 bg-white text-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
                            }`}
                        >
                            {/* Mũi tên tam giác đồng bộ màu nền và viền theo theme */}
                            <div
                                className={`absolute h-2.5 w-2.5 rotate-45 transition-colors duration-200 ${
                                    darkTheme
                                        ? 'border-white/10 bg-[#1e1e1e]'
                                        : 'border-black/10 bg-white'
                                } ${arrowEdgeStyles[position]}`}
                            />

                            {/* Chữ hiển thị */}
                            <span className="relative z-10 whitespace-nowrap font-sans text-[13px] font-medium tracking-normal">
                                {content}
                            </span>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
