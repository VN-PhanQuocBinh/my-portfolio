export function navigationTop(element: HTMLElement): number {
    const id = element.id;
    const position = element.getBoundingClientRect().top + window.scrollY;
    if (id === 'top') return 0;
    if (id === 'work' && element.querySelector('.project-intro-scroll')) return Math.max(0, position);
    const heading = element.querySelector<HTMLElement>('.experience-editorial-heading, .section-title-row, .contact-intro, .editorial-work-static');
    return Math.max(0, (heading ? heading.getBoundingClientRect().top + window.scrollY : position) - 100);
}
