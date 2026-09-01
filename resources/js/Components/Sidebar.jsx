export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white h-full p-4 flex flex-col">
            <div className="text-2xl font-bold mb-8 text-center text-red-500">
                Whammy Guitar
            </div>
            <nav className="space-y-2 flex-1">
                <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    Trang chủ
                </a>
                <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                    Sản phẩm
                </a>
            </nav>
        </aside>
    );
}
