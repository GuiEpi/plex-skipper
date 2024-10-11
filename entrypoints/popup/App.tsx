import plexSkipperLogo from "/plex-skipper.png";
import {
  enablePlayNext,
  enablePlexSkipper,
  enableSkipIntro,
  enableSkipCredits,
  delaySkipCredits,
  delaySkipIntro,
} from "@/utils/storage";
import "./App.css";
import DelaySlider from "./components/delay-slider";
import Switch from "./components/switch";

function App() {
  const [plexSkipper, setPlexSkipper] = useState<boolean>(true);
  const [skipIntro, setSkipIntro] = useState<boolean>(true);
  const [skipCredits, setSkipCredits] = useState<boolean>(true);
  const [playNext, setPlayNext] = useState<boolean>(true);
  const [delayIntro, setDelayIntro] = useState<number>(0);
  const [delayCredits, setDelayCredits] = useState<number>(0);

  async function getStoredData() {
    document.body.classList.add("no-animation");

    setPlexSkipper(await enablePlexSkipper.getValue());
    setSkipIntro(await enableSkipIntro.getValue());
    setSkipCredits(await enableSkipCredits.getValue());
    setPlayNext(await enablePlayNext.getValue());
    setDelayIntro(await delaySkipIntro.getValue());
    setDelayCredits(await delaySkipCredits.getValue());

    setTimeout(() => {
      document.body.classList.remove("no-animation");
    }, 20);
  }

  useEffect(() => {
    getStoredData();
  }, []);

  const checkAllDisabled = (
    newSkipIntro: boolean,
    newSkipCredits: boolean,
    newPlayNext: boolean,
  ) => {
    if (!newSkipIntro && !newSkipCredits && !newPlayNext) {
      setPlexSkipper(false);
    } else {
      setPlexSkipper(true);
    }
  };

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
    checkAllDisabled(checked, skipCredits, playNext);
  };

  const handleSkipCreditsChange = async (checked: boolean) => {
    setSkipCredits(checked);
    await enableSkipCredits.setValue(checked);
    checkAllDisabled(skipIntro, checked, playNext);
  };

  const handlePlayNextChange = async (checked: boolean) => {
    setPlayNext(checked);
    await enablePlayNext.setValue(checked);
    checkAllDisabled(skipIntro, skipCredits, checked);
  };

  const handleDelayIntroChange = async (newDelay: number) => {
    setDelayIntro(newDelay);
    await delaySkipIntro.setValue(newDelay);
  };

  const handleDelayCreditsChange = async (newDelay: number) => {
    setDelayCredits(newDelay);
    await delaySkipCredits.setValue(newDelay);
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
        <Switch
          id="enablePlexSkipper"
          checked={plexSkipper}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handlePlexSkipperChange(event.target.checked)
          }
          labelId="header-switch"
        />
      </header>
      <div id="switch-section">
        <Switch
          id="enableSkipIntro"
          checked={skipIntro}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSkipIntroChange(event.target.checked)
          }
          label={browser.i18n.getMessage("enableIntroSwitching")}
          disabled={!plexSkipper}
        />
        <DelaySlider
          id="delayIntro"
          delay={delayIntro}
          onChange={handleDelayIntroChange}
          label={browser.i18n.getMessage("delayLabel")}
        />
        <hr />
        <Switch
          id="enableSkipCredits"
          checked={skipCredits}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSkipCreditsChange(event.target.checked)
          }
          label={browser.i18n.getMessage("enableCreditsSwitching")}
          disabled={!plexSkipper}
        />
        <DelaySlider
          id="delayCredits"
          delay={delayCredits}
          onChange={handleDelayCreditsChange}
          label={browser.i18n.getMessage("delayLabel")}
        />
        <hr />
        <Switch
          id="enablePlayNext"
          checked={playNext}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handlePlayNextChange(event.target.checked)
          }
          label={browser.i18n.getMessage("enablePlayNext")}
          disabled={!plexSkipper}
        />
      </div>
    </>
  );
}

export default App;
