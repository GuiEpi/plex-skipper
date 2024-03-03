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

startMutationObserver();

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let key in changes) {
    if (key === 'isSkipperOn') {
      if (!changes[key].newValue && observer) {
        observer.disconnect();
      } else if (changes[key].newValue) {
        startMutationObserver();
      }
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
