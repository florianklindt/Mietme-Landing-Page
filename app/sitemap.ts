import type { MetadataRoute } from "next";

const BASE = "https://mietme.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          de: `${BASE}/`,
          en: `${BASE}/`,
        },
      },
    },
    {
      url: `${BASE}/ueber-uns`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          de: `${BASE}/ueber-uns`,
          en: `${BASE}/ueber-uns`,
        },
      },
    },
    {
      url: `${BASE}/impressum`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/datenschutz`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
