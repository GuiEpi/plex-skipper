import {
  getGrantedServerOrigins,
  isSelfHostedPlexUrl,
  toOriginPattern,
} from "@/utils/servers";
import "./server-access.css";

/**
 * Lets the user grant access to the self-hosted Plex server open in the
 * current tab. Renders nothing on other pages.
 */
function ServerAccess() {
  const [origin, setOrigin] = useState<string | null>(null);
  const [granted, setGranted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!isSelfHostedPlexUrl(tab?.url)) return;
      const pattern = toOriginPattern(tab.url);
      setOrigin(pattern);
      setGranted((await getGrantedServerOrigins()).includes(pattern));
    })();
  }, []);

  if (!origin) return null;

  const handleEnable = async () => {
    // Registration and tab reload happen in the background script.
    setGranted(await browser.permissions.request({ origins: [origin] }));
  };

  const handleDisable = async () => {
    await browser.permissions.remove({ origins: [origin] });
    setGranted(false);
  };

  return (
    <div id="server-access">
      {granted ? (
        <>
          <span>{browser.i18n.getMessage("serverEnabled")}</span>
          <button className="link" onClick={handleDisable}>
            {browser.i18n.getMessage("serverDisable")}
          </button>
        </>
      ) : (
        <button onClick={handleEnable}>
          {browser.i18n.getMessage("serverEnable")}
        </button>
      )}
    </div>
  );
}

export default ServerAccess;
