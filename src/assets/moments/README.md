# Photo directory — drop anything in here

**No renaming required.** Every image you drop into this folder is picked
up automatically and shown on the site. Nothing needs to be imported by
hand, and the filenames don't need to mean anything.

## What happens to each photo

- It joins the **memories gallery** on the `/memories` page.
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
moment real files land here, they take over on their own.
