const { tryClickingNextButton } = require('../src/skipper');

describe('tryClickingNextButton', () => {
    test('clicks the next button if it exists and checkbox is checked', () => {
        // Mock document.querySelector and document.getElementById
        const mockButton = { focus: jest.fn(), click: jest.fn() };
        const mockCheckBox = { checked: true };
        document.querySelector = jest.fn().mockReturnValue(mockButton);
        document.getElementById = jest.fn().mockReturnValue(mockCheckBox);

        tryClickingNextButton();

        // Assert that button.focus and button.click are called
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(document.querySelector).toHaveBeenCalledWith('[class*=AudioVideoUpNext-playButton]');
        expect(mockButton.focus).toHaveBeenCalled();
        expect(mockButton.click).toHaveBeenCalled();
    });

    test('does not click the next button if checkbox is not checked', () => {
        // Mock document.querySelector and document.getElementById
        const mockButton = { focus: jest.fn(), click: jest.fn() };
        const mockCheckBox = { checked: false };
        document.querySelector = jest.fn().mockReturnValue(mockButton);
        document.getElementById = jest.fn().mockReturnValue(mockCheckBox);

        tryClickingNextButton();

        // Assert that button.focus and button.click are not called
        expect(document.getElementById).toHaveBeenCalledWith('autoPlayCheck');
        expect(mockButton.focus).not.toHaveBeenCalled();
        expect(mockButton.click).not.toHaveBeenCalled();
    });

    test('does not throw if the next button does not exist', () => {
        // Mock document.querySelector to return null
        document.querySelector = jest.fn().mockReturnValue(null);

        expect(tryClickingNextButton).not.toThrow();
    });
});