import {
  enablePlayNext,
  enablePlexSkipper,
  enableSkipIntro,
  enableSkipCredits,
} from "@/utils/storage";

interface observerOptions {
  childList: boolean;
  subtree: boolean;
}

export default defineContentScript({
  matches: ["*://app.plex.tv/*", "http://*/web/*"],
  main() {
    enablePlexSkipper.watch((newValue, oldValue) => {
      if (!newValue) {
        observer.disconnect();
      } else if (newValue) {
        observer.observe(document, observerOptions);
      }
    });

    function tryClickingButtons(
      records: MutationRecord[],
      observer: MutationObserver,
    ) {
      for (let record of records) {
        if (record.addedNodes.length) {
          tryClickingSkipButton();
          tryClickingNextButton();
          break;
        }
      }
    }

    const observerOptions = {
      childList: true,
      subtree: true,
    };

    const observer = new MutationObserver(tryClickingButtons);

    startMutationObserver(observer, observerOptions);
  },
});

const startMutationObserver = async (
  observer: MutationObserver,
  observerOptions: observerOptions,
) => {
  const plexSkipper = await enablePlexSkipper.getValue();
  if (plexSkipper) {
    observer.observe(document, observerOptions);
  }
};

const tryClickingSkipButton = async (): Promise<void> => {
  const skipIntro = await enableSkipIntro.getValue();
  const skipCredits = await enableSkipCredits.getValue();
  const section = await determinePlaybackSection();
  const skipButtons = document.querySelector(
    "[class*=AudioVideoFullPlayer-overlayButton]",
  ) as HTMLButtonElement;
  if (skipIntro && section === "INTRO" && skipButtons) {
    clickSkipButton(skipButtons);
  } else if (skipCredits && section === "CREDITS" && skipButtons) {
    clickSkipButton(skipButtons);
  }
};

const tryClickingNextButton = async (): Promise<void> => {
  const skipIntroCredit = await enablePlayNext.getValue();
  const checkBox = document.getElementById("autoPlayCheck") as HTMLInputElement;
  if (skipIntroCredit && checkBox && checkBox.checked) {
    const nextButton = document.querySelector(
      "[class*=AudioVideoUpNext-playButton]",
    ) as HTMLButtonElement;
    if (nextButton) {
      nextButton.focus();
      nextButton.click();
    }
  }
};

const clickSkipButton = (skipButtons: HTMLButtonElement) => {
  if (!skipButtons.classList.contains("isFocused")) {
    simulateClick(skipButtons);
  }
  skipButtons.click();
};

const simulateClick = (element: HTMLButtonElement): void => {
  ["mousedown", "mouseup", "click"].forEach((eventType) => {
    element.dispatchEvent(
      new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }),
    );
  });
};

const determinePlaybackSection = async (): Promise<
  "INTRO" | "CREDITS" | "UNKNOWN"
> => {
  const slider: HTMLButtonElement | null = document.querySelector(
    "[class*=Slider-thumb-]:not([aria-labelledby])",
  );
  if (!slider) {
    return "UNKNOWN";
  }

  const valuenow = parseInt(slider.getAttribute("aria-valuenow") || "0", 10);
  const valuemax = parseInt(slider.getAttribute("aria-valuemax") || "1", 10);
  const progress = (valuenow / valuemax) * 100;

  if (progress < 50) {
    return "INTRO";
  }
  return "CREDITS";
};
