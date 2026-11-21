export const profile = {
    name: 'Phan Quoc Binh', email: 'binh26042005@gmail.com', phone: '0387405218',
    github: 'https://github.com/VN-PhanQuocBinh', linkedin: 'https://www.linkedin.com/in/phan-quoc-binh/',
};
export const experiences = [
    { company: 'FPT Software', location: 'Can Tho', role: 'Java Intern', period: '05/2026 – 08/2026', tags: ['Java', 'Unit Testing', 'Agile Scrum', 'Git Flow'], points: ['Used AI tools to implement and refactor Java features, write unit tests, and review code.', 'Investigated bugs and addressed review feedback.', 'Worked with the team using Agile Scrum and Git Flow, coordinating changes and maintaining version-controlled code.'] },
    { company: 'Giratech AI', location: 'Remote', role: 'Frontend Developer', period: '07/2025 – 02/2026', tags: ['React', 'Next.js', 'REST APIs'], points: ['Built responsive React and Next.js interfaces, integrated REST APIs, and refined reusable CMS components.', 'Improved UI consistency and resolved issues across VN168 & CMS, GiraTech Landing Page, and Loyalty App CMS.'] },
];
export type Project = { id: string; name: string; subtitle: string; category: string; role: string; period: string; metrics: string[]; stack: string[]; details: { title: string; copy: string }[]; links: { label: string; href: string }[] };
export const projects: Project[] = [
    { id: 'smarthire', name: 'SmartHire', subtitle: 'Recruitment & CV Management Platform', category: 'FULL-STACK / AI', role: 'Team Leader / Fullstack Developer (Team of 3)', period: '09/2026 – Present', metrics: ['29 database tables', '28+ REST APIs', '9 successful deployments'], stack: ['C#', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'React.js', 'TypeScript', 'Hangfire', 'Supabase', 'Docker', 'GitHub Actions'], details: [
        { title: 'Leadership', copy: 'Led a three-person team through three Agile sprints, with peer and CodeRabbit-assisted reviews for every pull request.' },
        { title: 'Backend', copy: 'Designed 29 database tables and a JSONB CV schema. Built 28+ REST APIs, PostgreSQL indexes, Hangfire jobs, and database transactions.' },
        { title: 'Frontend', copy: 'Built a React and TypeScript WYSIWYG CV builder with Gemini writing suggestions and PDF export. Configured CI/CD deployments to Vercel and Render with PostgreSQL on Supabase.' },
    ], links: [{ label: 'Live website', href: 'https://smart-recruitment-app.vercel.app' }, { label: 'Source code', href: 'https://github.com/SE-Project-CTU/smart-recruitment-app' }] },
    { id: 'graph', name: 'Graph Visualizer', subtitle: 'Graph Algorithm Visualization Platform', category: 'DESKTOP / ALGORITHMS', role: 'Personal Project Developer', period: '01/2026 – 09/2026', metrics: ['6 algorithm variants', 'Live state tracking'], stack: ['TypeScript', 'React.js', 'Electron.js', 'Cytoscape.js', 'Zustand'], details: [
        { title: 'Visualization', copy: 'Built a graph visualizer for BFS, DFS, Dijkstra, Eulerian Cycle, connected components, and strongly connected components, showing live stack, queue, visited-node, and path states.' },
        { title: 'Architecture', copy: 'Separated algorithms into modules with a shared result and step contract. Added step navigation, playback, undo and redo, graph save and load, and PNG export.' },
    ], links: [{ label: 'Source code', href: 'https://github.com/VN-PhanQuocBinh/eulerian-cycle' }] },
    { id: 'books', name: 'Smart Book Management', subtitle: 'Smart Book Management System', category: 'FULL-STACK / VECTOR SEARCH', role: 'Fullstack Developer', period: '09/2025 – 12/2025', metrics: ['Vector search', 'AI book recommendations'], stack: ['Node.js', 'Express.js', 'Vue.js', 'TypeScript', 'MongoDB', 'Docker', 'Gemini API'], details: [
        { title: 'Application', copy: 'Built responsive Vue.js and TypeScript portals for book discovery, borrowing, and administration, integrated with Node.js and Express REST APIs.' },
        { title: 'Search', copy: 'Implemented JWT-protected role-based workflows, Vietnamese keyword search, filters, and pagination. Added AI book recommendations and chat history using multilingual embeddings, MongoDB Atlas Vector Search, and Gemini.' },
    ], links: [{ label: 'Backend', href: 'https://github.com/VN-PhanQuocBinh/my-library' }, { label: 'User frontend', href: 'https://github.com/VN-PhanQuocBinh/my-library-user-frontend' }, { label: 'Admin frontend', href: 'https://github.com/VN-PhanQuocBinh/my-library-admin-frontend' }] },
];
