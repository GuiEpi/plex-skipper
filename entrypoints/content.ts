import {
  enablePlayNext,
  enablePlexSkipper,
  enableSkipIntro,
  enableSkipCredits,
  delaySkipCredits,
  delaySkipIntro,
} from "@/utils/storage";

interface observerOptions {
  childList: boolean;
  subtree: boolean;
}

export default defineContentScript({
  matches: ["*://app.plex.tv/*", "http://*/web/*"],
  main() {
    enablePlexSkipper.watch((newValue: boolean, oldValue: boolean) => {
      if (!newValue) {
        observer.disconnect();
      } else if (newValue) {
        observer.observe(document, observerOptions);
      }
    });

    function tryClickingButtons(
      records: MutationRecord[],
      _: MutationObserver,
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

/**
 * Start the MutationObserver.
 */
const startMutationObserver = async (
  observer: MutationObserver,
  observerOptions: observerOptions,
): Promise<void> => {
  const plexSkipper = await enablePlexSkipper.getValue();
  if (plexSkipper) {
    observer.observe(document, observerOptions);
  }
};

/**
 * Try clicking on the buttons to skip the intro and credits.
 */
const tryClickingSkipButton = async (): Promise<void> => {
  const skipButtons: HTMLButtonElement | null = document.querySelector(
    "[class*=AudioVideoFullPlayer-overlayButton]",
  );
  if (!skipButtons) return;
  const skipIntro = await enableSkipIntro.getValue();
  const skipCredits = await enableSkipCredits.getValue();
  const delayIntro = await delaySkipIntro.getValue();
  const delayCredits = await delaySkipCredits.getValue();

  const section = await determinePlaybackSection();

  if (skipIntro && section === "intro") {
    clickSkipButton(skipButtons, delayIntro);
  } else if (skipCredits && section === "credits") {
    clickSkipButton(skipButtons, delayCredits);
  }
};

/**
 * Try clicking on the button to skip to the next episode (only if autoplay is enabled).
 */
const tryClickingNextButton = async (): Promise<void> => {
  const skipIntroCredit = await enablePlayNext.getValue();
  if (!skipIntroCredit) return;
  const checkBox: HTMLInputElement | null = document.getElementById(
    "autoPlayCheck",
  ) as HTMLInputElement;

  if (checkBox && checkBox.checked) {
    const nextButton = document.querySelector(
      "[class*=AudioVideoUpNext-playButton]",
    ) as HTMLButtonElement;

    if (nextButton) {
      nextButton.focus();
      nextButton.click();
    }
  }
};

/**
 * Choose the right method to click the skip button.
 */
const clickSkipButton = (skipButtons: HTMLButtonElement, delay: number) => {
  setTimeout(() => {
    if (!skipButtons.classList.contains("isFocused")) {
      simulateClick(skipButtons);
    }
    skipButtons.click();
  }, delay);
};

/**
 * Simulate a click event on the button.
 */
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

/**
 * Determine the current playback section.
 */
const determinePlaybackSection = async (): Promise<
  "intro" | "credits" | "unknown"
> => {
  const slider: HTMLButtonElement | null = document.querySelector(
    "[class*=Slider-thumb-]:not([aria-labelledby])",
  );
  if (!slider) {
    return "unknown";
  }

  const valuenow = parseInt(slider.getAttribute("aria-valuenow") || "0", 10);
  const valuemax = parseInt(slider.getAttribute("aria-valuemax") || "1", 10);
  const progress = (valuenow / valuemax) * 100;

  if (progress < 50) {
    return "intro";
  }
  return "credits";
};
