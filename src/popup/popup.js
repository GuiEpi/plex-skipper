var enablePlexSkipper;
var enableSkipIntroCredit;
var enablePlayNext;

function setDefaultCheckboxState() {
    document.body.classList.add('no-animation');

    chrome.storage.local.get(['enablePlexSkipper', 'enableSkipIntroCredit', 'enablePlayNext'], function(result) {
        enablePlexSkipper.checked = result.enablePlexSkipper !== false;
        enableSkipIntroCredit.checked = result.enableSkipIntroCredit !== false;
        enablePlayNext.checked = result.enablePlayNext !== false;

        setCheckboxDisability();

        setTimeout(() => {
            document.body.classList.remove('no-animation');
        }, 10); 
    });
}

function setCheckboxDisability() {
    enableSkipIntroCredit.disabled = !enablePlexSkipper.checked;
    enablePlayNext.disabled = !enablePlexSkipper.checked;
}

function storeCheckboxState() {
    chrome.storage.local.set({
        enablePlexSkipper: enablePlexSkipper.checked,
        enableSkipIntroCredit: enableSkipIntroCredit.checked,
        enablePlayNext: enablePlayNext.checked
    });
}

function handlePlexSkipperChange() {
    enableSkipIntroCredit.checked = enablePlexSkipper.checked;
    enablePlayNext.checked = enablePlexSkipper.checked;
    setCheckboxDisability();
    storeCheckboxState();
    chrome.storage.local.set({isSkipperOn: enablePlexSkipper.checked});
}

function handleSkipIntroCreditChange() {
    chrome.storage.local.set({enableSkipIntroCredit: enableSkipIntroCredit.checked});
}

function handlePlayNextChange() {
    chrome.storage.local.set({enablePlayNext: enablePlayNext.checked});
}

document.addEventListener('DOMContentLoaded', function () {
    enablePlexSkipper = document.getElementById('enablePlexSkipper');
    enableSkipIntroCredit = document.getElementById('enableSkipIntroCredit');
    enablePlayNext = document.getElementById('enablePlayNext');

    setDefaultCheckboxState();
    setCheckboxDisability();

    enablePlexSkipper.addEventListener('change', handlePlexSkipperChange);
    enableSkipIntroCredit.addEventListener('change', handleSkipIntroCreditChange);
    enablePlayNext.addEventListener('change', handlePlayNextChange);
});

module.exports = {
    setDefaultCheckboxState,
    setCheckboxDisability,
    storeCheckboxState,
    handlePlexSkipperChange,
    handleSkipIntroCreditChange,
    handlePlayNextChange
};