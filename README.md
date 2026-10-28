# The Concours Garage — website

Marketing site for The Concours Garage (Stuart, FL): home page plus `/cars-and-coffee` and `/contact`.
Built with Next.js 16.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Deploy (Vercel)

Import this repo into Vercel (framework preset: Next.js), then set the environment variables from
`.env.example`:

- `NEXT_PUBLIC_SITE_URL`: the production URL, used for canonical URLs, the sitemap and Open Graph.
- `RESEND_API_KEY` (optional): sends RSVP, "Submit your car" and tour requests to `INQUIRY_TO_EMAIL`.
  The sending domain in `INQUIRY_FROM_EMAIL` must be verified in Resend. Without a key, forms open the
  visitor's email app with the message filled in instead.

## Editing content

- Contact details, the Cars & Coffee day and time, and the charity name: `lib/site.ts`
- Cars & Coffee event photos: add files to `public/images/cars-and-coffee/` and list them in
  `EVENT_PHOTOS` in `lib/site.ts`
- Home page sections: `app/page.tsx`
- Cars & Coffee page and its FAQ: `app/cars-and-coffee/page.tsx`
- Styles: `app/globals.css`
