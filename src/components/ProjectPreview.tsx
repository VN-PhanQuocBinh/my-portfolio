const previews: Record<string, { src: string; alt: string }> = {
    smarthire: { src: '/images/smarthire_1.png', alt: 'Trang chủ nền tảng SmartHire' },
    graph: { src: '/images/graph_1.png', alt: 'Giao diện trực quan hóa thuật toán đồ thị' },
    books: { src: '/images/smartbook_1.png', alt: 'Giao diện hệ thống quản lý sách' },
};

export default function ProjectPreview({ id }: { id: string }) {
    const preview = previews[id];
    if (!preview) return null;
    return <div className="project-screenshot"><img src={preview.src} alt={preview.alt} loading="lazy" decoding="async" /></div>;
}
