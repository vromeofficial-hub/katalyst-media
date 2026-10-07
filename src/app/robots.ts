import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/report", "/report/"],
    }, {
      // Let messaging apps unfurl an existing shared link; reports stay noindex.
      userAgent: ["WhatsApp", "facebookexternalhit", "Facebot", "Twitterbot", "Slackbot", "Discordbot", "LinkedInBot", "TelegramBot"],
      allow: "/",
      disallow: ["/admin", "/admin/"],
    }],
    sitemap: `${company.url}/sitemap.xml`,
  };
}
