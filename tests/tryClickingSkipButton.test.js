const { tryClickingSkipButton } = require('../src/skipper');

describe('tryClickingSkipButton', () => {
    test('clicks the button if it has opacity 1', () => {
        // Mock document.querySelector and window.getComputedStyle
        const mockButton = { style: { opacity: '1' }, click: jest.fn() };
        document.querySelector = jest.fn().mockReturnValue(mockButton);
        window.getComputedStyle = jest.fn().mockImplementation(elem => elem.style);

        tryClickingSkipButton();

        // Assert that button.click is called
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoFullPlayer-overlayButton]');
        expect(mockButton.click).toHaveBeenCalled();
    });

    test('does not click the button if it has opacity 0', () => {
        // Mock document.querySelector and window.getComputedStyle
        const mockButton = { style: { opacity: '0' }, click: jest.fn() };
        document.querySelector = jest.fn().mockReturnValue(mockButton);
        window.getComputedStyle = jest.fn().mockImplementation(elem => elem.style);

        tryClickingSkipButton();

        // Assert that button.click is not called
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoFullPlayer-overlayButton]');
        expect(mockButton.click).not.toHaveBeenCalled();
    });

    test('does not throw if the button does not exist', () => {
        // Mock document.querySelector to return null
        document.querySelector = jest.fn().mockReturnValue(null);

        expect(tryClickingSkipButton).not.toThrow();
    });
});