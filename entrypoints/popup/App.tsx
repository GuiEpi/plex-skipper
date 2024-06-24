import { useState, useEffect } from "react";
import plexSkipperLogo from "/plex-skipper.png";
import {
  enablePlayNext,
  enablePlexSkipper,
  enableSkipIntro,
  enableSkipCredits,
} from "@/utils/storage";
import "./App.css";

function App() {
  const [plexSkipper, setPlexSkipper] = useState<boolean>(true);
  const [skipIntro, setSkipIntro] = useState<boolean>(true);
  const [skipCredits, setSkipCredits] = useState<boolean>(true);
  const [playNext, setPlayNext] = useState<boolean>(true);

  async function getStoredData() {
    document.body.classList.add("no-animation");

    setPlexSkipper(await enablePlexSkipper.getValue());
    setSkipIntro(await enableSkipIntro.getValue());
    setSkipCredits(await enableSkipCredits.getValue());
    setPlayNext(await enablePlayNext.getValue());

    setTimeout(() => {
      document.body.classList.remove("no-animation");
    }, 20);
  }

  useEffect(() => {
    getStoredData();
  }, []);

  const handlePlexSkipperChange = async (checked: boolean) => {
    setPlexSkipper(checked);
    setSkipIntro(checked);
    setSkipCredits(checked);
    setPlayNext(checked);
    await Promise.all([
      enablePlexSkipper.setValue(checked),
      enableSkipIntro.setValue(checked),
      enableSkipCredits.setValue(checked),
      enablePlayNext.setValue(checked),
    ]);
  };

  const handleSkipIntroChange = async (checked: boolean) => {
    setSkipIntro(checked);
    await enableSkipIntro.setValue(checked);
  };

  const handleSkipCreditsChange = async (checked: boolean) => {
    setSkipCredits(checked);
    await enableSkipCredits.setValue(checked);
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
          <p>{browser.i18n.getMessage("enableIntroSwitching")}</p>
          <input
            type="checkbox"
            id="enableSkipIntro"
            checked={skipIntro}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleSkipIntroChange(event.target.checked)
            }
            disabled={!plexSkipper}
          />
          <label htmlFor="enableSkipIntro"></label>
        </div>
        <div className="switch">
          <p>{browser.i18n.getMessage("enableCreditsSwitching")}</p>
          <input
            type="checkbox"
            id="enableSkipCredits"
            checked={skipCredits}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleSkipCreditsChange(event.target.checked)
            }
            disabled={!plexSkipper}
          />
          <label htmlFor="enableSkipCredits"></label>
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
