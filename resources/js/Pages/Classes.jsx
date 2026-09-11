// Ví dụ cho file Classes.jsx
import MainLayout from '@/Layouts/MainLayout';

export default function Classes() {
    return <h1>Quản lý Lớp học</h1>;
    
}

Classes.layout = page => <MainLayout children={page} />;
