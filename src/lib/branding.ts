import logoWithTagline from "../assets/branding/advay-engineers-logo-with-tagline.png.asset.json";

// Keep uploaded branding independent of the site's deployment origin.
export const taglineLogoUrl = new URL(
  logoWithTagline.url,
  "https://id-preview--f7ba88b9-47a1-43c0-8404-de11cc9c4ab8.lovable.app",
).href;
