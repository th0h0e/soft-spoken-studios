import type { Collections } from "@nuxt/content";

/**
 * Composable to fetch and use site settings from the data collection
 * Settings can be edited in Nuxt Studio under the "Data" section
 */
export const useSiteSettings = async () => {
  const { data: settings } = await useAsyncData("site-settings", async () => {
    return await queryCollection("settings" as keyof Collections).first();
  });

  return {
    settings,
  };
};
