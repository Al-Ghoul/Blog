import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://al-ghoul.github.io",
  base: "Blog",
  output: "static",
  integrations: [mdx(), sitemap(), tailwind()],
  i18n: {
    defaultLocale: "en",
    locales: ["ar", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  markdown: {
    remarkPlugins: [
      remarkMath,
    ],
    rehypePlugins: [
      // This function MUST be an async
      // deno-lint-ignore require-await
      () => async (tree) => {
        for (const node of tree.children) {
          if (
            node.tagName === "pre" && node.properties &&
            node.properties.className
          ) {
            node.properties.className.push("mockup-code");
          }
          if (node.tagName === "blockquote" && node.properties) {
            node.properties.className = ["alert"];
          }
        }
      },
      rehypeKatex,
    ],
  },
});
