import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { loadLocaleAsync } from "../i18n/i18n-util.async";
import { i18nObject } from "../i18n/i18n-util";

await loadLocaleAsync("ar");
const LL = i18nObject("ar");

export async function GET(context) {
  let posts = await getCollection("blog");
  posts = posts.filter((post) => post.data.lang === "ar");

  return rss({
    title: LL.TITLE(),
    description: LL.DESCRIPTION(),
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/ar/${post.slug}/`,
    })),
  });
}
