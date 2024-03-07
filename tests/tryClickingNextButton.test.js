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

    test('clicks the next button if it exists, enablePlayNext is true, and the checkbox is checked', async () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enablePlayNext: true }));

        await tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoUpNext-playButton]');
        expect(mockButton.focus).toHaveBeenCalled();
        expect(mockButton.click).toHaveBeenCalled();
    });

    test('clicks the next button if the checkbox is checked and enablePlayNext is not set', async () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({}));

        await tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoUpNext-playButton]');
        expect(mockButton.focus).toHaveBeenCalled();
        expect(mockButton.click).toHaveBeenCalled();
    });

    test('does not click the next button if enablePlayNext is false', async () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enablePlayNext: false }));

        await tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(mockButton.focus).not.toHaveBeenCalled();
        expect(mockButton.click).not.toHaveBeenCalled();
    });

    test('does not click the next button if the checkbox is not checked', async () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enablePlayNext: true }));
        mockCheckbox.checked = false;

        await tryClickingNextButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enablePlayNext', expect.any(Function));
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(mockButton.focus).not.toHaveBeenCalled();
        expect(mockButton.click).not.toHaveBeenCalled();
    });

    test('does not throw if the next button does not exist', async () => {
        document.querySelector.mockReturnValue(null);

        await expect(tryClickingNextButton).not.toThrow();
    });
});