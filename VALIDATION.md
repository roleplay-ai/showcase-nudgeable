# Validation performed

- TypeScript and TSX syntax parsed successfully across all source files.
- CSS parsed successfully with no syntax errors.
- `package.json` and `tsconfig.json` are valid JSON.
- Every bundled asset path referenced by the source exists.
- All internal links resolve to one of the four canonical routes, an on-page anchor, or a configured redirect.
- Each public page contains one `h1`.

A full `next build` was not run in the generation environment because it could not access the npm registry. Run `npm install`, `npm run typecheck`, and `npm run build` locally or in Vercel before publishing.
