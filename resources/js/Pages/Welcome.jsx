import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome() {
    return (
        <div className="p-4 md:p-10">
            <Head title="Overview" />
            <h1 className="text-3xl font-bold mb-4">Nội dung trang</h1>
            <p className="text-gray-400">Nội dung sẽ được cập nhật bằng Inertia khi chuyển trang.</p>
        </div>
    );
}

Welcome.layout = (page) => <Layout>{page}</Layout>;
