
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/login"],
    },
    sitemap: "https://capkup.deelu.online/sitemap.xml",
    host: "https://capkup.deelu.online",
  };
}
