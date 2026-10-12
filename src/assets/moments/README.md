# Photo directory — Journey timeline

Drop dated photos here and the `/journey` timeline wires them into the
matching milestone automatically. Nothing needs to be imported by hand.

## Naming

```
YYYY-MM-DD_short-slug.jpg
```

The date **must** come first, then an underscore, then a slug made of
lowercase letters, digits and hyphens. The slug is what matches a
milestone, so keep it short and descriptive.

```
2025-06-07_pakuwon-mall.jpg      -> matches the "pakuwon-mall" child
2025-06-08_birthday-cake.jpg     -> matches "birthday-cake"
2025-08-14_car-sunrise.jpg       -> matches "car-sunrise"
2025-09-02_airport.jpg           -> matches "airport"
```

## Matching rules

- A milestone matches a photo when its `slug` appears in the filename.
- Milestones with no matching photo fall back to a printed
  placeholder sheet, so the timeline never breaks while this is empty.
- Photos whose slug matches nothing are listed under their date, so
  nothing you add gets silently dropped.

## Supported formats

`.jpg .jpeg .png .webp .avif`

## Until this is filled

Every milestone renders a placeholder plate. That is expected — the
feature is data-driven and activates the moment files land here.
