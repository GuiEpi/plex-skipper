global.chrome = {
    storage: {
        local: {
            get: jest.fn((key, callback) => callback({ enablePlayNext: true })),
        },
        onChanged: {
            addListener: jest.fn()
        }
    }
};

const { tryClickingNextButton } = require('../src/skipper');

describe('tryClickingNextButton', () => {
    let mockButton;

    beforeEach(() => {
        // Reset all mocks
        jest.resetAllMocks();

        // Set up common mocks
        mockButton = { focus: jest.fn(), click: jest.fn() };
        mockCheckbox = { checked: true };
        document.querySelector = jest.fn().mockReturnValue(mockButton);
        document.getElementById = jest.fn().mockReturnValue(mockCheckbox);
    });

    test('clicks the next button if it exists, enablePlayNext is true, and the checkbox is checked', () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enablePlayNext: true }));

        tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoUpNext-playButton]');
        expect(mockButton.focus).toHaveBeenCalled();
        expect(mockButton.click).toHaveBeenCalled();
    });

    test('clicks the next button if the checkbox is checked and enablePlayNext is not set', () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({}));

        tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoUpNext-playButton]');
        expect(mockButton.focus).toHaveBeenCalled();
        expect(mockButton.click).toHaveBeenCalled();
    });

    test('does not click the next button if enablePlayNext is false', () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enablePlayNext: false }));

        tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(mockButton.focus).not.toHaveBeenCalled();
        expect(mockButton.click).not.toHaveBeenCalled();
    });

    test('does not click the next button if the checkbox is not checked', () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enablePlayNext: true }));
        mockCheckbox.checked = false;

        tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(mockButton.focus).not.toHaveBeenCalled();
        expect(mockButton.click).not.toHaveBeenCalled();
    });

    test('does not throw if the next button does not exist', () => {
        document.querySelector.mockReturnValue(null);

        expect(tryClickingNextButton).not.toThrow();
    });
});