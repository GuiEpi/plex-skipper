let observer;

async function tryClickingSkipButton() {
  chrome.storage.local.get('enableSkipIntroCredit', function(result) {
    const skipButtons = document.querySelector('[class*=AudioVideoFullPlayer-overlayButton]');
    if (result.enableSkipIntroCredit && skipButtons) {
      skipButtons.click();
    }
  });
}

async function tryClickingNextButton() {
  chrome.storage.local.get('enablePlayNext', function(result) {
    const checkBox = document.getElementById('autoPlayCheck');
    if (result.enablePlayNext && checkBox && checkBox.checked) {
      const nextButton = document.querySelector('[class*=AudioVideoUpNext-playButton]');
      if (nextButton) {
        nextButton.focus();
        nextButton.click();
      }
    }
  });
}

function startMutationObserver() {
  observer = new MutationObserver((mutations, obs) => {
    for (let mutation of mutations) {
      if (mutation.addedNodes.length) {
        tryClickingSkipButton();
        tryClickingNextButton();
        break;
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

chrome.storage.local.get('enablePlexSkipper', function(result) {
  if (result.enablePlexSkipper !== false) {
    startMutationObserver();
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.enablePlexSkipper) {
    if (changes.enablePlexSkipper.newValue && observer) {
      startMutationObserver();
    } else if (!changes.enablePlexSkipper.newValue && observer) {
      observer.disconnect();
    }
  }
});

window.addEventListener('beforeunload', () => {
  observer.disconnect();
});

module.exports = {
  tryClickingSkipButton,
  tryClickingNextButton,
  startMutationObserver
};
