import { describe, expect, it, vi } from "vitest";

vi.mock("@lovable.dev/vite-tanstack-config", () => ({
  defineConfig: (options: unknown) => options,
}));

import config from "../../vite.config";

describe("Netlify website entry", () => {
  it("uses the Netlify server instead of the preserved legacy HTML renderer", () => {
    const options = config as unknown as {
      nitro: { preset: string; renderer: boolean; output?: unknown };
      tanstackStart: { server: { entry: string } };
    };
    expect(options.nitro.preset).toBe("netlify");
    expect(options.nitro.renderer).toBe(false);
    expect(options.nitro.output).toBeUndefined();
    expect(options.tanstackStart.server.entry).toBe("server");
  });
});