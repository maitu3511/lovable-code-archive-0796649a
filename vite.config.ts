import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Optimize for Netlify deployment while preserving Lovable sandbox defaults
  nitro: process.env.LOVABLE_SANDBOX === "1" ? {} : {
    preset: "netlify",
    renderer: false,
    output: {
      dir: "dist",
      publicDir: "dist",
    }
  }
});
