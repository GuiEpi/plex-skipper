import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    permissions: ["storage"],
    name: "Plex skipper",
    description: "__MSG_extDescription__",
    default_locale: "en",
  },
});
