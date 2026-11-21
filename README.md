# Phan Quoc Binh — Personal Portfolio

A Vietnamese / English editorial portfolio built with Vite, React, TypeScript, Tailwind CSS v3, Lenis, Framer Motion and Lucide. Paper `#F9FAFB`, ink `#010280`, hover tint `#E8EAFA`, cyan `#00A3FF`.

## Development

Requires Node.js 20.19+ (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

## Quality checks and production

```sh
npm run lint
npm run build
npm run preview
```

Deploy `dist/` to any static host. No environment variables or backend services are required. The application uses Google Fonts with system fallbacks.

## Content

- `src/data/portfolio.ts`: profile, experience and project content.
- `data/skills.json`: seven Vietnamese skill categories.
- `public/Phan_Quoc_Binh_Junior_Fullstack_Developer.pdf`: downloadable CV supplied by the owner.
- `src/styles.css`: design tokens, responsive layouts and reduced motion rules.
- `src/lib/algorithms.ts`: deterministic snapshots of BFS and Dijkstra on the same six-node undirected graph.

## Interactions

Fixed chapter navigation and Lenis anchor scrolling; 200ms character roll links; masked hero reveals; scroll-drawn dividers; project previews and accessible accordion drawers; algorithm selection, autoplay, pause, previous/next, reset and speed controls; live queue, visited order and distance data; email copy with fallback and two-second toast; mail, phone and external social links.

The lab starts at A. BFS visits A, B, C, D, E, F and ignores weights. Dijkstra visits A, C, B, D, E, F, producing distances A=0, B=3, C=2, D=8, E=10, F=13. Resetting or changing the algorithm clears execution state. The mini lab is a working demonstration; project cover artwork is an original interface illustration rather than a product screenshot.

## Accessibility

Includes a skip link, keyboard focus indicators, descriptive control labels, accordion ARIA states, live status announcements, touch controls, and a reduced motion mode. Responsive layouts cover mobile, tablet and desktop. Clipboard failures expose an email fallback.

## Content provenance

The workspace was initially empty. Design and content follow the owner's supplied brief and the AGENTS.md blueprint available in the conversation. CV bytes were sourced from the owner's existing local PDF. Metrics and experience dates reflect the supplied blueprint.
