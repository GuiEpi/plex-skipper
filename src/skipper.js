function tryClickingSkipButton() {
    const skipButtons = document.querySelectorAll('.AudioVideoFullPlayer-overlayButton-D2xSex');
    skipButtons.forEach(button => {
        if (window.getComputedStyle(button).opacity === '1') {
            button.click();
        }
    });
}

function startMutationObserver() {
    const observer = new MutationObserver((mutations, obs) => {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                tryClickingSkipButton();
                break;
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}

function isVideoPage(url) {
    const videoPagePattern = /https:\/\/app\.plex\.tv\/.+/;
    return videoPagePattern.test(url);
}

if (isVideoPage(window.location.href)) {
    startMutationObserver();
}

window.addEventListener('beforeunload', () => {
    observer.disconnect();
});

module.exports = {
    tryClickingSkipButton,
    startMutationObserver,
    isVideoPage
};
