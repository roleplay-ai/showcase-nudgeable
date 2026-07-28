# Nudgeable website

Production-ready marketing site for Vercel.

## Exact tech stack

- Next.js 16.2 App Router
- React 19.2
- TypeScript
- Plain global CSS, with no UI framework and no client-side styling dependency
- Next.js Image optimization
- YouTube Data API v3 through a server-only route

## Included pages and routes

| Page | Canonical route |
|---|---|
| Homepage / landing page | `/` |
| AI Coach | `/ai-role-play` |
| Actions Engine | `/nudgeengine` |
| Insights video library | `/insights` |

The Practice Lab does not have a marketing page in this project. All Practice Lab links open `https://ai.nudgeable.app/` directly.

Legacy aliases are handled through permanent redirects in `next.config.mjs`, including `/ai-coach`, `/actions-engine`, `/videos`, `/ai-shorts`, `/practice-lab`, `/contact`, `/about`, and `/ai-training`.

## Local setup

Requires Node.js 20.9 or later.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

Before deployment, run:

```bash
npm run typecheck
npm run build
```

## Vercel deployment

1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. Import the repository into Vercel.
3. Keep the detected framework as **Next.js**.
4. Add the environment variables listed in `.env.example`.
5. Deploy.
6. Add `www.nudgeable.ai` and `nudgeable.ai` under **Project Settings → Domains**.
7. Set the preferred domain and confirm the redirects after DNS is connected.

No `vercel.json` is required because the project uses standard Next.js conventions.

## YouTube playlists

The Insights page and homepage video sections are connected to:

- Shorts: `https://www.youtube.com/playlist?list=PLX2kcOVk5064`
- Workflow explainers: `https://www.youtube.com/playlist?list=PLWrY3kWovqrDc2XMO3kj66fqMCPwAl4_v`

Create a YouTube Data API v3 key and add it in Vercel as:

```env
YOUTUBE_API_KEY=your_server_side_key
```

The key is used only inside `app/api/youtube/route.ts` and is not exposed to the browser. Playlist data is cached for 15 minutes. The site uses bundled fallback cards when the API key is absent or YouTube is unavailable.

## Contact form

Set `NEXT_PUBLIC_CONTACT_ENDPOINT` to a Formspree, HubSpot, or custom form endpoint. When it is empty, the form opens a pre-filled email to `team@nudgeable.ai`.

## Demo video links

Add these optional Vercel environment variables:

```env
NEXT_PUBLIC_PRACTICE_LAB_DEMO_URL=
NEXT_PUBLIC_SALES_COACH_DEMO_URL=
NEXT_PUBLIC_LEADERSHIP_COACH_DEMO_URL=
```

## SEO implementation

- Semantic `header`, `nav`, `main`, `section`, `article`, and `footer` elements
- One `h1` per page and logical `h2` / `h3` hierarchy
- Page-level title, description, canonical URL, Open Graph metadata, and Twitter card metadata
- Descriptive alt text for content images and logos
- Generated `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest`
- Permanent redirects for old and alternate URLs
- Google Search Console verification placeholder through `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

## Analytics hooks

Set the following optional environment variable:

```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

The GA4 script uses Next.js `afterInteractive` loading and is omitted entirely when the variable is empty.

## Performance decisions

- Above-the-fold product imagery uses Next.js Image with explicit dimensions and priority loading.
- Remaining Next.js images are lazy-loaded automatically.
- Dynamic YouTube thumbnails use lazy loading and asynchronous decoding.
- Video iframes are created only after a user opens the video modal.
- JavaScript and CSS are minified by the production Next.js build.
- No custom render-blocking scripts are included.
- Uploaded logo files are cropped and optimized. The founder photograph is supplied as a compressed WebP.

## Accessibility

- Skip-to-content link
- Keyboard-accessible navigation and video controls
- Escape-key support for the mobile menu and video modal
- `aria-current`, `aria-expanded`, `aria-pressed`, dialog labeling, and live form status
- Visible focus indicators
- Reduced-motion support
- Proper labels and autocomplete attributes on form fields

## Responsive testing targets

The responsive CSS uses explicit adaptations around these breakpoints:

- 520 px
- 640 / 680 px
- 760 / 860 px
- 1000 / 1050 px

Test final content at 360 px, 768 px, 1024 px, and 1440 px before publishing.

## Brand assets

Included in `public/brand`:

- Nudgeable black logo
- Nudgeable white logo
- Gaurav Patel portrait

The favicon is in `app/icon.png`.

The licensed Visby CF font is not included. See `public/fonts/README.md` before launch.
