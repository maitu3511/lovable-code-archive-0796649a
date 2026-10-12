import logoWithTagline from "../assets/branding/advay-engineers-logo-with-tagline.png.asset.json";

// Keep uploaded branding independent of the site's deployment origin.
// Use relative path to avoid unnecessary preconnects to preview instances in production.
export const taglineLogoUrl = logoWithTagline.url;
