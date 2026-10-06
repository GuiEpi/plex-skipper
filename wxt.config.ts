import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: ({ manifestVersion }) => ({
    // Self-hosted servers are granted one by one from the popup.
    ...(manifestVersion === 2
      ? {
          permissions: ["storage", "activeTab"],
          optional_permissions: ["*://*/*"],
        }
      : {
          permissions: ["storage", "scripting", "activeTab"],
          optional_host_permissions: ["*://*/*"],
        }),
    name: "Plex skipper",
    description: "__MSG_extDescription__",
    default_locale: "en",
  }),
});
