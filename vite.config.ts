import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // The Lovable configuration overrides this preset inside its managed builds.
  // Netlify uses its native function/static output layout. Do not serve the
  // preserved legacy index.html as a renderer before the TanStack website.
  nitro: {
    preset: "netlify",
    renderer: false,
  },
});
