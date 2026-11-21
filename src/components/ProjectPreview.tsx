const covers: Record<string, { label: string; title: string; note: string }> = {
    smarthire: { label: 'RECRUITMENT / 2026', title: 'SmartHire', note: 'Recruitment & CV management' },
    graph: { label: 'DESKTOP / 2026', title: 'Graph Visualizer', note: 'Graph Algorithm Visualization Platform' },
    books: { label: 'FULL-STACK / 2025', title: 'Smart Library', note: 'Smart Book Management System' },
};

export default function ProjectPreview({ id, compact = false }: { id: string; compact?: boolean }) {
    const cover = covers[id];
    if (!cover) return null;
    return <div className={`project-cover cover-${id} ${compact ? 'cover-compact' : ''}`} aria-hidden="true">
        <span className="cover-label">{cover.label}</span>
        <strong>{cover.title}</strong>
        <span className="cover-note">{cover.note}</span>
    </div>;
}
