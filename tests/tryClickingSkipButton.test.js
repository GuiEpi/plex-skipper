global.chrome = {
    storage: {
        local: {
            get: jest.fn((key, callback) => callback({ enableSkipIntroCredit: true })),
            set: jest.fn(),
        },
        onChanged: {
            addListener: jest.fn(),
        }
    }
};

const { tryClickingSkipButton } = require('../src/skipper');

describe('tryClickingSkipButton', () => {
    let mockButton;

    beforeEach(() => {
        // Reset all mocks
        jest.resetAllMocks();

        // Set up common mocks
        mockButton = { style: { opacity: '1' }, click: jest.fn() };
        document.querySelector = jest.fn().mockReturnValue(mockButton);
        window.getComputedStyle = jest.fn().mockImplementation(elem => elem.style);
    });

    test('clicks the skip button if it exists, enableSkipIntroCredit is true', async () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enableSkipIntroCredit: true }));
    
        await tryClickingSkipButton();
    
        expect(chrome.storage.local.get).toHaveBeenCalledWith('enableSkipIntroCredit', expect.any(Function));
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoFullPlayer-overlayButton]');
        expect(mockButton.click).toHaveBeenCalled();
    });

    test('does not click the skip button if enableSkipIntroCredit is false', async () => {
        chrome.storage.local.get = jest.fn((key, callback) => callback({ enableSkipIntroCredit: false }));

        await tryClickingSkipButton();

        expect(chrome.storage.local.get).toHaveBeenCalledWith('enableSkipIntroCredit', expect.any(Function));
        expect(mockButton.click).not.toHaveBeenCalled();
    });

    test('does not throw if the skip button does not exist', async () => {
        document.querySelector.mockReturnValue(null);

        await expect(tryClickingSkipButton).not.toThrow();
    });
});