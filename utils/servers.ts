/**
 * Self-hosted Plex servers (e.g. http://192.168.1.10:32400/web) are opt-in:
 * the user grants a host permission from the popup, then the content script
 * is registered at runtime for that host only.
 */

const PLEX_APP_HOST = "app.plex.tv";
const SCRIPT_ID_PREFIX = "plex-server-";
const CONTENT_SCRIPT_FILE = "content-scripts/content.js";

/**
 * Host permission pattern for a page URL. Ports are left out because Firefox
 * does not accept them in match patterns.
 */
const toOriginPattern = (url: string): string => {
  const { protocol, hostname } = new URL(url);
  return `${protocol}//${hostname}/*`;
};

/**
 * Whether the URL looks like a self-hosted Plex Web App.
 */
const isSelfHostedPlexUrl = (url: string | undefined): url is string => {
  if (!url) return false;
  try {
    const { protocol, hostname, pathname } = new URL(url);
    return (
      (protocol === "http:" || protocol === "https:") &&
      hostname !== PLEX_APP_HOST &&
      pathname.startsWith("/web")
    );
  } catch {
    return false;
  }
};

/**
 * Origins the user has granted for self-hosted servers.
 */
const getGrantedServerOrigins = async (): Promise<string[]> => {
  const { origins = [] } = await browser.permissions.getAll();
  return origins.filter((origin) => !origin.includes(PLEX_APP_HOST));
};

const toWebMatch = (origin: string): string => origin.replace(/\*$/, "web/*");

// Firefox-only MV2 API, missing from WXT's (Chrome based) browser types.
interface RegisteredContentScript {
  unregister(): Promise<void>;
}
interface Mv2ContentScripts {
  register(options: {
    matches: string[];
    js: { file: string }[];
    runAt: "document_idle";
  }): Promise<RegisteredContentScript>;
}

// Firefox MV2 registrations live as long as the background page, so we keep
// the handles here to unregister them later.
const mv2Registrations: RegisteredContentScript[] = [];

/**
 * Register the content script for every granted server, and only those.
 */
const syncServerContentScripts = async (): Promise<void> => {
  const origins = await getGrantedServerOrigins();
  const matches = origins.map(toWebMatch);

  if (import.meta.env.MANIFEST_VERSION === 2) {
    await Promise.all(mv2Registrations.splice(0).map((r) => r.unregister()));
    if (!matches.length) return;
    mv2Registrations.push(
      await (
        browser as unknown as { contentScripts: Mv2ContentScripts }
      ).contentScripts.register({
        matches,
        js: [{ file: `/${CONTENT_SCRIPT_FILE}` }],
        runAt: "document_idle",
      }),
    );
    return;
  }

  const registered = await browser.scripting.getRegisteredContentScripts();
  const ids = registered
    .map((script) => script.id)
    .filter((id) => id.startsWith(SCRIPT_ID_PREFIX));
  if (ids.length) {
    await browser.scripting.unregisterContentScripts({ ids });
  }
  if (!matches.length) return;
  await browser.scripting.registerContentScripts([
    {
      id: `${SCRIPT_ID_PREFIX}servers`,
      matches,
      js: [CONTENT_SCRIPT_FILE],
      runAt: "document_idle",
    },
  ]);
};

export {
  toOriginPattern,
  isSelfHostedPlexUrl,
  getGrantedServerOrigins,
  syncServerContentScripts,
  toWebMatch,
};
