import { enablePlayNext, enablePlexSkipper, enableSkipIntroCredit } from '@/utils/storage';

interface observerOptions {
  childList: boolean;
  subtree: boolean;
}

export default defineContentScript({
  matches: ['*://app.plex.tv/*', 'http://*/web/*'],
  main() {
    enablePlexSkipper.watch((newValue, oldValue) => {
      if (!newValue) {
        console.log('Plex Skipper disabled');
        observer.disconnect();
      } else if (newValue) {
        console.log('Plex Skipper enabled');
        observer.observe(document, observerOptions);
      } 
    });
    
    function tryClickingButtons(records: MutationRecord[], observer: MutationObserver) {
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

    console.log('Plex Skipper content script loaded');
    startMutationObserver(observer, observerOptions);

    window.addEventListener('beforeunload', () => {
      if (observer) {
        observer.disconnect();
      }
    });
  },
});

const startMutationObserver = async (observer: MutationObserver, observerOptions: observerOptions) => {
  const plexSkipper = await enablePlexSkipper.getValue();
  if (plexSkipper) {
    observer.observe(document, observerOptions);
  }
}

const tryClickingSkipButton = async () => {
  const skipIntroCredit = await enableSkipIntroCredit.getValue();
  const skipButtons = document.querySelector('[class*=AudioVideoFullPlayer-overlayButton]') as HTMLButtonElement;
  if (skipIntroCredit && skipButtons) {
    skipButtons.click();
  }
}

const tryClickingNextButton = async () => {
  const skipIntroCredit = await enablePlayNext.getValue();
  const checkBox = document.getElementById('autoPlayCheck') as HTMLInputElement;
  if (skipIntroCredit && checkBox && checkBox.checked) {
    const nextButton = document.querySelector('[class*=AudioVideoUpNext-playButton]') as HTMLButtonElement;
    if (nextButton) {
      nextButton.focus();
      nextButton.click();
    }
  }
}