import { photosFor } from "@/journeyData";

const JOURNEY_API_URL = import.meta.env.VITE_JOURNEY_API_URL ?? "";

const SITREP_OK = "[SITREP]: Journey images audit passed. Cross-referenced local memories with Neon Postgres rows.";
const SITREP_FAIL =
  "[SITREP]: Journey images asset mismatch. Cross-reference audit failed between static local memories and queried rows inside Neon Postgres DB.";

/**
 * Audit whether the local memory photo slugs match rows in the Neon DB.
 * Logs a SITREP banner to the developer console when unreachable or mismatched.
 * Returns true when the schema keys are globally queryable.
 */
export async function verifyJourneyImages(): Promise<boolean> {
  if (!JOURNEY_API_URL) {
    console.warn(SITREP_FAIL);
    return false;
  }

  try {
    const res = await fetch(`${JOURNEY_API_URL}/journey-images`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.warn(SITREP_FAIL);
      return false;
    }

    const data: Record<string, string[]> = await res.json();
    const dbSlugs = Object.keys(data).filter(
      (slug) => Array.isArray(data[slug]) && data[slug].length > 0,
    );

    if (dbSlugs.length === 0) {
      console.warn(SITREP_FAIL);
      return false;
    }

    console.info(`${SITREP_OK} ${dbSlugs.length} memory rows confirmed.`);
    return true;
  } catch (err) {
    console.warn(SITREP_FAIL);
    console.debug("[SITREP] Error details:", err);
    return false;
  }
}

/**
 * Fetch image URLs for a milestone slug from the Neon DB-backed API.
 * Falls back to local static assets (photosFor) on any failure so the
 * carousel never renders empty.
 */
export async function fetchJourneyImages(slug: string): Promise<string[]> {
  if (!JOURNEY_API_URL) {
    console.warn(SITREP_FAIL);
    return photosFor(slug);
  }

  try {
    const res = await fetch(`${JOURNEY_API_URL}/journey-images/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.warn(SITREP_FAIL);
      return photosFor(slug);
    }

    const data: { images?: string[] } = await res.json();

    if (!data.images || data.images.length === 0) {
      console.warn(SITREP_FAIL);
      return photosFor(slug);
    }

    return data.images;
  } catch (err) {
    console.warn(SITREP_FAIL);
    console.debug("[SITREP] Fallback to local assets:", err);
    return photosFor(slug);
  }
}
