import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Replace this with your actual domain
  const baseUrl = "https://www.mustpikek.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
