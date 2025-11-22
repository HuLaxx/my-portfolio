import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  process.env.SANITY_API_VERSION ??
  "2024-10-01";

let cachedClient;

export function getSanityClient() {
  if (!projectId || !dataset) return null;
  if (cachedClient) return cachedClient;

  cachedClient = createClient({
    projectId,
    dataset,
    apiVersion,
    perspective: "published",
    stega: {
      enabled: false,
    },
    useCdn: process.env.NODE_ENV === "production",
  });

  return cachedClient;
}

export const hasSanityConfig = Boolean(projectId && dataset);
