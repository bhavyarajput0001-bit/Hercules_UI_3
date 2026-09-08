# Hercules Frontend Foundation

This archive contains the **frontend foundation**, not the full finished Hercules command-center UI. It provides a polished desktop-first home screen, mock activity data, basic navigation placeholders, visual core states, and a backend-ready service contract.

## Run locally

```bash
npm install
npm run dev
```

Build a production bundle with:

```bash
npm run build
```

## Project map

- `src/types/hercules.ts` contains shared domain contracts.
- `src/data/mockData.ts` provides realistic demo data.
- `src/services/api.ts` is the backend integration boundary.
- `src/services/mockApi.ts` is the current demo implementation.
- `src/App.tsx` contains the foundation app shell and home screen.
- `src/styles.css` defines the visual language.

To connect a backend, implement `HerculesApi` and supply your implementation in `src/App.tsx` in place of `mockApi`.
