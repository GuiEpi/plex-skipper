const { tryClickingSkipButton } = require('../src/skipper');

describe('tryClickingSkipButton', () => {
    test('clicks buttons with opacity 1', () => {
        // Mock document.querySelectorAll and window.getComputedStyle
        document.querySelectorAll = jest.fn().mockReturnValue([
            { style: { opacity: '1' }, click: jest.fn() },
            { style: { opacity: '0' }, click: jest.fn() }
        ]);
        window.getComputedStyle = jest.fn().mockImplementation(elem => elem.style);

        tryClickingSkipButton();

        // Assert that button.click is called for the first button
        expect(document.querySelectorAll().length).toBe(2);
        expect(document.querySelectorAll()[0].click).toHaveBeenCalled();
        expect(document.querySelectorAll()[1].click).not.toHaveBeenCalled();
    });
});
