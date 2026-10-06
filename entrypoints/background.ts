import { syncServerContentScripts, toWebMatch } from "@/utils/servers";

export default defineBackground(() => {
  syncServerContentScripts();

  // Handled here rather than in the popup: Firefox closes the popup while
  // the permission prompt is shown.
  browser.permissions.onAdded.addListener(async ({ origins = [] }) => {
    await syncServerContentScripts();
    if (!origins.length) return;
    // Reload the server tabs so the newly registered script runs right away.
    const tabs = await browser.tabs.query({ url: origins.map(toWebMatch) });
    for (const tab of tabs) {
      if (tab.id !== undefined) browser.tabs.reload(tab.id);
    }
  });

  browser.permissions.onRemoved.addListener(() => {
    syncServerContentScripts();
  });
});
