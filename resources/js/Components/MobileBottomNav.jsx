import { Link } from '@inertiajs/react';

export default function MobileBottomNav({ active = 'home' }) {
    return (
        /* Chỉ hiển thị trên điện thoại (md:hidden), ghim dưới đáy, nền kính mờ */
        <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[400px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1.5 flex justify-between items-center z-50 shadow-2xl">

            {/* Nút 1: Home */}
            <NavItem route="#" active={active === 'home'} icon={
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            } />

            {/* Nút 2: Task/Check */}
            <NavItem route="#" active={active === 'tasks'} icon={
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            } />

            {/* Nút 3: Calendar */}
            <NavItem route="#" active={active === 'calendar'} icon={
                <>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 14h.01M12 14h.01M17 14h.01M7 18h.01M12 18h.01M17 18h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
                </>
            } />

            {/* Nút 4: Target/Goal */}
            <NavItem route="#" active={active === 'goals'} icon={
                <>
                    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 9l4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.5 4.5l-2.5 0l0 2.5z" fill="currentColor" />
                </>
            } />

        </div>
    );
}

// Component con hỗ trợ vẽ từng nút bấm
function NavItem({ route, active, icon }) {
    return (
        <Link
            href={route}
            // Nếu active thì nổi nền trắng mờ và bo tròn giống viên thuốc
            className={`w-16 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                active ? 'bg-white/20 text-white shadow-inner' : 'text-gray-400 hover:text-white'
            }`}
        >
            <svg
                className="w-[22px] h-[22px]"
                fill={active ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={active ? "0" : "1.5"}
                viewBox="0 0 24 24"
            >
                {icon}
            </svg>
        </Link>
    );
}
