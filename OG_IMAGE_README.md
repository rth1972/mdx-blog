# OG Image

You need to create an Open Graph image for social media sharing.

## Required Image:

**File:** `/public/og-image.png`

**Dimensions:** 1200x630 pixels

**Content Ideas:**
- Your name: "Robin te Hofstee"
- Tagline: "Personal Blog"
- Background: Use Titans red (#e93139)
- Your logo or avatar

## Quick Creation Tools:

1. **Canva**: https://www.canva.com/create/open-graph/
2. **Figma**: Use a 1200x630 template
3. **Online OG Image Generator**: https://og-image.vercel.app/

## Example Content:

```
┌─────────────────────────────────────┐
│                                     │
│     Robin te Hofstee                │
│     Personal Blog                   │
│                                     │
│     Technology • React • NextJS     │
│                                     │
└─────────────────────────────────────┘
```

## Alternative:

If you don't have an image yet, you can generate one dynamically using Next.js:

Create `/app/og/route.tsx` with ImageResponse API.

For now, update the config to use a placeholder:
```ts
socialBanner: '/og-image.png', // or '/logo.png' if you have that
```
