const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

global.chrome = {
    storage: {
        local: {
            get: jest.fn((keys, callback) => callback({
                enablePlexSkipper: true,
                enableSkipIntroCredit: true,
                enablePlayNext: true
            }))
        }
    }
};

const { setDefaultCheckboxState, setCheckboxDisability, storeCheckboxState, handlePlexSkipperChange, handleSkipIntroCreditChange, handlePlayNextChange } = require('../src/popup/popup.js');

describe('../src/popup/popup.js', () => {
    let enablePlexSkipper, enableSkipIntroCredit, enablePlayNext;

    beforeEach(() => {
        // Reset all mocks
        jest.resetAllMocks();

        // Set up common mocks
        enablePlexSkipper = document.createElement('input');
        enablePlexSkipper.id = 'enablePlexSkipper';
        document.body.appendChild(enablePlexSkipper);

        enableSkipIntroCredit = document.createElement('input');
        enableSkipIntroCredit.id = 'enableSkipIntroCredit';
        document.body.appendChild(enableSkipIntroCredit);

        enablePlayNext = document.createElement('input');
        enablePlayNext.id = 'enablePlayNext';
        document.body.appendChild(enablePlayNext);
    });

    test('checkboxes are checked by default', () => {
        setDefaultCheckboxState();
         // Use setTimeout to wait for the next event loop tick
        setTimeout(() => {
            expect(enablePlexSkipper.checked).toBe(true);
            expect(enableSkipIntroCredit.checked).toBe(true);
            expect(enablePlayNext.checked).toBe(true);
            done(); // Call done to signal Jest that the test is finished
        }, 0);
    });

    test('checkboxes are disabled when enablePlexSkipper is unchecked', () => {
        setDefaultCheckboxState();
        setTimeout(() => {
            enablePlexSkipper.checked = false;
            setCheckboxDisability();
            expect(enableSkipIntroCredit.disabled).toBe(true);
            expect(enablePlayNext.disabled).toBe(true);
            done();
        }, 0);
    });

    test('checkboxes are enabled when enablePlexSkipper is checked', () => {
        setDefaultCheckboxState();
        setTimeout(() => {
            enablePlexSkipper.checked = true;
            setCheckboxDisability();
            expect(enableSkipIntroCredit.disabled).toBe(false);
            expect(enablePlayNext.disabled).toBe(false);
            done();
        }, 0);
    });

    test('storeCheckboxState is called when enablePlexSkipper is modified', () => {
        setDefaultCheckboxState();
        setTimeout(() => {
            enablePlexSkipper.checked = false;
            handlePlexSkipperChange();
            expect(chrome.storage.local.set).toHaveBeenCalledWith({
                enablePlexSkipper: false,
                enableSkipIntroCredit: false,
                enablePlayNext: false
            });
            done();
        }, 0);
    });

    test('handleSkipIntroCreditChange is called when enableSkipIntroCredit is changed', () => {
        setDefaultCheckboxState();
        setTimeout(() => {
            enableSkipIntroCredit.checked = false;
            handleSkipIntroCreditChange();
            expect(chrome.storage.local.set).toHaveBeenCalledWith({ enableSkipIntroCredit: false });
            done();
        }, 0);
    });

    test('handlePlayNextChange is called when the enablePlayNext option is modified', () => {
        setDefaultCheckboxState();
        setTimeout(() => {
            enablePlayNext.checked = false;
            handlePlayNextChange();
            expect(chrome.storage.local.set).toHaveBeenCalledWith({ enablePlayNext: false });
            done();
        }, 0);
    });
});