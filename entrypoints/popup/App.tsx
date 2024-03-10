import { useState, useEffect } from "react";
import plexSkipperLogo from "/plex-skipper.png";
import {
  enablePlayNext,
  enablePlexSkipper,
  enableSkipIntroCredit,
} from "@/utils/storage";
import "./App.css";

function App() {
  const [plexSkipper, setPlexSkipper] = useState<boolean>(true);
  const [skipIntroCredit, setSkipIntroCredit] = useState<boolean>(true);
  const [playNext, setPlayNext] = useState<boolean>(true);

  async function getStoredData() {
    setPlexSkipper(await enablePlexSkipper.getValue());
    setSkipIntroCredit(await enableSkipIntroCredit.getValue());
    setPlayNext(await enablePlayNext.getValue());
  }

  useEffect(() => {
    getStoredData();
  }, []);

  const handlePlexSkipperChange = async (checked: boolean) => {
    setPlexSkipper(checked);
    setSkipIntroCredit(checked);
    setPlayNext(checked);
    await Promise.all([
      enablePlexSkipper.setValue(checked),
      enableSkipIntroCredit.setValue(checked),
      enablePlayNext.setValue(checked),
    ]);
  };

  const handleSkipIntroCreditChange = async (checked: boolean) => {
    setSkipIntroCredit(checked);
    await enableSkipIntroCredit.setValue(checked);
  };

  const handlePlayNextChange = async (checked: boolean) => {
    setPlayNext(checked);
    await enablePlayNext.setValue(checked);
  };

  return (
    <>
      <header>
        <div className="title">
          <a href="https://github.com/GuiEpi/plex-skipper" target="_blank">
            <img
              className="logo"
              src={plexSkipperLogo}
              alt="plex-skipper-logo"
            />
            <h1>Plex Skipper</h1>
          </a>
        </div>
        <div className="switch">
          <input
            type="checkbox"
            id="enablePlexSkipper"
            checked={plexSkipper}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlePlexSkipperChange(event.target.checked)
            }
          />
          <label htmlFor="enablePlexSkipper" id="header-switch"></label>
        </div>
      </header>
      <div id="switch-section">
        <div className="switch">
          <p>{browser.i18n.getMessage("enableIntroCreditSwitching")}</p>
          <input
            type="checkbox"
            id="enableSkipIntroCredit"
            checked={skipIntroCredit}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleSkipIntroCreditChange(event.target.checked)
            }
            disabled={!plexSkipper}
          />
          <label htmlFor="enableSkipIntroCredit"></label>
        </div>
        <div className="switch">
          <p>{browser.i18n.getMessage("enablePlayNext")}</p>
          <input
            type="checkbox"
            id="enablePlayNext"
            checked={playNext}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlePlayNextChange(event.target.checked)
            }
            disabled={!plexSkipper}
          />
          <label htmlFor="enablePlayNext"></label>
        </div>
      </div>
    </>
  );
}

export default App;
