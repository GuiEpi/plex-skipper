async function tryClickingSkipButton() {
  const skipButtons = document.querySelector('[class*=AudioVideoFullPlayer-overlayButton]');
  if (skipButtons && window.getComputedStyle(skipButtons).opacity === '1') {
    skipButtons.click();
  }
}

async function tryClickingNextButton() {
  const checkBox = document.getElementById('autoPlayCheck');
  if (checkBox && checkBox.checked) {
    const nextButton = document.querySelector('[class*=AudioVideoUpNext-playButton]');
    if (nextButton) {
      nextButton.focus();
      nextButton.click();
    }
  }
}

function startMutationObserver() {
  const observer = new MutationObserver((mutations, obs) => {
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

window.addEventListener('beforeunload', () => {
  observer.disconnect();
});

module.exports = {
  tryClickingSkipButton,
  tryClickingNextButton,
  startMutationObserver
};
