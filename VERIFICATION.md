# Verification

## Passed

- All source TypeScript / TSX files parsed and transpiled without syntax diagnostics using an existing local TypeScript compiler.
- BFS visited order: A, B, C, D, E, F.
- Dijkstra settled order: A, C, B, D, E, F.
- Dijkstra distances: A=0, B=3, C=2, D=8, E=10, F=13.
- Initial queue, queue after visiting A, final empty queue, and snapshot isolation assertions passed.
- A real owner-supplied CV PDF is included at the download path.

## Blocked in this execution environment

`npm install` failed with `ENOTFOUND registry.npmjs.org`. Offline installation was also attempted; the available cache does not include the full dependency set.

Both requested commands were run:

- `npm run lint` could not start ESLint because dependencies are not installed.
- `npm run build` could not start TypeScript because dependencies are not installed.

Full type checking, lint, production bundling, browser interaction checks, and visual review remain unverified. A production build is not included. Syntax checks are not a substitute for these checks.

When registry access is available:

```sh
npm install
npm run lint
npm run build
npm run dev
```

Check the portfolio at desktop and mobile widths; verify project drawers, keyboard focus, algorithm playback, email copying, reduced motion, external links, and the PDF download before deployment.
