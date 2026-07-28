# File structure

```text
nudgeable-vercel-final/
├── app/
│   ├── ai-role-play/page.tsx       # AI Coach
│   ├── api/youtube/route.ts        # Server-side playlist integration
│   ├── insights/page.tsx           # Shorts + workflow video library
│   ├── nudgeengine/page.tsx        # Actions Engine
│   ├── globals.css
│   ├── icon.png
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── not-found.tsx
│   ├── page.tsx                    # Homepage
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Analytics.tsx
│   ├── ButtonLink.tsx
│   ├── CTA.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Icon.tsx
│   ├── InsightsVideoLibrary.tsx
│   ├── LogoStrip.tsx
│   ├── PhotoPlaceholder.tsx
│   ├── SectionHeader.tsx
│   ├── TestimonialGrid.tsx
│   ├── WorkflowVideoGrid.tsx
│   ├── YouTubeGrid.tsx
│   └── data.ts
├── public/
│   ├── assets/                     # Product and impact visuals
│   ├── brand/                      # Logo and founder portrait
│   ├── fonts/README.md
│   ├── insights/                   # Fallback workflow thumbnails
│   └── shorts/                     # Fallback Shorts thumbnails
├── .env.example
├── .gitignore
├── .nvmrc
├── next.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## Exact public URLs

- `https://www.nudgeable.ai/`
- `https://www.nudgeable.ai/ai-role-play`
- `https://www.nudgeable.ai/nudgeengine`
- `https://www.nudgeable.ai/insights`

The Practice Lab button opens `https://work.nudgeable.app/` directly.
