# Photo directory — drop anything in here

**No renaming required.** Every image you drop into this folder is picked
up automatically and shown on the site. Nothing needs to be imported by
hand, and the filenames don't need to mean anything.

## Where the photos actually live

The photos are **not** served from this folder at runtime. This folder is
only the upload source:

```
node scripts/upload-moments.mjs
```

That script compresses each photo with `sharp` (max 1600px edge, WebP
quality 80) and uploads the compressed WebP to the Neon Object Storage
bucket `media` (public_read). It writes `manifest.json`, which maps every
original filename to its storage key — the app reads that manifest and
builds image URLs from the storage endpoint, so the browser never
touches the project folder.

Drop new photos here and re-run the upload script. Delete old ones and
re-run it again; the manifest is regenerated from scratch each time.

## What happens to each photo

- It joins the **memories gallery** on the `/plan` page.
- It can also fill the **focused card view** on `/journey`, for any
  milestone that doesn't have a photo of its own.

## Optional: pin a photo to a milestone

If you want a specific photo to stick to a specific moment, name it with
a date first and a short description after:

```
2025-06-07_pakuwon-mall.jpg     → pins to the Pakuwon City Mall milestone
2025-08-14_car-sunrise.png      → pins to the "sleeping in the car" one
```

The date part is what makes it a match — keep it as `YYYY-MM-DD` at the
start, then an underscore, then a slug of lowercase letters and hyphens.

Photos named this way get the date shown as their caption instead of the
filename. Everything else just uses its filename.

## Supported formats

`.jpg .jpeg .png .webp .avif`

## Until this has photos

The gallery falls back to a small set of sample images, and the focused
cards show a printed "photo pending" plate. That is expected — the
moment real files land here and are uploaded, they take over on their
own.