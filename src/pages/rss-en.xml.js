import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { loadLocaleAsync } from "../i18n/i18n-util.async";
import { i18nObject } from "../i18n/i18n-util";

await loadLocaleAsync("en");
const LL = i18nObject("en");

export async function GET(context) {
  let posts = await getCollection("blog");
  posts = posts.filter((post) => post.data.lang === "en");

  return rss({
    title: LL.TITLE(),
    description: LL.DESCRIPTION(),
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/en/${post.slug}/`,
    })),
  });
}
