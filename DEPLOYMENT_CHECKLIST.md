# Vercel deployment checklist

## Required

- [ ] Push the project to a Git repository.
- [ ] Import it into Vercel as a Next.js project.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.nudgeable.ai`.
- [ ] Set `YOUTUBE_API_KEY`.
- [ ] Verify that both YouTube playlists are public and accessible with the API key.
- [ ] Connect `nudgeable.ai` and `www.nudgeable.ai`.
- [ ] Submit `https://www.nudgeable.ai/sitemap.xml` in Google Search Console.

## Before launch

- [ ] Add the approved sales and leadership demo video URLs.
- [ ] Add the Practice Lab demo video URL.
- [ ] Add the final form endpoint or test the email fallback.
- [ ] Replace the three testimonial placeholders with approved client testimonials.
- [ ] Replace workshop photo placeholders with approved session photographs.
- [ ] Add licensed Visby CF webfont files and `@font-face` definitions.
- [ ] Add the GA4 ID and Search Console verification token.
- [ ] Test 360 px, 768 px, 1024 px, and 1440 px layouts.
- [ ] Test keyboard navigation, menu, form, filters, View more buttons, and video modal.
- [ ] Run `npm run typecheck` and `npm run build`.
