export default {
  external: ["@capacitor/core"],
  input: "dist/esm/index.js",
  output: [
    {
      file: "dist/plugin.js",
      format: "iife",
      globals: {
        "@capacitor/core": "capacitorExports",
      },
      inlineDynamicImports: true,
      name: "capacitorCapacitorCalendar",
      sourcemap: true,
    },
    {
      file: "dist/plugin.cjs.js",
      format: "cjs",
      inlineDynamicImports: true,
      sourcemap: true,
    },
  ],
};
