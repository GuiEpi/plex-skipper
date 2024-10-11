import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["storage"],
    name: "Plex skipper",
    description: "__MSG_extDescription__",
    default_locale: "en",
  },
});
