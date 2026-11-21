export const profile = {
    name: 'Phan Quoc Binh', email: 'binh26042005@gmail.com', phone: '0387405218',
    github: 'https://github.com/VN-PhanQuocBinh', linkedin: 'https://www.linkedin.com/in/phan-quoc-binh/',
};
export const experiences = [
    { company: 'FPT Software', location: 'Cần Thơ · Hybrid', role: 'Java Intern', period: '05 — 08 / 2026', tags: ['Java', 'Unit Testing', 'Agile Scrum', 'Git Flow'], points: ['Ứng dụng công cụ AI để triển khai, refactor tính năng Java và viết Unit Tests.', 'Điều tra bug, tham gia code review và xử lý phản hồi từ senior developers.', 'Làm việc theo Agile Scrum & Git Flow trong môi trường dự án thực tế.'] },
    { company: 'Giratech AI', location: 'Remote · Part-time', role: 'Frontend Developer', period: '07 / 2025 — 02 / 2026', tags: ['React', 'Next.js', 'TypeScript', 'REST APIs'], points: ['Phát triển giao diện React / Next.js responsive và tích hợp REST APIs.', 'Xây dựng bộ component CMS dùng chung, tối ưu luồng quản trị nội dung.', 'Đóng góp cho VN168 & CMS, GiraTech Landing Page và Loyalty App CMS.'] },
];
export type Project = {
    id: string;
    name: string;
    subtitle: string;
    category: string;
    role: string;
    period: string;
    metrics: string[];
    stack: string[];
    details: {
        title: string;
        copy: string;
    }[];
    links: {
        label: string;
        href: string;
    }[];
};
export const projects: Project[] = [
    { id: 'smarthire', name: 'SmartHire', subtitle: 'Recruitment & CV Management Platform', category: 'FULL-STACK / AI', role: 'Team Leader · Fullstack Developer', period: 'Team of 3 · 3 Agile sprints', metrics: ['29 DB tables', '28+ REST APIs', '9 CI/CD deployments'], stack: ['C#', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'React', 'TypeScript', 'Hangfire', 'Supabase', 'Docker', 'GitHub Actions'], details: [
            { title: 'Một nền tảng, từ CV đến cơ hội.', copy: 'Nền tảng tuyển dụng kết hợp quản lý hồ sơ ứng tuyển và trình soạn thảo CV WYSIWYG. Tích hợp Gemini API hỗ trợ viết nội dung CV và xuất PDF.' },
            { title: 'Dữ liệu có cấu trúc. Hệ thống rõ ràng.', copy: 'Thiết kế 29 bảng PostgreSQL, schema CV JSONB và indexes. Xây dựng 28+ REST APIs cho xác thực, RBAC, việc làm và ứng tuyển; sử dụng transactions để đảm bảo tính toàn vẹn dữ liệu.' },
            { title: 'Từ local đến production.', copy: 'Hangfire xử lý background jobs; Docker và GitHub Actions tự động hóa quy trình triển khai lên Render, Vercel và Supabase.' },
        ], links: [{ label: 'Live website', href: 'https://smart-recruitment-app.vercel.app' }, { label: 'Source code', href: 'https://github.com/SE-Project-CTU/smart-recruitment-app' }] },
    { id: 'graph', name: 'Graph Visualizer', subtitle: 'Graph Algorithm Visualization Platform', category: 'DESKTOP / ALGORITHMS', role: 'Personal Project Developer', period: '01 — 09 / 2026', metrics: ['6 algorithm variants', 'Live state tracking'], stack: ['TypeScript', 'React', 'Electron', 'Cytoscape.js', 'Zustand'], details: [
            { title: 'Nhìn thấy cách thuật toán suy nghĩ.', copy: 'Trực quan hóa BFS, DFS, Dijkstra, chu trình Eulerian, thành phần liên thông và thành phần liên thông mạnh, với chế độ chạy từng bước hoặc liên tục.' },
            { title: 'Logic độc lập với giao diện.', copy: 'Tách logic thuật toán khỏi tầng hiển thị bằng state contract trung tâm qua Zustand. Hỗ trợ step playback, Undo/Redo, lưu/mở đồ thị và xuất ảnh PNG.' },
        ], links: [{ label: 'Source code', href: 'https://github.com/VN-PhanQuocBinh/eulerian-cycle' }] },
    { id: 'books', name: 'Smart Library', subtitle: 'Smart Book Management System', category: 'FULL-STACK / VECTOR SEARCH', role: 'Fullstack Developer', period: '09 — 12 / 2025', metrics: ['Vector search', 'AI book recommendations'], stack: ['Node.js', 'Express', 'Vue.js', 'TypeScript', 'MongoDB', 'Docker', 'Gemini API'], details: [
            { title: 'Tìm đúng sách, theo cả ý nghĩa.', copy: 'Xây dựng hệ thống quản lý mượn trả sách, giao diện Vue.js / TypeScript và REST APIs với Node.js / Express. Hỗ trợ JWT, tìm kiếm tiếng Việt, bộ lọc đa tiêu chí và phân trang.' },
            { title: 'Tìm kiếm vượt ra ngoài từ khóa.', copy: 'MongoDB Atlas Vector Search kết hợp Gemini embeddings để gợi ý sách và hỗ trợ chatbot AI. Backend và client portal được đóng gói bằng Docker.' },
        ], links: [{ label: 'Backend', href: 'https://github.com/VN-PhanQuocBinh/my-library' }, { label: 'User frontend', href: 'https://github.com/VN-PhanQuocBinh/my-library-user-frontend' }, { label: 'Admin frontend', href: 'https://github.com/VN-PhanQuocBinh/my-library-admin-frontend' }] },
];
